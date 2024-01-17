import React, { useState } from 'react';

import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';

import styles from "./AuthenticationPage.module.css";

function AuthenticationPage(props)
{
  const { setUser } = props;
  const [ showLogin, setShowLogin ] = useState(true);


  return (
    <main className={styles.AuthenticationPage}>
      <header className="auth-page-header">
        <h1>Authentication</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, animi architecto ut ipsam et aperiam assumenda?</p>
      </header>
      <section className="auth-page-main">
        <div className='auth-page-auth-select'>
          <button onClick={() => { setShowLogin(false); }}>Sign Up</button>
          <button onClick={() => { setShowLogin(true); }}>Login</button>
        </div>
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      </section>
    </main>
  );
}

export default AuthenticationPage;
