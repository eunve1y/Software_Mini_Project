import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import HoneyTipScreen from "../screens/HoneyTipScreen";
import WritePostScreen from "../screens/WritePostScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InformationScreen from "../screens/InformationScreen";
import InfoScreen from "../screens/InfoScreen";
import PayPostScreen from "../screens/PayPostScreen";
import MileageScreen from "../screens/MileageScreen";
import CommunityScreen from "../screens/CommunityScreen";
import WriteCommunityPostScreen from "../screens/WriteCommunityPostScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HoneyTipStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="InfoMain" component={InfoScreen} />
      <Stack.Screen name="HoneyTip" component={HoneyTipScreen} />
      <Stack.Screen name="HoneyTipPost" component={PayPostScreen} />
      <Stack.Screen name="Community" component={CommunityScreen} />
      <Stack.Screen
        name="WriteCommunityPost"
        component={WriteCommunityPostScreen}
      />
      <Stack.Screen
        name="WritePost"
        component={WritePostScreen}
        options={{ title: "게시물 작성" }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="SearchResult" component={SearchResultScreen} />
      <Stack.Screen name="SearchPost" component={PayPostScreen} />
    </Stack.Navigator>
  );
}

function CartStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartMain" component={CartScreen} />
      <Stack.Screen name="CartPost" component={PayPostScreen} />
    </Stack.Navigator>
  );
}

function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={CommunityScreen} />
      <Stack.Screen
        name="WriteCommunityPost"
        component={WriteCommunityPostScreen}
      />
    </Stack.Navigator>
  );
}

// ProfileStack에 InformationScreen 추가
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Mileage" component={MileageScreen} />
      <Stack.Screen name="Information" component={InformationScreen} />
      <Stack.Screen name="TransactionPost" component={PayPostScreen} />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HoneyTipHome") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HoneyTipHome"
        component={HoneyTipStack}
        options={{ tabBarLabel: "홈" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ tabBarLabel: "검색" }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{ tabBarLabel: "장바구니" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarLabel: "내 정보" }}
      />
    </Tab.Navigator>
  );
}
