import style from './Sidebar.module.css';
import { NavLink, useLocation } from 'react-router';
import { useAuth } from '../../../auth/UserAuth.jsx';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname.replaceAll('/', '');

  // Gives the active button class depending on pathname
  const getActiveButton = (linkTo) => {
    let classes = `${style.button}`;

    // Bank page is the index page
    if ((pathname === '' && linkTo === 'bank') || (pathname === linkTo)) {
      classes += ` ${style.active}`;
    }

    return classes;
  }

  return (
    <div className={style.sidebar}>
        <p className={style.greetings}>Hi, {user.name}!</p>
        <div className={style.buttons}>
          <NavLink to='/profile' className={getActiveButton('profile')}>User Profile</NavLink>
          <NavLink to='/budget' className={getActiveButton('budget')}>Budget</NavLink>
          <NavLink to='/ai' className={getActiveButton('ai')}>Ask AI</NavLink>
          <NavLink to='/bank' className={getActiveButton('bank')}>Bank Account</NavLink>
          <NavLink to='/test' className={getActiveButton('test')}>Test</NavLink>
        </div>
    </div>
  )
}