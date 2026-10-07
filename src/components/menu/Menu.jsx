import { useEffect } from 'react';
import './menu.scss';
const links = [['intro', 'Home'], ['systems', 'Intelligence'], ['forward', 'How I Work'], ['works', 'Work Experience'], ['technology', 'Tech and Tools'], ['edu', 'Education'], ['portfolio', 'Projects'], ['testimonials', 'Certifications'], ['contact', 'Contact']];
export default function Menu({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    if (!menuOpen) return;
    const close = event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.hamburger')?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen, setMenuOpen]);
  return <>
    {menuOpen && <button className="menu-backdrop" type="button" aria-label="Close navigation overlay" onClick={() => setMenuOpen(false)} />}
    <nav id="site-navigation" aria-label="Portfolio sections" aria-hidden={!menuOpen} className={`menu ${menuOpen ? 'active' : ''}`}>
      <ul>{links.map(([id, label]) => <li key={id}><a href={`#/intro#${id}`} tabIndex={menuOpen ? 0 : -1} onClick={event => {
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        setMenuOpen(false);
      }}>{label}</a></li>)}</ul>
    </nav>
  </>;
}






