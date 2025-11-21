import { useState } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import Analytics from './components/Analytics';
import { NebulaProvider } from './context/NebulaContext';
import styles from './App.module.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <NebulaProvider>
      <div className={`container flex-col flex-center ${styles.container}`}>
        <button
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
          className={styles.settingsButton}
        >
          ⚙
        </button>

        <header className={styles.header}>
          <h1 className={styles.title}>
            Nebula
          </h1>
          <p className={styles.subtitle}>
            Zen Focus & Task Manager
          </p>
        </header>

        <main className={`flex-col flex-center ${styles.main}`}>
          <Timer />
          <Analytics />
          <TaskList />
        </main>

        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Nebula. Stay Focused.</p>
        </footer>
      </div>
    </NebulaProvider>
  );
}

export default App;
