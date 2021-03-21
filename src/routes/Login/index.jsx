import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { onLogin } from './login.action';
import { routes } from '../../routes';

const LoginPage = () => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    onLogin(login, password, setIsFetching, setError, onSuccess);
  }

  const onSuccess = () => {
    history.push(routes.profile.link());
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      {isFetching && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Input label='Login' onChange={(evt) => setLogin(evt.target.value)} value={login} />
      <Input label='Hasło' onChange={(evt) => setPassword(evt.target.value)} value={password} />
      <Button content="Zaloguj" type="submit" />
    </form>
  )
};

export default LoginPage;
