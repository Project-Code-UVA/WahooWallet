import { NavLink, useNavigate } from 'react-router';
import styles from './Login.module.css'; // Import the CSS Module
import { useAuth } from '../../auth/UserAuth.jsx';
import Header from '../Baseplate/Header/Header.jsx';
import { useEffect } from 'react';

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/bank');
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    await login({ username: username, password: password })
    .then(() => navigate('/bank'))
    .catch(reason => invalidPassword(reason));
  }

  const invalidPassword = (reason) => {
    const element = document.getElementById('invalidLogin');
    element.textContent = reason;
    element.classList.add(styles.visible);
    setTimeout(() => {
      element.classList.remove(styles.visible);
    }, 3000);
  }

  return (
      <div className={styles.root}>
        <Header />
        <div className={styles.mainContent}>
          <div className={styles.blurpContainer}>
            <p className={styles.blurbText}>Just a blurb about what the web app does</p>
          </div>
          <div className={styles.loginContainer}>
            <div className={styles.loginTitle}>
              <p className={styles.logIntoWahooWalletText}>Log into Wahoo Wallet</p>
            </div>
            <form onSubmit={handleLogin}>
            <div className={styles.inputSection}>
                <p className={styles.loginTypeText}>Username or Email</p>
                <input id='user' className={styles.loginInputBox}></input>
                <p className={styles.loginTypeText}>Password</p>
                <input id='pass' className={styles.loginInputBox}></input>
                <p id='invalidLogin' className={styles.invalidLogin}></p>
            </div>
            <div className={styles.loginSignupSection}>
              <nav>
                <button type='submit' className={styles.loginSignupButton}>Login</button>
                <p className={styles.dontHaveAccountText}>Don't have an account?</p>
                <NavLink to='/signup' className={styles.loginSignupButton}>
                  <button className={styles.loginSignupButton}>Signup</button>
                </NavLink>
              </nav>
            </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default LoginPage;
