import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { observer } from 'mobx-react';
import { useStore } from '../stores/RootStore';
import { theme } from '../styles/theme';

/**
 * 样式定义
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: theme.white,
    borderRadius: 12,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: theme.text,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: theme.border,
  },
  buttonText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
});

/**
 * 登录屏幕组件
 */
const LoginScreen = () => {
  const { userStore } = useStore();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');

  /**
   * 处理登录操作
   */
  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    try {
      await userStore.login(username, password);
      // 登录成功后，App.tsx 中的 observer 会自动切换到 HomeScreen
    } catch (e) {
      // 错误已由 userStore.error 处理并在界面显示
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>陈阳的React Native</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>用户名</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入用户名"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入密码"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {userStore.error ? (
          <Text style={styles.errorText}>{userStore.error}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, userStore.isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={userStore.isLoading}
        >
          {userStore.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>登 录</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default observer(LoginScreen);
