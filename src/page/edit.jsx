/*  */
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Container,
  Button,
  Snackbar,
  InputLabel,
  Select,
  MenuItem, FormControl

} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
export default function List(props) {
  const [open, setOpen] = React.useState(false);
  const [txt, settxt] = useState('');
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');
  const [Sex, setSex] = useState('');
  const [Age, setAge] = useState('');
  const [_id, set_id] = useState('');
  const navigate = useNavigate();
  
  let params = useParams();
  let result = JSON.parse(localStorage.getItem('result'))
  useEffect(() => {
    set_id(params.id)
    let editdata = result.filter((ele) => {
      return ele._id === params.id
    })
    console.log(editdata[0])
    if (editdata.length !== 0) {
      setFirst_Name(editdata[0].First_Name)
      setLast_Name(editdata[0].Last_Name)
      setSex(editdata[0].Sex)
      setAge(editdata[0].Age)
    }
    }, []);
  return (
    <Container className='container' maxWidth="xs">
      <h2> Edit form</h2>
        <div><form noValidate autoComplete="off">
        <TextField
          label="First_Name"
          value={First_Name}
          style={{ margin: 8 }}
          placeholder="Placeholder"
          fullWidth
          margin="normal" onChange={(e) => {
            setFirst_Name(e.target.value)
          }}
        />
        <TextField
          label="Last_Name"
          value={Last_Name}
          style={{ margin: 8 }}
          placeholder="Placeholder"
          fullWidth
          margin="normal" onChange={(e) => {
            setLast_Name(e.target.value)
          }}
        />
        <FormControl fullWidth margin="normal" style={{ margin: 8 }}>
          <InputLabel id="demo-simple-select-label">Sex</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Sex}
            onChange={(e) => {
              setSex(e.target.value)
            }}
          >
            <MenuItem value={'Male'}>Male</MenuItem>
            <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          
          label="Age"
          value={Age}
          style={{ margin: 8 }}
          placeholder="Placeholder"
          fullWidth
          margin="normal"
            onChange={(e) => {
              setAge(e.target.value)
            }}
        />
        </form></div>
      <Button variant="contained" color="secondary"
        onClick={() => {
          if (First_Name === '' || Last_Name === '' || Sex === '' || Age === '') {
            settxt('Please fill in the content completely')
            setOpen(true);
          }else {
            settxt('')
            let updata = {
              _id,
              First_Name,
              Last_Name,
              Sex,
              Age,
            }
            let datas = result.map((ele) => {
              if (ele._id === updata._id) {
                ele = updata
              }
              return ele
            })
            localStorage.setItem('result', JSON.stringify(datas))
            settxt('edit success')
            setOpen(true);
            setTimeout(function () {
              navigate(`/home`)
            }, 2000)
          }
          
          
        }}>
        submit
      </Button>
      <Snackbar
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        autoHideDuration={1000}
        message={txt}
      />
      </Container>

    );
}