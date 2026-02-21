import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { 
  X, Square, Minus, Search, LayoutGrid, 
  Settings as SettingsIcon, Folder, Globe, 
  FileText, Calculator as CalcIcon, Terminal as TermIcon,
  ShoppingBag, ChevronUp, Wifi, Volume2, Battery,
  User, Power, LogOut, Lock, RefreshCw, Palette,
  Activity
} from 'lucide-react';
import { AppID, AppConfig, WindowState, FSItem, Language, Theme, TaskbarAlignment } from './types';

const TRANSLATIONS = {
  en: {
    explorer: 'File Explorer',
    edge: 'Shadows Browser',
    notepad: 'Notepad',
    calculator: 'Calculator',
    settings: 'Settings',
    terminal: 'Terminal',
    store: 'Microsoft Store',
    pinned: 'Pinned',
    recommended: 'Recommended',
    allApps: 'All apps',
    more: 'More',
    search: 'Type here to search',
    system: 'System',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    thisPC: 'This PC',
    documents: 'Documents',
    saveFile: 'Save File',
    cancel: 'Cancel',
    save: 'Save',
    clickToUnlock: 'Click to unlock',
    offline: 'Store is currently offline',
    terminalHeader: 'Shadows Terminal\nCopyright (C) brokolyone. All rights reserved.\n',
    dirNotFound: 'Directory not found',
    usageMkdir: 'Usage: mkdir <name>',
    availableCommands: 'Available commands: ls, cd, mkdir, touch, cat, rm, pwd, whoami, date, neofetch, uname, spm, color, node, npm, electron, clear, help',
    commandNotRecognized: (cmd: string) => `'${cmd}' is not recognized as an internal or external command.`,
    paint: 'Paint',
    systemInfo: 'Shadows 11 (v24H2)',
    personalization: 'Personalization',
    wallpaper: 'Wallpaper',
    taskbar: 'Taskbar',
    alignment: 'Alignment',
    transparency: 'Transparency Effects',
    on: 'On',
    off: 'Off',
    left: 'Left',
    center: 'Center',
    taskManager: 'Task Manager',
    processes: 'Processes',
    performance: 'Performance',
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
    network: 'Network',
    endTask: 'End Task',
  },
  ru: {
    explorer: 'Проводник',
    edge: 'Shadows Browser',
    notepad: 'Блокнот',
    calculator: 'Калькулятор',
    settings: 'Параметры',
    terminal: 'Терминал',
    store: 'Microsoft Store',
    pinned: 'Закрепленные',
    recommended: 'Рекомендуем',
    allApps: 'Все приложения',
    more: 'Еще',
    search: 'Введите запрос для поиска',
    system: 'Система',
    personalization: 'Персонализация',
    language: 'Язык',
    theme: 'Тема',
    light: 'Светлая',
    dark: 'Темная',
    thisPC: 'Этот компьютер',
    documents: 'Документы',
    saveFile: 'Сохранить файл',
    cancel: 'Отмена',
    save: 'Сохранить',
    clickToUnlock: 'Нажмите, чтобы разблокировать',
    offline: 'Магазин сейчас не в сети',
    terminalHeader: 'Shadows Terminal\n(C) brokolyone. Все права защищены.\n',
    dirNotFound: 'Директория не найдена',
    usageMkdir: 'Использование: mkdir <имя>',
    availableCommands: 'Доступные команды: ls, cd, mkdir, touch, cat, rm, pwd, whoami, date, neofetch, uname, spm, color, node, npm, electron, clear, help',
    commandNotRecognized: (cmd: string) => `'${cmd}' не является внутренней или внешней командой.`,
    paint: 'Paint',
    systemInfo: 'Shadows 11 (v24H2)',
    wallpaper: 'Обои',
    taskbar: 'Панель задач',
    alignment: 'Выравнивание',
    transparency: 'Эффекты прозрачности',
    on: 'Вкл',
    off: 'Выкл',
    left: 'Слева',
    center: 'По центру',
    taskManager: 'Диспетчер задач',
    processes: 'Процессы',
    performance: 'Производительность',
    cpu: 'ЦП',
    memory: 'Память',
    disk: 'Диск',
    network: 'Сеть',
    endTask: 'Снять задачу',
  }
};

// --- Apps Implementation ---

const Paint = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-[#1c1c1c]">
      <div className="flex items-center gap-2 p-2 border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#2c2c2c]">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
        <button onClick={() => {
          const canvas = canvasRef.current;
          if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        }} className="px-3 py-1 text-xs bg-black/5 dark:bg-white/10 rounded hover:bg-black/10 dark:hover:bg-white/20">Clear</button>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <canvas 
          ref={canvasRef}
          width={1200}
          height={800}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="bg-white shadow-inner cursor-crosshair"
        />
      </div>
    </div>
  );
};

const FileExplorer = ({ fs, currentPath, onNavigate, onOpenFile, t }: { fs: FSItem, currentPath: string, onNavigate: (path: string) => void, onOpenFile: (item: FSItem) => void, t: any }) => {
  const getItemsAtCurrentPath = () => {
    if (currentPath === '/') return fs.children || [];
    const parts = currentPath.split('/').filter(Boolean);
    let current: FSItem | undefined = fs;
    for (const part of parts) {
      current = current.children?.find(child => child.name === part && child.type === 'directory');
      if (!current) return [];
    }
    return current.children || [];
  };

  const items = getItemsAtCurrentPath();

  return (
    <div className="p-4 h-full flex flex-col gap-4 text-sm dark:text-gray-200">
      <div className="flex items-center gap-2 text-xs bg-black/5 dark:bg-white/5 p-2 rounded">
        <button onClick={() => onNavigate('/')} className="hover:underline opacity-50">{t.thisPC}</button>
        <span className="opacity-50">&gt;</span>
        <span>{currentPath}</span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {currentPath !== '/' && (
          <div 
            onDoubleClick={() => {
              const parts = currentPath.split('/').filter(Boolean);
              parts.pop();
              onNavigate('/' + parts.join('/'));
            }}
            className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded cursor-pointer group text-center"
          >
            <Folder size={40} className="text-gray-400 group-hover:scale-105 transition-transform" />
            <span className="text-[10px]">..</span>
          </div>
        )}
        {items.map(item => (
          <div 
            key={item.id} 
            onDoubleClick={() => item.type === 'directory' ? onNavigate(`${currentPath === '/' ? '' : currentPath}/${item.name}`) : onOpenFile(item)}
            className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded cursor-pointer group text-center"
          >
            {item.type === 'directory' ? (
              <Folder size={40} className="text-yellow-500 group-hover:scale-105 transition-transform" />
            ) : (
              <FileText size={40} className="text-blue-400 group-hover:scale-105 transition-transform" />
            )}
            <span className="text-[10px] truncate w-full">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EdgeBrowser = ({ onDownload }: { onDownload: (name: string) => void }) => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [input, setInput] = useState('https://www.google.com');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1c1c1c]">
      <div className="flex items-center gap-2 p-2 glass-effect border-b border-white/10">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setUrl(input.startsWith('http') ? input : `https://${input}`)}
          className="flex-1 bg-black/10 dark:bg-white/10 rounded-full px-4 py-1 text-xs outline-none focus:ring-1 ring-blue-500"
        />
        <button 
          onClick={() => {
            const name = prompt('Enter filename to download (e.g. music.mp3):', 'audio.mp3');
            if (name) onDownload(name);
          }}
          className="p-1 px-2 text-[10px] bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors"
        >
          Download
        </button>
      </div>
      <iframe src={url} className="flex-1 w-full border-none" title="Shadows Browser" />
    </div>
  );
};

const Notepad = ({ fs, onSave, t, initialContent = '', initialFilename = 'untitled.txt' }: { fs: FSItem, onSave: (name: string, content: string) => void, t: any, initialContent?: string, initialFilename?: string }) => {
  const [content, setContent] = useState(initialContent);
  const [filename, setFilename] = useState(initialFilename);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  useEffect(() => {
    setContent(initialContent);
    setFilename(initialFilename);
  }, [initialContent, initialFilename]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 px-4 py-1 bg-black/5 dark:bg-white/5 text-xs border-b border-white/10">
        <button onClick={() => setShowSaveDialog(true)} className="hover:bg-white/10 px-2 py-1 rounded">File</button>
        <span className="opacity-50">|</span>
        <span className="opacity-50">{filename}</span>
      </div>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 w-full p-4 bg-transparent outline-none resize-none text-sm dark:text-gray-200"
        placeholder="Start typing..."
        spellCheck={false}
      />
      {showSaveDialog && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-[#2c2c2c] p-6 rounded-lg shadow-2xl border border-white/10 w-80">
            <h3 className="text-sm font-bold mb-4">{t.saveFile}</h3>
            <input 
              type="text" 
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 p-2 rounded mb-4 outline-none border border-white/10"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSaveDialog(false)} className="px-4 py-1 rounded hover:bg-white/10">{t.cancel}</button>
              <button onClick={() => { onSave(filename, content); setShowSaveDialog(false); }} className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-500">{t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskManager = ({ windows, onCloseWindow, t }: { windows: WindowState[], onCloseWindow: (id: string) => void, t: any }) => {
  const [activeTab, setActiveTab] = useState('processes');
  
  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] dark:bg-[#1c1c1c] text-sm">
      <div className="flex border-b dark:border-white/10 border-black/10">
        <button 
          onClick={() => setActiveTab('processes')}
          className={`px-4 py-2 ${activeTab === 'processes' ? 'border-b-2 border-blue-500 text-blue-500' : 'opacity-70'}`}
        >
          {t.processes}
        </button>
        <button 
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 ${activeTab === 'performance' ? 'border-b-2 border-blue-500 text-blue-500' : 'opacity-70'}`}
        >
          {t.performance}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'processes' ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase opacity-50 border-b dark:border-white/10 border-black/10">
                <th className="pb-2 font-medium">{t.search}</th>
                <th className="pb-2 font-medium">{t.cpu}</th>
                <th className="pb-2 font-medium">{t.memory}</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {windows.map(win => (
                <tr key={win.id} className="group hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="py-2 flex items-center gap-2">
                    <span className="truncate max-w-[150px]">{win.title}</span>
                  </td>
                  <td className="py-2 text-[11px] opacity-70">{Math.floor(Math.random() * 5)}%</td>
                  <td className="py-2 text-[11px] opacity-70">{Math.floor(Math.random() * 200 + 50)} MB</td>
                  <td className="py-2 text-right">
                    <button 
                      onClick={() => onCloseWindow(win.id)}
                      className="px-2 py-1 text-[10px] bg-red-500/10 text-red-500 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                    >
                      {t.endTask}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {['CPU', 'Memory', 'Disk', 'Network'].map(item => (
              <div key={item} className="p-4 bg-white dark:bg-white/5 rounded-lg border dark:border-white/10 border-black/5">
                <p className="text-[11px] opacity-50 uppercase mb-2">{item}</p>
                <p className="text-2xl font-light">{Math.floor(Math.random() * 40 + 10)}%</p>
                <div className="mt-4 h-12 flex items-end gap-0.5">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-blue-500/40 rounded-t-sm" 
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const buttons = [
    'C', 'DEL', '%', '/',
    '7', '8', '9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '='
  ];

  const handleClick = (btn: string) => {
    if (btn === 'C') setDisplay('0');
    else if (btn === 'DEL') setDisplay(d => d.length > 1 ? d.slice(0, -1) : '0');
    else if (btn === '=') {
      try { 
        // Use a safer eval alternative if possible, but for a calc eval is okay-ish in this sandbox
        const result = Function(`"use strict"; return (${display})`)();
        setDisplay(result.toString()); 
      } catch { setDisplay('Error'); }
    } else {
      setDisplay(d => d === '0' ? btn : d + btn);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col gap-2">
      <div className="text-right text-3xl font-light p-4 bg-black/5 dark:bg-white/5 rounded mb-2 overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {buttons.map(btn => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`p-2 rounded transition-colors ${
              btn === '=' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
            } ${['/', '*', '-', '+'].includes(btn) ? 'text-blue-500 font-bold' : ''}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const Terminal = ({ fs, onUpdateFS, t }: { fs: FSItem, onUpdateFS: (newFS: FSItem) => void, t: any }) => {
  const [history, setHistory] = useState<string[]>([t.terminalHeader, '']);
  const [input, setInput] = useState('');
  const [currentDir, setCurrentDir] = useState('/');
  const [installedPackages, setInstalledPackages] = useState<string[]>(['coreutils', 'bash', 'grep', 'sed', 'node', 'npm', 'electron']);
  const [termColor, setTermColor] = useState('text-gray-300');
  const [mode, setMode] = useState<'shell' | 'node'>('shell');
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const resolvePath = (path: string) => {
    if (path === '/') return '/';
    const absolutePath = path.startsWith('/') ? path : (currentDir === '/' ? '/' + path : currentDir + '/' + path);
    const parts = absolutePath.split('/').filter(Boolean);
    const resolvedParts: string[] = [];
    for (const part of parts) {
      if (part === '..') resolvedParts.pop();
      else if (part !== '.') resolvedParts.push(part);
    }
    return '/' + resolvedParts.join('/');
  };

  const getDir = (path: string) => {
    const resolved = resolvePath(path);
    if (resolved === '/') return fs;
    const parts = resolved.split('/').filter(Boolean);
    let curr: FSItem | undefined = fs;
    for (const part of parts) {
      curr = curr.children?.find(c => c.name === part && c.type === 'directory');
      if (!curr) return null;
    }
    return curr;
  };

  const getFile = (path: string) => {
    const resolved = resolvePath(path);
    const parts = resolved.split('/').filter(Boolean);
    const fileName = parts.pop();
    if (!fileName) return null;
    
    const parentPath = '/' + parts.join('/');
    const parent = getDir(parentPath);
    return parent?.children?.find(c => c.name === fileName && c.type === 'file');
  };

  const commandHelp: Record<string, string> = {
    ls: 'ls [path] - List directory contents.',
    cd: 'cd <path> - Change the current directory.',
    mkdir: 'mkdir <name> - Create a new directory.',
    touch: 'touch <name> - Create a new empty file.',
    cat: 'cat <file> - Display file contents.',
    rm: 'rm <name> - Remove a file or directory.',
    pwd: 'pwd - Print working directory.',
    whoami: 'whoami - Print current user name.',
    date: 'date - Display current date and time.',
    neofetch: 'neofetch - Display system information.',
    uname: 'uname - Print system information.',
    spm: 'spm <install|list|search> [package] - Shadows Package Manager.',
    color: 'color <color> - Change terminal text color (e.g., green, red, blue, yellow, white).',
    node: 'node <file.js> - Execute a JavaScript file.',
    npm: 'npm <install|run> <package|script> - Node Package Manager.',
    electron: 'electron <path> - Start an Electron application.',
    clear: 'clear - Clear the terminal screen.',
    help: 'help [command] - Display help for a command.'
  };

  const executeCommand = (cmd: string) => {
    if (!cmd.trim() && mode === 'shell') return;
    
    if (mode === 'node') {
      const trimmed = cmd.trim();
      if (trimmed === '.exit') {
        setMode('shell');
        setHistory(prev => [...prev, `> ${cmd}`, 'Exiting Node.js REPL', '']);
        return;
      }
      if (trimmed === '.help') {
        setHistory(prev => [...prev, `> ${cmd}`, '.exit    Exit the REPL', '.help    Print this help message', '']);
        return;
      }
      
      let nodeOutput = '';
      try {
        // Simple simulation of JS evaluation
        if (trimmed.includes('console.log')) {
          const match = trimmed.match(/console\.log\((.*)\)/);
          nodeOutput = match ? match[1].replace(/['"]/g, '') : '';
        } else if (trimmed.match(/^[0-9+\-*/().\s]+$/)) {
          nodeOutput = eval(trimmed).toString();
        } else if (trimmed) {
          nodeOutput = `undefined`;
        }
      } catch (e) {
        nodeOutput = `Uncaught ReferenceError: ${trimmed} is not defined`;
      }
      
      setHistory(prev => [...prev, `> ${cmd}`, nodeOutput]);
      return;
    }

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    let output = '';

    switch (command) {
      case 'help':
        if (args[0]) {
          output = commandHelp[args[0].toLowerCase()] || `No help entry for '${args[0]}'`;
        } else {
          output = `Shadows Terminal v1.1\nAvailable commands: ${Object.keys(commandHelp).join(', ')}\nUse 'help <command>' for more info.`;
        }
        break;
      case 'color':
        const colorMap: Record<string, string> = {
          green: 'text-green-500',
          red: 'text-red-500',
          blue: 'text-blue-500',
          yellow: 'text-yellow-500',
          white: 'text-white',
          gray: 'text-gray-300'
        };
        if (args[0] && colorMap[args[0].toLowerCase()]) {
          setTermColor(colorMap[args[0].toLowerCase()]);
          output = `Color changed to ${args[0]}.`;
        } else {
          output = 'Usage: color <green|red|blue|yellow|white|gray>';
        }
        break;
      case 'pwd':
        output = currentDir;
        break;
      case 'whoami':
        output = 'shadow_user';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'uname':
        output = 'ShadowsOS 11.0.24H2 x86_64';
        break;
      case 'ls':
        const dir = getDir(currentDir);
        output = dir?.children?.map(c => `${c.type === 'directory' ? '[DIR]' : '     '} ${c.name}`).join('\n') || t.dirNotFound;
        break;
      case 'cd':
        const target = args[0] || '/';
        const newPath = resolvePath(target);
        if (getDir(newPath)) setCurrentDir(newPath);
        else output = `${t.dirNotFound}: ${target}`;
        break;
      case 'mkdir':
        if (!args[0]) output = t.usageMkdir;
        else {
          const parentPath = resolvePath(currentDir);
          const newFS = JSON.parse(JSON.stringify(fs));
          const parts = parentPath.split('/').filter(Boolean);
          let curr = newFS;
          for (const part of parts) {
            curr = curr.children.find((c: any) => c.name === part && c.type === 'directory');
          }
          if (curr) {
            curr.children.push({ id: Math.random().toString(), name: args[0], type: 'directory', children: [] });
            onUpdateFS(newFS);
            output = `Created directory: ${args[0]}`;
          }
        }
        break;
      case 'touch':
        if (!args[0]) output = 'Usage: touch <filename>';
        else {
          const parentPath = resolvePath(currentDir);
          const newFS = JSON.parse(JSON.stringify(fs));
          const parts = parentPath.split('/').filter(Boolean);
          let curr = newFS;
          for (const part of parts) {
            curr = curr.children.find((c: any) => c.name === part && c.type === 'directory');
          }
          if (curr) {
            curr.children.push({ id: Math.random().toString(), name: args[0], type: 'file', content: '' });
            onUpdateFS(newFS);
            output = `Created file: ${args[0]}`;
          }
        }
        break;
      case 'cat':
        if (!args[0]) output = 'Usage: cat <filename>';
        else {
          const file = getFile(args[0]);
          if (file) output = file.content || '(Empty file)';
          else output = `File not found: ${args[0]}`;
        }
        break;
      case 'rm':
        if (!args[0]) output = 'Usage: rm <name>';
        else {
          const parentPath = resolvePath(currentDir);
          const newFS = JSON.parse(JSON.stringify(fs));
          const parts = parentPath.split('/').filter(Boolean);
          let curr = newFS;
          for (const part of parts) {
            curr = curr.children.find((c: any) => c.name === part && c.type === 'directory');
          }
          if (curr) {
            const index = curr.children.findIndex((c: any) => c.name === args[0]);
            if (index !== -1) {
              curr.children.splice(index, 1);
              onUpdateFS(newFS);
              output = `Removed: ${args[0]}`;
            } else output = `Not found: ${args[0]}`;
          }
        }
        break;
      case 'node':
        if (!args[0]) {
          setMode('node');
          setHistory(prev => [...prev, `PS ${currentDir}> ${cmd}`, 'Welcome to Node.js v20.10.0.', 'Type ".help" for more information.']);
          return;
        } else {
          const file = getFile(args[0]);
          if (file) output = `Executing ${args[0]}...\n(Simulated Output): Hello from Node.js!`;
          else output = `Cannot find module '${args[0]}'`;
        }
        break;
      case 'npm':
        if (args[0] === 'install') output = `added ${Math.floor(Math.random() * 100)} packages in 2s`;
        else if (args[0] === 'run') output = `> shadows-app@1.0.0 ${args[1]}\n> (Simulated script execution)`;
        else output = 'Usage: npm <install|run> [package|script]';
        break;
      case 'electron':
        output = 'Starting Electron application...\n(Simulated): New window opened.';
        break;
      case 'spm':
        const action = args[0];
        const pkg = args[1];
        if (action === 'install' && pkg) {
          if (installedPackages.includes(pkg)) output = `Package ${pkg} is already installed.`;
          else {
            setInstalledPackages(prev => [...prev, pkg]);
            output = `Installing ${pkg}...\nDone.`;
          }
        } else if (action === 'list') {
          output = `Installed packages (${installedPackages.length}):\n` + installedPackages.join(', ');
        } else if (action === 'search') {
          output = `Found 1000+ packages matching '${pkg || ''}'...`;
        } else {
          output = 'Usage: spm <install|list|search> [package]';
        }
        break;
      case 'neofetch':
        output = `
   .-----------.     OS: ShadowsOS 11
  /             \\    Kernel: 6.5.0-shadows
 /               \\   Uptime: 1 hour, 23 mins
|   SHADOWS OS   |   Packages: ${installedPackages.length} (spm)
 \\               /   Shell: shadow-sh 5.2
  \\             /    Resolution: 1920x1080
   '-----------'     WM: ShadowsWM
        `;
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        if (installedPackages.includes(command)) {
          output = `Running ${command}... (Simulated execution)`;
        } else {
          output = t.commandNotRecognized(command);
        }
    }

    setHistory(prev => [...prev, `PS ${currentDir}> ${cmd}`, output, '']);
  };

  return (
    <div className={`p-4 h-full bg-black font-mono text-xs ${termColor} overflow-y-auto`} ref={scrollRef}>
      {history.map((line, i) => <div key={i} className="whitespace-pre-wrap">{line}</div>)}
      <div className="flex gap-2">
        <span>{mode === 'node' ? '>' : `PS ${currentDir}>`}</span>
        <input 
          autoFocus
          className="flex-1 bg-transparent outline-none border-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              executeCommand(input);
              setInput('');
            }
          }}
        />
      </div>
    </div>
  );
};

const Settings = ({ 
  language, setLanguage, 
  theme, setTheme, 
  wallpaper, setWallpaper,
  taskbarAlignment, setTaskbarAlignment,
  transparency, setTransparency,
  t 
}: { 
  language: Language, setLanguage: (l: Language) => void, 
  theme: Theme, setTheme: (t: Theme) => void, 
  wallpaper: string, setWallpaper: (w: string) => void,
  taskbarAlignment: TaskbarAlignment, setTaskbarAlignment: (a: TaskbarAlignment) => void,
  transparency: boolean, setTransparency: (v: boolean) => void,
  t: any 
}) => {
  const wallpapers = [
    { id: 'default', url: 'https://picsum.photos/seed/windows11/1920/1080?blur=2' },
    { id: 'mt1', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80', full: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80' },
    { id: 'mt2', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80', full: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80' },
    { id: 'mt3', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', full: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80' },
  ];

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-y-auto pb-20">
      <h1 className="text-2xl font-semibold">{t.settings}</h1>
      <div className="grid gap-4">
        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h2 className="text-sm font-medium mb-2 flex items-center gap-2"><User size={16}/> {t.system}</h2>
          <p className="text-xs text-gray-400">{t.systemInfo}</p>
        </section>
        
        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Globe size={16}/> {t.language}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded text-xs transition-all ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('ru')}
              className={`px-4 py-2 rounded text-xs transition-all ${language === 'ru' ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              Русский
            </button>
          </div>
        </section>

        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><LayoutGrid size={16}/> {t.theme}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setTheme('light')}
              className={`px-4 py-2 rounded text-xs transition-all ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {t.light}
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`px-4 py-2 rounded text-xs transition-all ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
            >
              {t.dark}
            </button>
          </div>
        </section>

        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Palette size={16}/> {t.personalization}</h2>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs mb-2 opacity-70">{t.wallpaper}</p>
              <div className="flex flex-col gap-4">
                {/* Default Wallpaper Frame */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] opacity-50 uppercase tracking-wider">System Default</span>
                  <div 
                    onClick={() => setWallpaper(wallpapers[0].url)}
                    className={`relative w-40 aspect-video rounded-lg border-2 cursor-pointer overflow-hidden transition-all bg-blue-900/20 ${wallpaper === wallpapers[0].url ? 'border-blue-500 scale-95' : 'border-white/10 hover:border-white/30'}`}
                  >
                    <img 
                      src={wallpapers[0].url} 
                      alt="Default" 
                      className="w-full h-full object-cover brightness-50" 
                      referrerPolicy="no-referrer"
                      onError={(e) => (e.currentTarget.style.display = 'none')} 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                      <span className="text-white font-bold text-sm tracking-widest uppercase drop-shadow-lg">Default</span>
                    </div>
                  </div>
                </div>

                {/* Other Wallpapers Grid */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] opacity-50 uppercase tracking-wider">Landscape Collection</span>
                  <div className="grid grid-cols-4 gap-2">
                    {wallpapers.slice(1).map(wp => (
                      <div 
                        key={wp.id}
                        onClick={() => setWallpaper(wp.full || wp.url)}
                        className={`aspect-video rounded border-2 cursor-pointer overflow-hidden transition-all bg-white/5 flex items-center justify-center ${wallpaper === (wp.full || wp.url) ? 'border-blue-500 scale-95' : 'border-transparent hover:border-white/20'}`}
                      >
                        <img 
                          src={wp.url} 
                          alt={wp.id} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                          onError={(e) => (e.currentTarget.style.opacity = '0')}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                          <Palette size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs opacity-70">{t.transparency}</p>
              <button 
                onClick={() => setTransparency(!transparency)}
                className={`px-3 py-1 rounded text-[10px] transition-all ${transparency ? 'bg-blue-600' : 'bg-white/10'}`}
              >
                {transparency ? t.on : t.off}
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><LayoutGrid size={16}/> {t.taskbar}</h2>
          <div className="flex items-center justify-between">
            <p className="text-xs opacity-70">{t.alignment}</p>
            <div className="flex gap-1">
              <button 
                onClick={() => setTaskbarAlignment('left')}
                className={`px-3 py-1 rounded text-[10px] transition-all ${taskbarAlignment === 'left' ? 'bg-blue-600' : 'bg-white/10'}`}
              >
                {t.left}
              </button>
              <button 
                onClick={() => setTaskbarAlignment('center')}
                className={`px-3 py-1 rounded text-[10px] transition-all ${taskbarAlignment === 'center' ? 'bg-blue-600' : 'bg-white/10'}`}
              >
                {t.center}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- App Configurations ---

const APPS: AppConfig[] = [
  { id: 'explorer', name: 'File Explorer', icon: Folder, color: '#facc15', component: FileExplorer },
  { id: 'edge', name: 'Shadows Browser', icon: Globe, color: '#3b82f6', component: EdgeBrowser },
  { id: 'notepad', name: 'Notepad', icon: FileText, color: '#94a3b8', component: Notepad },
  { id: 'calculator', name: 'Calculator', icon: CalcIcon, color: '#3b82f6', component: Calculator },
  { id: 'paint', name: 'Paint', icon: Palette, color: '#ef4444', component: Paint },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, color: '#64748b', component: Settings },
  { id: 'terminal', name: 'Terminal', icon: TermIcon, color: '#000000', component: Terminal },
  { id: 'taskmanager', name: 'Task Manager', icon: Activity, color: '#22c55e', component: TaskManager },
  { id: 'store', name: 'Microsoft Store', icon: ShoppingBag, color: '#3b82f6', component: () => <div className="flex items-center justify-center h-full text-gray-400">Store is currently offline</div> },
];

// --- Window Component ---

interface WindowProps {
  key?: string;
  win: WindowState;
  activeWindowId: string | null;
  onClose: (id: string) => void;
  onMaximize: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onUpdatePos: (id: string, x: number, y: number) => void;
}

const AppWindow = ({ win, activeWindowId, onClose, onMaximize, onMinimize, onFocus, onUpdatePos, fs, onUpdateFS, onOpenAppWithFile, language, setLanguage, theme, setTheme, wallpaper, setWallpaper, taskbarAlignment, setTaskbarAlignment, transparency, setTransparency, t, windows, onDownload }: WindowProps & { fs: FSItem, onUpdateFS: (newFS: FSItem) => void, onOpenAppWithFile: (appId: AppID, file: FSItem) => void, language: Language, setLanguage: (l: Language) => void, theme: Theme, setTheme: (t: Theme) => void, wallpaper: string, setWallpaper: (w: string) => void, taskbarAlignment: TaskbarAlignment, setTaskbarAlignment: (a: TaskbarAlignment) => void, transparency: boolean, setTransparency: (v: boolean) => void, t: any, windows: WindowState[], onDownload: (name: string) => void }) => {
  const app = APPS.find(a => a.id === win.appId)!;
  const dragControls = useDragControls();
  const [currentPath, setCurrentPath] = useState('/');

  const renderContent = () => {
    switch (win.appId) {
      case 'explorer':
        return <FileExplorer fs={fs} currentPath={currentPath} onNavigate={setCurrentPath} onOpenFile={(file) => onOpenAppWithFile('notepad', file)} t={t} />;
      case 'notepad':
        return <Notepad 
          fs={fs} 
          t={t}
          initialContent={win.openedFile?.content || ''} 
          initialFilename={win.openedFile?.name || 'untitled.txt'}
          onSave={(name, content) => {
            const parts = currentPath.split('/').filter(Boolean);
            let curr = fs;
            for (const part of parts) {
              curr = curr.children?.find(c => c.name === part && c.type === 'directory') || fs;
            }
            const newItem: FSItem = { id: Math.random().toString(), name, type: 'file', content };
            curr.children = [...(curr.children || []), newItem];
            onUpdateFS({ ...fs });
          }} 
        />;
      case 'terminal':
        return <Terminal fs={fs} onUpdateFS={onUpdateFS} t={t} />;
      case 'edge':
        return <EdgeBrowser onDownload={onDownload} />;
      case 'taskmanager':
        return <TaskManager windows={windows} onCloseWindow={onClose} t={t} />;
      case 'settings':
        return <Settings 
          language={language} setLanguage={setLanguage} 
          theme={theme} setTheme={setTheme} 
          wallpaper={wallpaper} setWallpaper={setWallpaper}
          taskbarAlignment={taskbarAlignment} setTaskbarAlignment={setTaskbarAlignment}
          transparency={transparency} setTransparency={setTransparency}
          t={t} 
        />;
      case 'store':
        return <div className="flex items-center justify-center h-full text-gray-400">{t.offline}</div>;
      default:
        return <app.component windowId={win.id} />;
    }
  };

  return (
    <motion.div
      drag={!win.isMaximized}
      dragMomentum={false}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={(_, info) => {
        onUpdatePos(win.id, win.x + info.offset.x, win.y + info.offset.y);
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: win.isMinimized ? 0.8 : 1, 
        opacity: win.isMinimized ? 0 : 1,
        top: win.isMaximized ? 0 : win.y,
        left: win.isMaximized ? 0 : win.x,
        width: win.isMaximized ? '100%' : win.width,
        height: win.isMaximized ? 'calc(100% - 48px)' : win.height,
        zIndex: win.zIndex,
      }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={() => onFocus(win.id)}
      className={`absolute ${transparency ? 'mica-effect' : 'bg-white dark:bg-[#2c2c2c]'} rounded-lg overflow-hidden window-shadow flex flex-col border dark:border-white/20 border-black/10 ${win.isMinimized ? 'pointer-events-none' : ''} ${activeWindowId === win.id ? 'ring-1 dark:ring-white/30 ring-black/20' : ''}`}
    >
      {/* Window Header / Drag Handle */}
      <div 
        className="h-10 flex items-center justify-between px-4 cursor-default select-none group"
        onDoubleClick={() => onMaximize(win.id)}
        onPointerDown={(e) => {
          onFocus(win.id);
          dragControls.start(e);
        }}
      >
        <div className="flex items-center gap-2 flex-1 h-full">
          <app.icon size={16} />
          <span className="text-xs font-medium">{win.title}</span>
        </div>
        <div className="flex items-center h-full">
          <div 
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
            className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Minus size={14} />
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
            className="w-10 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <Square size={12} />
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
            className="w-10 h-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className={`flex-1 overflow-hidden ${theme === 'dark' ? 'bg-[#1c1c1c]/90 text-white' : 'bg-white/90 text-black'}`}>
        {renderContent()}
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState<{ temp: number, desc: string }>({ temp: 21, desc: 'Sunny' });
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [wallpaper, setWallpaper] = useState('https://picsum.photos/seed/windows11/1920/1080?blur=2');
  const [taskbarAlignment, setTaskbarAlignment] = useState<TaskbarAlignment>('center');
  const [transparency, setTransparency] = useState(true);
  const [selectedIconIds, setSelectedIconIds] = useState<string[]>([]);
  const [selection, setSelection] = useState<{ start: { x: number, y: number }, end: { x: number, y: number } | null } | null>(null);
  const [fs, setFS] = useState<FSItem>({
    id: 'root',
    name: 'root',
    type: 'directory',
    children: [
      { id: 'desktop', name: 'Desktop', type: 'directory', children: [] },
      { id: 'docs', name: 'Documents', type: 'directory', children: [
        { id: 'welcome', name: 'welcome.txt', type: 'file', content: 'Welcome to Shadows 11!' }
      ] },
      { id: 'downloads', name: 'Downloads', type: 'directory', children: [] },
    ]
  });

  const t = TRANSLATIONS[language];
  const isLandscape = wallpaper.includes('unsplash');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Weather with Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current_weather=true`);
          const data = await res.json();
          setWeather({ temp: Math.round(data.current_weather.temperature), desc: 'Cloudy' }); // Simplified desc
        } catch (e) { console.error('Weather fetch failed', e); }
      });
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === '5') {
        e.preventDefault();
        openApp('taskmanager');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelection({ start: { x: e.clientX, y: e.clientY }, end: null });
      setIsStartOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selection) {
      setSelection({ ...selection, end: { x: e.clientX, y: e.clientY } });
    }
  };

  const handleMouseUp = () => {
    if (selection && selection.end) {
      const rect = {
        left: Math.min(selection.start.x, selection.end.x),
        top: Math.min(selection.start.y, selection.end.y),
        right: Math.max(selection.start.x, selection.end.x),
        bottom: Math.max(selection.start.y, selection.end.y),
      };

      const desktopIcons = document.querySelectorAll('.desktop-icon');
      const newSelectedIds: string[] = [];
      desktopIcons.forEach((icon: any) => {
        const iconRect = icon.getBoundingClientRect();
        if (
          iconRect.left < rect.right &&
          iconRect.right > rect.left &&
          iconRect.top < rect.bottom &&
          iconRect.bottom > rect.top
        ) {
          newSelectedIds.push(icon.dataset.id);
        }
      });
      setSelectedIconIds(newSelectedIds);
    } else if (selection) {
      setSelectedIconIds([]);
    }
    setSelection(null);
  };

  const openApp = (appId: AppID, file?: FSItem) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;

    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(windows.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      setActiveWindowId(existing.id);
      setIsStartOpen(false);
      return;
    }

    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      appId,
      title: file ? `${app.name} - ${file.name}` : app.name,
      isMaximized: false,
      isMinimized: false,
      zIndex: windows.length + 10,
      x: 100 + (windows.length % 5) * 40,
      y: 50 + (windows.length % 5) * 40,
      width: 800,
      height: 500,
      openedFile: file,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    setIsStartOpen(false);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMaximize = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const toggleMinimize = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(windows.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...windows.map(win => win.zIndex), 10) + 1 : w.zIndex
    })));
  };

  const updateWindowPos = (id: string, x: number, y: number) => {
    setWindows(windows.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const handleDownload = (name: string) => {
    const isAudio = name.toLowerCase().endsWith('.mp3') || name.toLowerCase().endsWith('.wav');
    if (!isAudio) {
      alert('Only .mp3 and .wav files are supported for isolated download in this system.');
      return;
    }

    const newFS = { ...fs };
    const downloadsFolder = newFS.children?.find(c => c.name === 'Downloads');
    if (downloadsFolder) {
      const newItem: FSItem = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        type: 'file',
        content: `Simulated audio content for ${name}`
      };
      downloadsFolder.children = [...(downloadsFolder.children || []), newItem];
      setFS(newFS);
      alert(`${name} has been downloaded to your Downloads folder.`);
      openApp('explorer');
    }
  };

  return (
    <div 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-1000 ${theme === 'dark' ? 'dark text-white' : 'bg-white text-black'}`} 
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      
      {/* Selection Area */}
      {selection && selection.end && (
        <div 
          className="absolute border border-blue-500 bg-blue-500/20 z-[99999] pointer-events-none"
          style={{
            left: Math.min(selection.start.x, selection.end.x),
            top: Math.min(selection.start.y, selection.end.y),
            width: Math.abs(selection.start.x - selection.end.x),
            height: Math.abs(selection.start.y - selection.end.y),
          }}
        />
      )}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ y: -1000, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={() => setIsLocked(false)}
            className="absolute inset-0 z-[100000] bg-cover bg-center flex flex-col items-center justify-center cursor-pointer"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/windows11/1920/1080)' }}
          >
            <div className="flex flex-col items-center gap-2 text-white drop-shadow-2xl">
              <span className="text-8xl font-light">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-2xl font-medium">
                {time.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div className="mt-auto mb-20 text-white/80 animate-bounce">
              {t.clickToUnlock}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Icons */}
      <div 
        className="absolute inset-0"
        onClick={() => { setIsStartOpen(false); setIsSearchOpen(false); }}
      />
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {APPS.slice(0, 5).map(app => (
          <div 
            key={app.id}
            data-id={app.id}
            onDoubleClick={() => openApp(app.id)}
            onClick={(e) => { e.stopPropagation(); setSelectedIconIds([app.id]); }}
            className={`desktop-icon flex flex-col items-center gap-1 w-20 p-2 rounded cursor-default group transition-colors ${selectedIconIds.includes(app.id) ? 'bg-white/20' : 'hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5'}`}
          >
            <app.icon size={32} className={`${(theme === 'dark' || isLandscape) ? 'text-white' : 'text-black'} drop-shadow-lg group-hover:scale-110 transition-transform`} />
            <span className={`text-[11px] ${(theme === 'dark' || isLandscape) ? 'text-white' : 'text-black'} text-center drop-shadow-md font-medium`}>{(t as any)[app.id]}</span>
          </div>
        ))}
      </div>

      {/* Windows Layer */}
      <AnimatePresence>
        {windows.map(win => (
          <AppWindow 
            key={win.id}
            win={win}
            activeWindowId={activeWindowId}
            onClose={closeWindow}
            onMaximize={toggleMaximize}
            onMinimize={toggleMinimize}
            onFocus={focusWindow}
            onUpdatePos={updateWindowPos}
            fs={fs}
            onUpdateFS={setFS}
            onOpenAppWithFile={openApp}
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            setTheme={setTheme}
            wallpaper={wallpaper}
            setWallpaper={setWallpaper}
            taskbarAlignment={taskbarAlignment}
            setTaskbarAlignment={setTaskbarAlignment}
            transparency={transparency}
            setTransparency={setTransparency}
            t={t}
            windows={windows}
            onDownload={handleDownload}
          />
        ))}
      </AnimatePresence>

      {/* Start Menu & Search */}
      <AnimatePresence>
        {(isStartOpen || isSearchOpen) && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-[640px] h-[720px] ${transparency ? 'mica-effect' : 'bg-white dark:bg-[#2c2c2c]'} rounded-xl window-shadow border dark:border-white/20 border-black/10 p-8 flex flex-col gap-8 z-[9999]`}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                autoFocus={isSearchOpen}
                placeholder={t.search}
                className="w-full bg-black/10 dark:bg-white/10 rounded-full py-2 pl-12 pr-4 outline-none border-b-2 border-transparent focus:border-blue-500 transition-all"
              />
            </div>

            {isStartOpen ? (
              <>
                {/* Pinned Apps */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold">{t.pinned}</span>
                    <button className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">{t.allApps} &gt;</button>
                  </div>
                  <div className="grid grid-cols-6 gap-y-6">
                    {APPS.map(app => (
                      <div 
                        key={app.id}
                        onClick={() => openApp(app.id)}
                        className="flex flex-col items-center gap-2 p-2 rounded hover:bg-white/10 cursor-default group"
                      >
                        <app.icon size={28} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] text-center">{(t as any)[app.id]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended */}
                <div className="h-40">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold">{t.recommended}</span>
                    <button className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">{t.more} &gt;</button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-default">
                      <FileText size={24} className="text-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">Project Notes</span>
                        <span className="text-[10px] text-gray-400">2h ago</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-default">
                      <Folder size={24} className="text-yellow-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">Photos</span>
                        <span className="text-[10px] text-gray-400">Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1">
                <span className="text-xs opacity-50">Best match</span>
                <div className="mt-4 grid gap-2">
                  {APPS.slice(0, 4).map(app => (
                    <div key={app.id} onClick={() => openApp(app.id)} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
                      <app.icon size={24} />
                      <span className="text-sm">{(t as any)[app.id]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Profile & Power */}
            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-default">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">JD</div>
                <span className="text-xs font-medium">John Doe</span>
              </div>
              <button className="p-2 rounded hover:bg-white/10">
                <Power size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className={`absolute bottom-0 left-0 w-full h-12 ${transparency ? 'glass-effect' : 'bg-white dark:bg-[#1c1c1c]'} border-t dark:border-white/10 border-black/5 flex items-center px-3 z-[10000] ${(theme === 'dark' || isLandscape) ? 'text-white' : 'text-black'}`}>
        {/* Left Side (Widgets/Weather) */}
        <div className={`${taskbarAlignment === 'center' ? 'flex-1' : 'flex-none mr-4'} flex items-center gap-2`}>
          <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-default">
            <div className="w-4 h-4 bg-yellow-400 rounded-full" />
            <span className="text-xs font-medium">{weather.temp}°C</span>
          </div>
        </div>

        {/* Center Icons */}
        <div className={`flex-1 flex items-center gap-1 ${taskbarAlignment === 'center' ? 'justify-center' : 'justify-start'}`}>
          <div 
            onClick={() => { setIsStartOpen(!isStartOpen); setIsSearchOpen(false); }}
            className={`p-2 rounded transition-all cursor-default ${isStartOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <LayoutGrid size={20} className="text-blue-400" />
          </div>
          <div 
            onClick={() => { setIsSearchOpen(!isSearchOpen); setIsStartOpen(false); }}
            className={`p-2 rounded transition-all cursor-default ${isSearchOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Search size={20} />
          </div>
          <div className="w-[1px] h-6 bg-white/10 mx-1" />
          {APPS.filter(app => app.id !== 'taskmanager').map(app => {
            const isOpen = windows.some(w => w.appId === app.id);
            const isActive = activeWindowId && windows.find(w => w.id === activeWindowId)?.appId === app.id;
            return (
              <div 
                key={app.id}
                onClick={() => openApp(app.id)}
                className={`relative p-2 rounded transition-all cursor-default group ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <app.icon size={20} />
                {isOpen && (
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all ${isActive ? 'w-4 bg-blue-400' : 'w-1.5 bg-gray-400 group-hover:w-3'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side (System Tray) */}
        <div className="flex-1 flex items-center justify-end gap-1">
          <div className="p-2 rounded hover:bg-white/10 cursor-default">
            <ChevronUp size={14} />
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-default">
            <Wifi size={14} />
            <Volume2 size={14} />
            <Battery size={14} />
          </div>
          <div className="flex flex-col items-end px-2 py-1 rounded hover:bg-white/10 cursor-default">
            <span className="text-[11px] font-medium leading-none">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="text-[11px] leading-none mt-1">
              {time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
          </div>
          <div className="w-1 h-full hover:bg-white/20 cursor-pointer ml-1" title="Show desktop" onClick={() => setWindows(windows.map(w => ({ ...w, isMinimized: true })))} />
        </div>
      </div>
    </div>
  );
}
