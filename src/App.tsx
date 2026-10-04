import { ReactLenis } from 'lenis/react';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    // ReactLenis acts as a wrapper to apply smooth scrolling globally
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <main className="min-h-screen font-sans">
        <Home />
      </main>
    </ReactLenis>
  );
}

export default App;