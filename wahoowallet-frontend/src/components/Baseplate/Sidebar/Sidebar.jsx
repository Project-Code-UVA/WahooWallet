import style from './Sidebar.module.css';
import PropTypes from 'prop-types';

export default function Sidebar({ name = '12345678901' }) {
  return (
    <>
      <div className={style.sidebarContainer}>
          <p className={style.greetings}>Hi, {name}!</p>
          <button className={style.sidebarTitle}>User Profile</button>
          <button className={style.sidebarTitle}>Budget</button>
          <button className={style.sidebarTitle}>Ask AI</button>
          <button className={style.sidebarTitle}>Grubhub</button>
          <button className={`${style.sidebarTitle} ${style.active}`}>Bank Account</button>
      </div>
    </>
  )
}

Sidebar.propTypes = {
  name: PropTypes.string
}