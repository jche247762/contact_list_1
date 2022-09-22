
import './App.css';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';

function App () {
  const [result, setresult] = useState('');
  useEffect(() => {
    console.log(localStorage.getItem('result'))
    if (localStorage.getItem('result') == null) {
      fetch('/data.json', {
        method: 'GET',
      }).then(response => response.json())
        .then((res) => {
          console.log(res)
          localStorage.setItem('result', JSON.stringify(res))
          setresult(res)
        }).catch((err) => {
          console.log(err)
        }); // connection errors
      
    } else {
      setresult(JSON.parse(localStorage.getItem('result')))
    }

  }, []);
  return (
    
    <div>
      {
        result === '' ? '' :
          (
            <div>
              <Box sx={{ display: 'flex' }} id="mainbox">
                <AppBar component="nav">
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={() => { }}
                      sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                      MUI
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      <Button onClick={() => {
                        window.localStorage.setItem('result', JSON.stringify(result))
                      }} sx={{ color: '#fff' }}>
                        restart Data
                      </Button>
                      <Button href='/' sx={{ color: '#fff' }}>
                        Home
                      </Button>
                      <Button href='/add' sx={{ color: '#fff' }}>
                        Add
                      </Button>
                    </Box>
                  </Toolbar>
                </AppBar>
              </Box>
              <Outlet />
            </div>
          )
      }
    </div>
  );
}

export default App;
