import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import LoginForm from '../../entities/LoginForm';
import { IFormLoginInput } from '../../entities/LoginForm/LoginForm.types';
import { useLogInMutation } from '../../shared/store/api/endpoints/auth.endpoints';
import { useStoreDispatch } from '../../shared/hooks/store.hooks';
import { setUser } from '../../shared/store/slices/userSlice';
import * as Styled from './Login.styles';

const Login = () => {
  const navigate = useNavigate();
  const [logIn] = useLogInMutation();
  const dispatch = useStoreDispatch();

  const handleSubmit = (inputs: IFormLoginInput) => {
    console.log('submit', inputs);
    logIn(inputs)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        navigate(`/home`, { replace: true });
      })
      .catch((err) => {
        console.log(3333, err);
      });
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

export default Login;
