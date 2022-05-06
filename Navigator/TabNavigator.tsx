import { createStackNavigator } from "@react-navigation/stack";
import BookingDetails from "../Screen/Shop/BookingDetails";
import HomeScreen from "../Screen/Shop/HomeScreen";
import ProductDetailScreen from "../Screen/Shop/ProductDetailsScreen";



const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <HomeStackNavigator.Screen name="Home"    component={HomeScreen} />
      <HomeStackNavigator.Screen
        name="Product"
        component={ProductDetailScreen}
      />
         <HomeStackNavigator.Screen
        name="Book"
        component={BookingDetails}
      />
  
    </HomeStackNavigator.Navigator>
  );
};
