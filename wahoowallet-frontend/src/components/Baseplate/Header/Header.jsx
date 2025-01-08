import style from './Header.module.css';
import { useAuth } from '../../../auth/UserAuth';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [signoutButton, setSignoutButton] = useState(null);

  // Allows for the signout button to show only when logged in
  useEffect(() => {
    setSignoutButton(user && true);
  }, [user]);

  return (
    <div className={style.header}>
      <div className={style.titleSegment}>
        <p className={style.wahooTitle}>WahooWallet</p>
        {signoutButton && <button onClick={() => logout()} className={style.signoutButton}>Sign out</button>}
      </div>
    </div>
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool
}