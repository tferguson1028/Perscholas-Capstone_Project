import React, { useState } from 'react';

import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';

import styles from "./AuthenticationPage.module.css";
import LogoSmall from '../../components/LogoSmall/LogoSmall';

function AuthenticationPage(props)
{
  const { setUser } = props;
  const [showLogin, setShowLogin] = useState(false);


  return (
    <main className={styles.AuthenticationPage}>
      <LogoSmall />
      <section className={styles.mainSection}>
        <header className={styles.introductionSection}>
          <h1>{showLogin ? "Welcome back!" : "Welcome!"}</h1>
          <p>Join the community and have fun playing card games without any risk to your bank account.</p>
          <p>Signing up is free and you get 100,000 points to use.</p>
        </header>
        <div className={styles.authSelect}>
          <button
            className={showLogin ? styles.buttonOn : styles.buttonOff}
            onClick={() => { setShowLogin(false); }}>
            Sign Up
          </button>
          <button
            className={showLogin ? styles.buttonOn : styles.buttonOff}
            onClick={() => { setShowLogin(true); }}>
            Login
          </button>
        </div>
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </section>
    </main>
  );
}

export default AuthenticationPage;
