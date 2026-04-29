import { useState } from 'react';
import './index.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import ApplicationWizard from './components/ApplicationWizard';

function App() {
  const [applicationOpen, setApplicationOpen] = useState(false);

  if (applicationOpen) {
    return (
      <div className="min-h-screen">
        <Header applicationMode onCloseApplication={() => setApplicationOpen(false)} />
        <ApplicationWizard onClose={() => setApplicationOpen(false)} />
      </div>
    );
  }

  return (
    <div>
      <LandingPage onApply={() => setApplicationOpen(true)} />
    </div>
  );
}

export default App;
