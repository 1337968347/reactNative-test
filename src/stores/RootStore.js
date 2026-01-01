import { createContext, useContext } from 'react';
import { UserStore } from './UserStore';

/**
 * RootStore类 - 应用程序的根状态存储
 * 管理应用程序中所有其他存储的实例
 */
export class RootStore {
  /**
   * 用户存储实例
   * @type {UserStore}
   */
  userStore;

  /**
   * 创建RootStore实例
   */
  constructor() {
    this.userStore = new UserStore();
  }
}

// 创建全局 store 实例
const globalStore = new RootStore();

const StoreContext = createContext(globalStore);

export const rootStore = globalStore;
export const useStore = () => useContext(StoreContext);