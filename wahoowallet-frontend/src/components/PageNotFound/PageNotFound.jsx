import style from './PageNotFound.module.css';
import { NavLink } from 'react-router';

export default function PageNotFound() {

  return (
    <div className={style.container}>
      <p className={style.notFoundText}>Page not found!</p>
      <NavLink to='/' className={style.btn}>Return Home</NavLink>
    </div>
  )
}