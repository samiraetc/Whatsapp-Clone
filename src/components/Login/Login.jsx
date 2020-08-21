import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import Logo from '../../assets/images/logo.png';

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login ">
      <div className="login__container">
        <img src={Logo} alt="" width="500px" height="500px" />
        <div className="login__text">
          <h1>Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Entre com Google</Button>
      </div>
    </div>
  );
}

export default Login;
