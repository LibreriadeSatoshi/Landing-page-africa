import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import What from './components/What'
import Goal from './components/Goal'
import Why from './components/Why'
import How from './components/How'
import Benefits from './components/Benefits'
import EnrollmentForm from './components/EnrollmentForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <What />
        <Goal />
        <Why />
        <How />
        <Benefits />
        <EnrollmentForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
