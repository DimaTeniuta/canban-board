import { Grid } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import { IFormRegisterInput } from '../../entities/RegisterForm/RegisterForm.types';
import store from '../../shared/store/root';
import LoginForm from '../../entities/LoginForm';
import * as Styled from './Login.styles';

const Login = () => {
  const handleSubmit = async (inputs: IFormRegisterInput) => {
    console.log('submit', inputs);
    await store.user.login(inputs.email, inputs.password);
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
