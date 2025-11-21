import { useState } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import SettingsModal from './components/SettingsModal';
import Analytics from './components/Analytics';
import { NebulaProvider } from './context/NebulaContext';
import styles from './App.module.css';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [zenMode, setZenMode] = useState(false);

  return (
    <NebulaProvider>
      <div className={`container flex-col flex-center ${styles.container}`}>
        <button
          onClick={() => setIsSettingsOpen(true)}
          aria-label="Open settings"
          className={styles.settingsButton}
          style={{ opacity: zenMode ? 0 : 1, pointerEvents: zenMode ? 'none' : 'auto' }}
        >
          ⚙
        </button>

        <header className={styles.header} style={{ opacity: zenMode ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <h1 className={styles.title}>
            Nebula
          </h1>
          <p className={styles.subtitle}>
            Zen Focus & Task Manager
          </p>
        </header>

        <main className={styles.main} style={{
          maxWidth: zenMode ? '600px' : undefined
        }}>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <Timer />
            <button
              onClick={() => setZenMode(!zenMode)}
              className="glass-button"
              title={zenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                padding: '0.5rem',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
                transition: 'opacity 0.3s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              {zenMode ? '✕' : '⛶'}
            </button>
          </div>

          {!zenMode && (
            <>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <TaskList />
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Analytics />
              </div>
            </>
          )}
        </main>

        <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

        <footer className={styles.footer} style={{ opacity: zenMode ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <p>© {new Date().getFullYear()} Nebula. Stay Focused.</p>
        </footer>
      </div>
    </NebulaProvider>
  );
}

export default App;
