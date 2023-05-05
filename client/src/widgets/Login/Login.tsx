import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AuthRouteLink from '../../shared/UI/AuthRouteLink/AuthRouteLink';
import LoginForm from '../../entities/LoginForm';
import { IFormLoginInput } from '../../entities/LoginForm/LoginForm.types';
import { useLogInMutation } from '../../shared/store/api/endpoints/auth.endpoints';
import { useStoreDispatch } from '../../shared/hooks/storeHooks';
import { setUser } from '../../shared/store/slices/userSlice/userSlice';
import * as Styled from './Login.styles';

const Login = () => {
  const navigate = useNavigate();
  const [logIn] = useLogInMutation();
  const dispatch = useStoreDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (inputs: IFormLoginInput) => {
    logIn(inputs)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        navigate(`/boards`, { replace: true });
      })
      .catch((err) => {
        enqueueSnackbar(err.data.errorMessage, { variant: 'error' });
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
