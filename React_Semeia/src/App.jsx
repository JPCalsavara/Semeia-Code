import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/home';
import About from './pages/About';
import Content from './pages/Content';
import Data from './pages/Data';
import History from './pages/History';
import Contact from './pages/Contact';

function App() {
  const [isVolunteer, setIsVolunteer] = useState(false);

  const toggleVolunteer = () => {
    setIsVolunteer((prev) => !prev);
  };

  return (
    <>
      <Header isVolunteer={isVolunteer} onToggleVolunteer={toggleVolunteer} />
      <main>
        <Home isVolunteer={isVolunteer} />
        <About />
        <Content isVolunteer={isVolunteer} />
        <Data />
        <History />
        <Contact />
      </main>
    </>
  );
}

export default App;
