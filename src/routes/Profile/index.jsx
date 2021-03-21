import React, { useState, useEffect } from 'react';
import * as session from '../../helpers/auth/session';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { getUserData, updateUserData } from '../../actions/profile.actions';
import { routes } from '../../routes';
import { onLogout } from '../../actions/auth.actions';

const ProfilePage = () => {
  const history = useHistory();
  const [isFetching, setIsFetching] = useState(false);
  const [editorState, setEditorState] = useState({});
  const [updatedEditorState, setUpdatedEditorState] = useState({});

  useEffect(() => {
    getUserData(setIsFetching, onSuccess);
  }, []);

  const onChange = (type, value) => {
    setUpdatedEditorState({ ...editorState, [type]: value });
  };

  const onSuccess = (data) => {
    setEditorState({ ...data });
    setUpdatedEditorState({ ...data });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (JSON.stringify(editorState) !== JSON.stringify(updatedEditorState)) {
      updateUserData(updatedEditorState, setIsFetching, onSuccess);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    onLogout();
    session.clearSession();
    history.push(routes.login.link());
  }

  return (
    <div className="card profile">
      <h1>Profil użytkownika</h1>
      <form onSubmit={onSubmit}>
        <Input label="Imię:" onChange={(evt) => onChange('name', evt.target.value)} value={updatedEditorState.name} />
        <Input label="Email:" onChange={(evt) => onChange('email', evt.target.value)} value={updatedEditorState.email} />
        {isFetching
          ? <Spin />
          : <Button content="Zapisz" type="submit" />
        }
      </form>
      <a href="/#" onClick={(e) =>logout(e)}>Wyloguj się</a>
    </div>
  )
};

export default ProfilePage;
