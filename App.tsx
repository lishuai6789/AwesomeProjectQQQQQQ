import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {HomeScreen} from './screens/home/home';
import { LoginScreen } from './screens/login/login';
import { RegisterScreen } from './screens/register/register';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "首页" }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{title: "登录"}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: "注册"}}></Stack.Screen>
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
export default App;
