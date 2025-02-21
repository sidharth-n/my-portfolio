import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Recognitions from './components/Recognitions';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-dark min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Recognitions />
      <Contact />
    </div>
  );
}

export default App