 //userRegisterform 
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UserRegisterform } from '../model/usersModel';
import { registerUserAction } from '../redux/actions/authSlice';
import { useAppDispatch } from '../utils/useAppDispatch';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Simordia
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  
export default function UserRegsiter(){

    const dispatch = useAppDispatch();
    const [user, setUser] = useState<UserRegisterform>({
        username: '',
        email: '',
        password: '',
    });

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(registerUserAction(user));
        setUser({
            username: '',
            email: '',
            password: '',
        });
    }

    const handleOnUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, username: event.target.value });
    };

    const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: event.target.value });
    };

    const handleOnPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, password: event.target.value });
    };


    return (
        //sx={{backgroundColor:'#2C3333'}}
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="user-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    onChange={handleOnUsernameChange}
                    autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleOnEmailChange}
                    autoComplete="email"
                
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleOnPasswordChange}
                    autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => { }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-center">
              <Grid item>
                <Link  href={'/'} variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>

    )

}



