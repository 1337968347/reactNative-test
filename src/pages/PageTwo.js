import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  text: {
    fontSize: 20,
    color: theme.text,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: theme.textSecondary,
  },
});

const PageTwo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>这是 Page Two 页面</Text>
      <Text style={styles.description}>您可以点击左上角返回</Text>
    </View>
  );
};

export default PageTwo;
