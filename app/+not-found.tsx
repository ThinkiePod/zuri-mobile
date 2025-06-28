import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={[styles.title]}>This screen does not exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={[styles.themedLink]}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  themedLink: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});

export default NotFoundScreen;
