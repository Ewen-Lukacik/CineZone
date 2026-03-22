import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ toast }) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - (100 / (5000 / 50));
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
            <span>{toast.message}</span>
            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}