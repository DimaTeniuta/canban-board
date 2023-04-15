import { Grid } from '@mui/material';
import React from 'react';
import RegisterForm from '../../entities/RegisterForm/RegisterForm';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import { IFormRegisterInput } from '../../entities/RegisterForm/RegisterForm.types';
import store from '../../shared/store/root';
import * as Styled from './Register.styles';

const Register = () => {
  const handleSubmit = (inputs: IFormRegisterInput) => {
    console.log('submit', inputs);
    store.user.registration(inputs.email, inputs.password);
  };

  return (
    <Styled.Container maxWidth="xl">
      <Styled.PaperContainer>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Grid item xl={4}>
            <RegisterForm onSubmit={handleSubmit} defaultValues={{ email: '', password: '' }} />
          </Grid>

          <Grid item xl={4} width={'100%'}>
            <Styled.LinkWrapper>
              <AuthRouteLink path={'/login'}>I have an account</AuthRouteLink>
            </Styled.LinkWrapper>
          </Grid>
        </Grid>
      </Styled.PaperContainer>
    </Styled.Container>
  );
};

export default Register;
