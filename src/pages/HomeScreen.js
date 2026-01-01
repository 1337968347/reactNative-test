import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../stores/RootStore';
import { theme } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.text,
  },
  info: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 40,
  },
});

const HomeScreen = ({ navigation }) => {
  const { userStore } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>欢迎回来, {userStore.user?.username}!</Text>
      <Text style={styles.info}>这是一个简洁的首页</Text>
      <View style={{ marginBottom: 50 }}>
        <Button 
          title="跳转到 Page2" 
          onPress={() => navigation.navigate('PageTwo')} 
          color={theme.primary}
        />
      </View>
      <Button 
        title="退出登录" 
        onPress={() => userStore.logout()} 
        color={theme.danger}
      />
    </View>
  );
};

export default observer(HomeScreen);
