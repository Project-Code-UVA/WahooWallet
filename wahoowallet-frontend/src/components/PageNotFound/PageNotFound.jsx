import style from './PageNotFound.module.css';
import { NavLink, useLocation } from 'react-router';

export default function PageNotFound() {
  const pathname = useLocation().pathname;

  return (
    <div className={style.container}>
      <p className={style.notFoundText}>Page {pathname} not found!</p>
      <NavLink to='/' className={style.btn}>Return Home</NavLink>
    </div>
  )
}