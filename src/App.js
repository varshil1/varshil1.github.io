import Forward from './components/systems/Forward';
import Systems from "./components/systems/Systems";
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Theme';
import Topbar from './components/topbar/Topbar';
import Menu from './components/menu/Menu';
import Intro from './components/intro/Intro';
import Education from './components/education/Education';
import Portfolio from './components/portfolio/Portfolio';
import Works from './components/works/Works';
import Technology from './components/technology/Technology';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import LaunchScreen from './LaunchScreen';
import './app.scss';
import './theme.scss';

function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <>
    <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    <main className="sections" id="main-content">
      <Intro /><Systems /><Forward /><Works /><Technology /><Education /><Portfolio /><Testimonials /><Contact />
    </main>
  </>;
}
export default function App() {
  return <ThemeProvider><div className="app"><LaunchScreen /><Routes>
    <Route path="/" element={<PortfolioPage />} />
    <Route path="/intro" element={<PortfolioPage />} />
    <Route path="*" element={<PortfolioPage />} />
  </Routes></div></ThemeProvider>;
}







