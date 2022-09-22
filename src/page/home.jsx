/*  */
import React, { useState, useEffect } from 'react';
import {
  Container,
  FormControl,
  Paper,
  IconButton,
  Button,
  InputBase,
  Divider,
  Typography,
  Card, CardContent, CardActions
} from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
export default function Home(props) {
  const [searchtxt, setsearchtxt] = useState('');
  const [userlist, setuserlist] = useState([]);
  const [searchlist, setsearchlist] = useState([]);
  const navigate = useNavigate();
    useEffect(() => {
      showlist() 
    }, []);
  function showlist () {
    setuserlist(JSON.parse(localStorage.getItem('result')));
    setsearchlist(JSON.parse(localStorage.getItem('result')));
    }
    return (
      <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex',margin:'auto', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="search Name"
              value={searchtxt}
              onChange={(e) => {
                console.log(e.target.value)
                setsearchtxt(e.target.value);
              }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
              if (searchtxt === '') {
                setuserlist(searchlist)
              } else {
                let result = searchlist;
                let data = result.filter((ele) => {
                  console.log(ele.First_Name)
                  return ele.First_Name.indexOf(searchtxt) !== -1;
                })
                setuserlist(data);
              }
            }}>
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            
          </Paper>
        </FormControl>
        <Container fixed sx={{ p: '10px' }}>
          <Grid container spacing={2}>
            {
              userlist.map((ele,i) => {
                return (
                  <Grid item xs={12} key={i}>
                    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          First_Name:{ele.First_Name}
                          <br />
                          Last_Name:{ele.Last_Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Sex:{ele.Sex}
                          <br />
                          Age:{ele.Age}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" variant="contained" onClick={() => {
                          navigate(`/edit/${ele._id}`)
                        }}>Edit</Button>
                        <Button variant="outlined" size="small" onClick={() => {
                          console.log(ele._id)
                          alert('deleted success')
                          let result = searchlist.filter((dom, i) => {
                            return ele._id !== dom._id
                          })
                          localStorage.setItem('result',JSON.stringify(result))
                          showlist()
                        }}>deleted</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>
        </div>
    );
}