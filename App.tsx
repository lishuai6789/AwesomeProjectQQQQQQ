import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/home/home';
import { LoginScreen } from './screens/login/login';
import { RegisterScreen } from './screens/register/register';
import { ShopCartScreen } from './screens/shopCart/shopCart';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { Dialog } from '@rneui/themed';
import { UserInfoScreen } from './screens/userInfo/userInfo';
import { CommodityScreen } from './screens/commodity/commodity';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const HeaderButton = () => {
  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible((prev) => {
      return !prev;
    })
  };
  const navigation = useNavigation();
  return (
    <View>
      <Button title={"导航栏"} onPress={toggleDialog}></Button>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="导航栏"></Dialog.Title>
        <Dialog.Actions>
          <Dialog.Button title="购物车" onPress={() => {
            toggleDialog();
            navigation.navigate("ShopCart");
          }}></Dialog.Button>
          <Dialog.Button title={"用户信息"} onPress={() => {
            toggleDialog();
            navigation.navigate("UserInfo");
          }}></Dialog.Button>
          <Dialog.Button title="退出登录" onPress={() => {
            toggleDialog();
            fetch("http://localhost:8080/auth/logout", {
              method: "get",
            }).then(async (res) => {
              navigation.navigate("Login");
            }).catch((err) => {
              navigation.navigate("Login");
            });
          }}></Dialog.Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
};
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{
              title: "首页",
              headerRight: () => {
                return <HeaderButton></HeaderButton>
              }
            }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "登录" }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "注册" }}></Stack.Screen>
            <Stack.Screen name="ShopCart" component={ShopCartScreen} options={{ title: "购物车" }}></Stack.Screen>
            <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ title: "用户信息" }}></Stack.Screen>
            <Stack.Screen name="Commodity" component={CommodityScreen} options={{ title: "商品详情" }}></Stack.Screen>
          </Stack.Navigator>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
export default App;
