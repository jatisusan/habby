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

export default function RootLayout() {
  const isAuth = false;

  return (
    <PaperProvider theme={paperTheme}>
      <Stack>
        <Stack.Protected guard={!!isAuth}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuth}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  );
}
