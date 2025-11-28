import Loader from "@/components/Loader";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FE7F2D",
  },
};

function LayoutContent() {
  const { user, isUserLoading } = useAuth();

  if (isUserLoading) {
    return <Loader />;
  }

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <LayoutContent />
      </PaperProvider>
    </AuthProvider>
  );
}
