import { useNavigate } from 'react-router';
import style from './Login.module.css';
import { useAuth } from '../../auth/UserAuth.jsx';
import Header from '../Baseplate/Header/Header.jsx';
import { useEffect, useState } from 'react';

export default function Login() {
  const { user, login, signup } = useAuth();
  const [displayLogin, setDisplayLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/bank');
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    await login({ username: username, password: password })
    .then(() => navigate('/bank'))
    .catch(reason => error(reason));
  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const email = document.getElementById('signupEmail').value;

    await signup({ username: username, password: password, email: email })
    .then(() => navigate('/bank'))
    .catch(reason => error(reason));
  }

  const error = (reason) => {
    const element = document.getElementById('error');
    element.textContent = reason;
    element.classList.add(style.visible);
    setTimeout(() => {
      element.classList.remove(style.visible);
    }, 3000);
  }

  const toggle = () => {
    setDisplayLogin(!displayLogin);
  }

  const renderLogin = () => {
    if (displayLogin) {
      return (
        <>
          <p className={style.titleText}>Login to WahooWallet</p>
          <form onSubmit={handleLogin} className={style.form}>
            <p className={style.inputTypeText}>Username</p>
            <input id='loginUsername' className={style.inputBox} />
            <p className={style.inputTypeText}>Password</p>
            <input id='loginPassword' type='password' className={style.inputBox} />
            <p id='error' className={style.error}></p>
            <button className={style.button}>Login</button>
          </form>
          <div className={style.switchContainer}>
            <p className={style.switchText}>Don't have an account?</p>
            <button onClick={toggle} className={style.button}>Signup</button>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <p className={style.titleText}>Signup for WahooWallet</p>
          <form onSubmit={handleSignup} className={style.form}>
            <p className={style.inputTypeText}>Username</p>
            <input id='signupUsername' className={style.inputBox} />
            <p className={style.inputTypeText}>Password</p>
            <input id='signupPassword' type='password' className={style.inputBox} />
            <p className={style.inputTypeText}>Email</p>
            <input id='signupEmail' type='email' className={style.inputBox} />
            <p id='error' className={style.error}></p>
            <button className={style.button}>Signup</button>
          </form>
          <div className={style.switchContainer}>
            <p className={style.switchText}>Have an account?</p>
            <button onClick={toggle} className={style.button}>Login</button>
          </div>
        </>
      )
    }
  }

  return (
    <div className={style.root}>
      <Header />
      <div className={style.pageContent}>
        <div className={style.blurpContainer}>
          <p className={style.blurbText}>Just a blurb about what the web app does</p>
        </div>
        <div className={style.sideContainer}>
          {renderLogin()}
        </div>
      </div>
      </div>
  )
}
