import { Grid } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import store from '../../shared/store/root';
import LoginForm from '../../entities/LoginForm';
import { IFormLoginInput } from '../../entities/LoginForm/LoginForm.types';
import * as Styled from './Login.styles';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (inputs: IFormLoginInput) => {
    console.log('submit', inputs);
    await store.user.login(inputs.email, inputs.password);
    navigate(`/home`, { replace: true });
  };

  return (
    <Styled.Container maxWidth="xl">
      <Styled.PaperContainer>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <LoginForm onSubmit={handleSubmit} defaultValues={{ email: '', password: '' }} />
          </Grid>

          <Grid item xl={4} width={'100%'}>
            <Styled.LinkWrapper>
              <AuthRouteLink path={'/register'}>{"I don't have an account"}</AuthRouteLink>
            </Styled.LinkWrapper>
          </Grid>
        </Grid>
      </Styled.PaperContainer>
    </Styled.Container>
  );
};

export default observer(Login);
