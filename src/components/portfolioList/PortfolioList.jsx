import './portfolioList.scss';
export default function PortfolioList({ id, title, active, setSelected }) {
  return <li><button type="button" className={active ? 'portfolioList active' : 'portfolioList'} aria-pressed={active} onClick={() => setSelected(id)}>{title}</button></li>;
}
