import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { onLogin } from '../../actions/auth.actions';
import { routes } from '../../routes';
import { containsRefreshToken } from '../../helpers/auth/session';

const LoginPage = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const isRegistered = props?.location?.state?.registered === true;

  useEffect(() => {
    if (containsRefreshToken()) {
      history.push(routes.profile.link());
    } else {
      setDisplayForm(true);
    }
  
    // eslint-disable-next-line
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password, setIsFetching, onSuccess);
  }

  const onSuccess = () => {
    history.push(routes.profile.link());
  }

  const onRegisterRedirect = (e) => {
    e.preventDefault();
    history.push(routes.register.link());
  }

  if (!displayForm) return null;;

  return (
    <div className="card login">
      <h1>Logowanie</h1>
      <form onSubmit={onSubmit}>
        {isRegistered && <h2>Twoje konto zostało założone!</h2>}
        <Input label='Email' onChange={(evt) => setEmail(evt.target.value)} value={email} />
        <Input label='Hasło' type="password" onChange={(evt) => setPassword(evt.target.value)} value={password} />
        {isFetching
          ? <Spin />
          : <Button busy={isFetching} content="Zaloguj" type="submit" />
        }

      </form>
      <label>Nie posiadasz konta? <a href="/#" onClick={(e) => onRegisterRedirect(e)}>Zarejestruj się</a></label>
    </div>
  )
};

export default LoginPage;
