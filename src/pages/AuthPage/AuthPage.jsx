import React, {useState} from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "../../styles/AuthPage.css";

function AuthPage(props)
{
  const { setUser } = props;
  const [ showLogin, setShowLogin ] = useState(true);
  
  return (
    <main className={styles.AuthPage}>
      <div>
        <span></span>
        <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
      </div>
      {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </main>
  );
}

export default AuthPage;
