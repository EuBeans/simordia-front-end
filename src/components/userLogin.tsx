import { Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserLoginform } from "../model/usersModel";
import { loginUserAction } from "../redux/actions/authSlice";
import { useAppDispatch } from '../utils/useAppDispatch';

const UserLogin = () => {

    const [user, setUser] = useState<UserLoginform>({
        email: '',
        password: '',
    });

const dispatch = useAppDispatch();

  const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, email: event.target.value });
    };

  const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, password: event.target.value });
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginUserAction(user));
        setUser({
            email: '',
            password: '',
        });
  };

  
  return (
    <Container component="main" maxWidth="xs">
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
            Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={user.email}
                onChange={handleEmailChange}
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
                autoComplete="current-password"
                value={user.password}
                onChange={handlePasswordChange}
                />
            </Grid>
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Sign In
            </Button>
            <Grid container justifyContent="flex-end">
            <Grid item>
            <Link href={'/register'}  variant="body2">
              Don't have an account? Sign up
            </Link>
            </Grid>
            </Grid>
        </Box>
        </Box>
    </Container>
  );
};

export default UserLogin;