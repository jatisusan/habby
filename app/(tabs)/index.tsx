import { client, DATABASE_ID, HABITS_TABLE_ID, tablesDB } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { Habit } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button, Text } from "react-native-paper";

export default function Index() {
  const { logout, user } = useAuth();

  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    if (user) {
      const channel = `databases.${DATABASE_ID}.tables.${HABITS_TABLE_ID}.rows`;

      const habitsSubscription = client.subscribe(channel, (res) => {
        if (res.events.includes("databases.*.collections.*.rows.*.create")) {
          fetchHabits();
        } else if (
          res.events.includes("databases.*.collections.*.rows.*.update")
        ) {
          fetchHabits();
        } else if (
          res.events.includes("databases.*.collections.*.rows.*.delete")
        ) {
          fetchHabits();
        }
      });

      fetchHabits();
      return () => {
        habitsSubscription(); // unsubscribe
      };
    }
  }, [user]);

  const fetchHabits = async () => {
    try {
      const resp = await tablesDB.listRows<Habit>({
        databaseId: DATABASE_ID,
        tableId: HABITS_TABLE_ID,
        queries: [Query.equal("userId", user?.$id || "")],
      });
      setHabits(resp.rows);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Your Habits
        </Text>
        <Button onPress={logout} icon={"logout"}>
          Logout
        </Button>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No habits found. Add a new habit to get started!
            </Text>
          </View>
        ) : (
          habits.map((habit) => (
            <View key={habit.$id} style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.iconWrapper}>
                  <MaterialCommunityIcons
                    name={habit.icon as any}
                    size={32}
                    color={"#FE7F2D"}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{habit.name}</Text>
                  <Text style={styles.cardDescription}>
                    {habit.description}
                  </Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.streakBadge}>
                      <MaterialCommunityIcons
                        name="fire"
                        size={18}
                        color={"#ff9800"}
                      />
                      <Text style={styles.streakText}>
                        {habit.streakCount} day streak
                      </Text>
                    </View>
                    <View style={styles.frequencyBadge}>
                      <Text style={styles.frequencyText}>
                        {" "}
                        {habit.frequency.charAt(0).toUpperCase() +
                          habit.frequency.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#faf1ec",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },

  card: {
    marginBottom: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    width: 66,
    alignSelf: "stretch",
    borderRadius: 12,
    backgroundColor: "#faf1ec",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#22223b",
  },
  cardDescription: {
    fontSize: 15,
    marginBottom: 16,
    color: "#6c6c80",
    flexWrap: "wrap",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  streakText: {
    marginLeft: 6,
    color: "#ff9800",
    fontWeight: "bold",
    fontSize: 14,
  },
  frequencyBadge: {
    backgroundColor: "#ede7f6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  frequencyText: {
    color: "#7c4dff",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#666666",
  },
  swipeActionLeft: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#e53935",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: 16,
  },
  swipeActionRight: {
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 1,
    backgroundColor: "#4caf50",
    borderRadius: 18,
    marginBottom: 18,
    marginTop: 2,
    paddingRight: 16,
  },
});
