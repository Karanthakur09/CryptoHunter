import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React, { memo } from 'react';
import { useNavigate } from "react-router-dom";

import { CryptoState } from '../CryptoContext';
import AuthModal from './authentication/AuthModal';
import UserSidebar from './authentication/UserSidebar';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

function Header() {

  const navigate = useNavigate();
  const { currency, setCurrency, user } = CryptoState();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar>
        <Container>
          <Toolbar>
            <Typography sx={
              {
                flex: 1,
                color: "gold",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                cursor: "pointer",
              }
            }
              onClick={() => navigate('/')}
            >
              Crypto Hunter
            </Typography>
            <Select variant='outlined' value={currency}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              sx={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>
                USD
              </MenuItem>
              <MenuItem value={"INR"}>
                INR
              </MenuItem>
            </Select>
            {user ? <UserSidebar/> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider >
  )
}

export default memo(Header)