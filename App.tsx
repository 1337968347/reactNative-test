import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'mobx-react';
import { rootStore } from './src/stores/RootStore';
import LoginScreen from './src/pages/LoginScreen';

function App() {
  return (
    <Provider store={rootStore}>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <LoginScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
