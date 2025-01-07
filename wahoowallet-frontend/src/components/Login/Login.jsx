import { NavLink } from 'react-router';
import styles from './Login.module.css'; // Import the CSS Module

function LoginPage() {

  return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.titleSegment}>
            <p className={styles.wahooTitle}>WahooWallet</p>
          </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.blurpContainer}>
            <p className={styles.blurbText}>Just a blurb about what the web app does</p>
          </div>
          <div className={styles.loginContainer}>
            <div className={styles.loginTitle}>
              <p className={styles.logIntoWahooWalletText}>Log into Wahoo Wallet</p>
            </div>
            <div className={styles.inputSection}>
              <p className={styles.loginTypeText}>Username or Email</p>
              <input className={styles.loginInputBox}></input>
              <p className={styles.loginTypeText}>Password</p>
              <input className={styles.loginInputBox}></input>
            </div>
            <div className={styles.loginSignupSection}>
              <nav>
                <NavLink to='/bank' className={styles.loginSignupButton}>
                  <button className={styles.loginSignupButton}>Login</button>
                </NavLink>
                <p className={styles.dontHaveAccountText}>Don't have an account?</p>
                <NavLink to='/signup' className={styles.loginSignupButton}>
                  <button className={styles.loginSignupButton}>Signup</button>
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginPage;
