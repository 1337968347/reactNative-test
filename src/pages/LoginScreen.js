import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../stores/RootStore'; // 更新导入路径

/**
 * 样式定义对象
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loading: {
    marginTop: 10,
  },
  userInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
});

/**
 * 登录屏幕组件
 * 提供用户登录界面和相关功能
 */
const LoginScreen = () => {
  const { userStore } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * 处理登录操作
   * @async
   */
  const handleLogin = async () => {
    try {
      await userStore.login(username, password);
      Alert.alert('登录成功', `欢迎 ${userStore.user?.username}!`);
    } catch {
      Alert.alert('登录失败', userStore.error || '未知错误');
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>登录</Text>

      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {userStore.error ? (
        <Text style={styles.errorText}>{userStore.error}</Text>
      ) : null}

      <Button
        title={userStore.isLoading ? '登录中...' : '登录'}
        onPress={handleLogin}
        disabled={userStore.isLoading}
      />

      {userStore.isLoading && (
        <ActivityIndicator size="large" style={styles.loading} />
      )}

      {userStore.isAuthenticated && userStore.user && (
        <View style={styles.userInfo}>
          <Text>已登录用户: {userStore.user.username}</Text>
          <Button title="退出登录" onPress={userStore.logout} />
        </View>
      )}
    </View>
  );
};

export default observer(LoginScreen);
