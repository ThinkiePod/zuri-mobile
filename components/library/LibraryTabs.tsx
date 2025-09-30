import StoriesScreen from "@/components/library/StoriesScreen";
import { colors } from "@/utils/colors";
import { categories } from "@/utils/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export const LibraryTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: { backgroundColor: colors.main },
        tabBarLabelStyle: { fontSize: 14, fontFamily: "Inter-Medium" },
        tabBarStyle: { backgroundColor: colors.custom["100"] },
        tabBarItemStyle: { width: "auto" },
      }}
    >
      {categories.map((category) => (
        <Tab.Screen key={category} name={category}>
          {() => <StoriesScreen category={category} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};
