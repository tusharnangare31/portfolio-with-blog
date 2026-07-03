import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Showcase from './components/Sections/Showcase';
import SkillsShowcase from './components/Sections/SkillsShowcase';
import ProjectPipeline from './components/Sections/ProjectPipeline';
import MiniProjects from './components/Sections/MiniProjects';
import Achievements from './components/Sections/Achievements';
import Education from './components/Sections/Education';
import Contact from './components/Sections/Contact';
import ScrollWrapper from './components/ScrollWrapper';
import GlobalModal from './components/ui/GlobalModal';
import Snackbar from './components/ui/Snackbar';
import ResumeModal from './components/ui/ResumeModal';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    data: null,
    type: null,
  });
  
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const openModal = (data, type) => {
    setModalConfig({
      isOpen: true,
      data,
      type,
    });
  };

  const closeModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  const [snackbarConfig, setSnackbarConfig] = useState({
    isOpen: false,
    message: '',
  });

  const showSnackbar = (message) => {
    setSnackbarConfig({
      isOpen: true,
      message,
    });
  };

  const closeSnackbar = () => {
    setSnackbarConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ScrollWrapper>
      <div className="bg-background text-foreground selection:bg-accent/30 selection:text-accent">
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        
        <main>
          <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
          <About />
          <Education onOpenModal={openModal} />
          <Showcase onOpenModal={openModal} />
          <ProjectPipeline onOpenModal={openModal} />
          <SkillsShowcase onOpenModal={openModal} />
          <Achievements onOpenModal={openModal} />
          <MiniProjects onOpenModal={openModal} />
          <Contact />
        </main>

        <Footer />

        <GlobalModal 
          isOpen={modalConfig.isOpen}
          onClose={closeModal}
          data={modalConfig.data}
          type={modalConfig.type}
          onOpenModal={openModal}
          onShowSnackbar={showSnackbar}
        />

        <Snackbar 
          isOpen={snackbarConfig.isOpen}
          message={snackbarConfig.message}
          onClose={closeSnackbar}
        />
        
        <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      </div>
    </ScrollWrapper>
  );
}

export default App;
