import { observable, action, makeAutoObservable } from 'mobx';

/**
 * 用户接口定义
 * @typedef {Object} User
 * @property {string} [id] - 用户ID
 * @property {string} username - 用户名
 * @property {string} email - 邮箱地址
 */

/**
 * UserStore类 - 用户状态管理
 * 使用MobX管理用户相关的状态和操作
 */
export class UserStore {
  /**
   * 当前登录用户信息
   * @type {User|null}
   */
  user = null;

  /**
   * 认证状态
   * @type {boolean}
   */
  isAuthenticated = false;

  /**
   * 加载状态
   * @type {boolean}
   */
  isLoading = false;

  /**
   * 错误信息
   * @type {string|null}
   */
  error = null;

  /**
   * 创建UserStore实例
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 用户登录方法
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise<void>} 登录操作的Promise
   * @throws {Error} 登录失败时抛出错误
   */
  login = async (username, password) => {
    this.isLoading = true;
    this.error = null;

    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));
      
      // 模拟登录成功
      if (username && password) {
        this.user = {
          id: '1',
          username,
          email: `${username}@example.com`
        };
        this.isAuthenticated = true;
      } else {
        throw new Error('用户名或密码错误');
      }
    } catch (error) {
      this.error = error.message || '登录失败';
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  /**
   * 用户登出方法
   */
  logout = () => {
    this.user = null;
    this.isAuthenticated = false;
    this.error = null;
  };

  /**
   * 清除错误信息
   */
  clearError = () => {
    this.error = null;
  };
}