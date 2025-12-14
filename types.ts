import { ReactNode } from 'react';

export enum AppID {
  ABOUT = 'about',
  TERMINAL = 'terminal',
  PROJECTS = 'projects',
  YOUTUBE = 'youtube',
  SETTINGS = 'settings',
  FILES = 'files',
  CALCULATOR = 'calculator',
  EDITOR = 'editor',
  ANDROID = 'android',
  CHESS = 'chess',
  LUDO = 'ludo',
  UNO = 'uno',
  GAMECENTER = 'gamecenter',
  DEVSTUDIO = 'devstudio',
  WORD = 'word',
  EXCEL = 'excel',
  POWERPOINT = 'powerpoint',
  ODOO = 'odoo'
}

export type Language = 'ar' | 'en' | 'zh';

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppConfig {
  id: AppID;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  defaultSize?: { width: number; height: number };
}