import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Content from './pages/Content';
import Data from './pages/Data';
import History from './pages/History';
import Contact from './pages/Contact';
import { AudienceProvider } from './context/AudienceProvider';

function App() {
  return (
    <AudienceProvider>
      <Header />
      <main>
        <Home />
        <About />
        <Content />
        <Data />
        <History />
        <Contact />
      </main>
      <Analytics />
    </AudienceProvider>
  );
}

export default App;
