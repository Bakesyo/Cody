import { Suspense, lazy } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingScreen } from './components/LoadingScreen';

const NFCDemo = lazy(() => import('./components/NFCDemo'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

export function App() {
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