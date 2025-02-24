import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';

const NFCDemo = lazy(() => import('./components/NFCDemo'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <main className="app">
          <NFCDemo />
          <Projects />
          <Contact />
        </main>
      </Suspense>
    </ErrorBoundary>
  );
} 