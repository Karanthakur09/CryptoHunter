import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material'
import React, { memo } from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

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
  const { currency, setCurrency } = CryptoState();
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
            <Select variant='outlined' value={"INR"}
              sx={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={currency}>
                USD
              </MenuItem>
              <MenuItem value={currency}>
                INR
              </MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider >
  )
}

export default memo(Header)