import { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Header({ isVolunteer, onToggleVolunteer }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section on scroll
      const sections = ['sobre', 'conteudo', 'dados', 'historia', 'contato'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <section>
        <a href="#" className="logo">
          <img src="/images/logos/Logo Semeia-Photoroom.png" alt="logo" />
          <span>SEMEIA<br />CODE</span>
        </a>
        <Navbar
          isVolunteer={isVolunteer}
          onToggleVolunteer={onToggleVolunteer}
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
        />
      </section>
    </header>
  );
}

export default Header;