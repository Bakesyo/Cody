import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';

const NFCDemo = lazy(() => import('./components/NFCDemo'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

export function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Preload components while showing loading screen
    Promise.all([
      import('./components/NFCDemo'),
      import('./components/Projects'),
      import('./components/Contact')
    ]).then(() => {
      // Add a minimum delay for the loading screen
      setTimeout(() => {
        setIsInitialLoading(false);
      }, 2000);
    });
  }, []);

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <main className="app">
          <NFCDemo />
          <Projects />
          <Contact />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
} 