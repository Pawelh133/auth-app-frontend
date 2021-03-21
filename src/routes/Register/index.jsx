import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { onRegister } from './register.action';
import { routes } from '../../routes';
import { containsRefreshToken } from '../../helpers/auth/session';

const RegisterPage = () => {
  const history = useHistory();
  const [editorState, setEditorState] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

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
    onRegister(editorState.email, editorState.password, setIsFetching, onSuccess);
  }

  const onChange = (type, value) => {
    setEditorState({ ...editorState, [type]: value });
  };

  const onSuccess = () => {
    history.push(routes.login.link(), { registered: true });
  }

  const onRegisterRedirect = (e) => {
    e.preventDefault();
    history.push(routes.login.link());
  }

  if (!displayForm) return null;;

  return (
    <div className="login">
      <h1>Rejestracja</h1>
      <form onSubmit={onSubmit}>
        {isFetching && <div>Loading...</div>}
        <Input label='Email' onChange={(evt) => onChange('email', evt.target.value)} value={editorState.email} />
        <Input label='Hasło' onChange={(evt) => onChange('password', evt.target.value)} value={editorState.password} />
        <Button content="Rejestracja" type="submit" />
      </form>
      <a href="/#" onClick={(e) => onRegisterRedirect(e)}>Powrót do logowania </a>
    </div>
  )
};

export default RegisterPage;
