import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react';
import { useStore } from './src/stores/RootStore';
import LoginScreen from './src/pages/LoginScreen';
import HomeScreen from './src/pages/HomeScreen';
import PageTwo from './src/pages/PageTwo';

const Stack = createNativeStackNavigator();

const AppNavigator = observer(() => {
  const { userStore } = useStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userStore.isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen 
              name="PageTwo" 
              component={PageTwo} 
              options={{ 
                headerShown: true,
                title: 'Page2',
                headerBackTitle: '返回',
                headerTintColor: '#000',
              }} 
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
