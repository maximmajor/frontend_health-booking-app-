import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeNavigator,
} from "./TabNavigator";
import {Shop } from "../assets/icon";
const activeColor = "#FFE26B";
const inactiveColor = "rgba(0, 0, 0, 0.7)";
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Shop") {
              return <Shop focused={focused} />;
            }
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
        })}
      >
        <Tab.Screen name="Shop"  component={HomeNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
