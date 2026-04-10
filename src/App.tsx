import { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import What from './components/What';
import Goal from './components/Goal';
import Why from './components/Why';
import How from './components/How';
import Benefits from './components/Benefits';
import EnrollmentForm from './components/EnrollmentForm';
import Footer from './components/Footer';
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
    <div className="min-h-screen">
      <Header onOpenApplication={() => setApplicationOpen(true)} />
      <main>
        <Hero onApply={() => setApplicationOpen(true)} />
        <What />
        <Goal />
        <Why />
        <How />
        <Benefits />
        <EnrollmentForm onOpenApplication={() => setApplicationOpen(true)} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
