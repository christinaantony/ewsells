import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ToastProvider } from '@/components/ui/use-toast';

const Root = import.meta.env.MODE === 'development'
  ? (
      // Disable StrictMode in development to prevent double effect runs
      <ToastProvider>
        <App />
      </ToastProvider>
    )
  : (
      <StrictMode>
        <ToastProvider>
          <App />
        </ToastProvider>
      </StrictMode>
    );

createRoot(document.getElementById('root')!).render(Root);
