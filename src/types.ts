import React from 'react';
import { LucideIcon } from 'lucide-react';

export type AppID = 'explorer' | 'edge' | 'notepad' | 'calculator' | 'settings' | 'terminal' | 'store' | 'paint' | 'taskmanager';

export type Language = 'en' | 'ru';
export type Theme = 'light' | 'dark';
export type TaskbarAlignment = 'left' | 'center';

export interface AppConfig {
  id: AppID;
  name: string;
  icon: LucideIcon;
  color: string;
  component: React.ComponentType<{ windowId: string }>;
}

export interface WindowState {
  id: string;
  appId: AppID;
  title: string;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  openedFile?: FSItem;
}

export interface FSItem {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FSItem[];
  parentId?: string;
  id: string;
}

export interface FileSystemState {
  root: FSItem;
}
