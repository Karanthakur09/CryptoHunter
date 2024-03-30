import { AppBar, Box, Button, Fade, Modal, Tab, Tabs, createTheme } from '@mui/material'
import React, { useState } from 'react'
import Login from './Login';
import SignUp from './SignUp';

const AuthModal = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#666",
        },
        mode: "dark",
    },
});


  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
          marginTop:15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={
            {
              width: 400,
              backgroundColor: '#424242',
              color: "white",
              borderRadius: 10,
            }
          }>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box sx={{
              padding: 8,
              paddingTop: 0,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: 20,
              fontSize: 20,
            }}>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default AuthModal