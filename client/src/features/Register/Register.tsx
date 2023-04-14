import { Grid } from '@mui/material';
import React from 'react';
import RegisterForm from '../../entities/RegisterForm/RegisterForm';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import { IFormRegisterInput } from '../../entities/RegisterForm/RegisterForm.types';
import * as Styled from './Register.styles';

const Register = () => {
  const handleSubmit = (inputs: IFormRegisterInput) => {
    console.log('submit', inputs);
    fetch('http://localhost:2300/registration', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((data) => console.log('res', data))
      .catch((err) => console.log(err));
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
