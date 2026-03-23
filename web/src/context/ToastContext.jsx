import { createContext, useCallback, useContext, useState } from 'react';
import Toast from '../components/Toast.jsx';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
}

function ToastContainer({ toasts }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 1000
        }}>
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

export function useToast() {
    return useContext(ToastContext);
}