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
import { useNavigate } from "react-router-dom";
export default function List(props) {
  /* 提示框打开和关闭 */
  const [open, setOpen] = React.useState(false);
  /* 提示文本信息 */
  const [txt, settxt] = useState('');
  const [First_Name, setFirst_Name] = useState('');
  const [Last_Name, setLast_Name] = useState('');
  const [Sex, setSex] = useState('');
  const [Age, setAge] = useState('');
  const navigate = useNavigate();/* 路由跳转 */
    useEffect(() => {
        // document.title = `Hello, ${props.name}`;
    }, []);
  return (
    <Container className='container' maxWidth="xs">
      <h2> Add form</h2>
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
      </form>
      </div>
      <Button variant="contained" color="secondary"
        onClick={() => {
          if (First_Name === '' || Last_Name === '' || Sex === '' || Age === '' ) {
            settxt('Please fill in the content completely')
            setOpen(true);
          }else {
            settxt('')
            let result = {
              First_Name,
              Last_Name,
              Sex,
              Age,
            }
            fetch('http://120.79.251.89:3921/todolist', {
              method: 'post', headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams(result)
            })
              .then(response => response.json())//解析为可读数据
              .then((res) => {
                console.log(res)
                if (res.code === '000') {
                  settxt('add success')
                  setOpen(true);
                  setTimeout(function () {
                    navigate(`/home`)
                  },2000)
                }
              })//执行结果是 resolve就调用then方法
              .catch(err => {
                console.log(err)
              })//执行结果是 reject就调用catch方法
          }
          
          
        }}>
        submit
      </Button>
      <Snackbar
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        /*1 秒后自动关闭 */
        autoHideDuration={1000}
        message={txt}
      />
      </Container>

    );
}