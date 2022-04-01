import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import googlelogo from './googlelogo.svg';
import Typography from '@mui/material/Typography';
import { InputAdornment, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import { useHistory, useParams } from "react-router-dom";
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { user_URL } from "./App";

export function Auth() {

  const heading = ['login', 'signup'];
  const [value, setValue] = useState(0);
  const arr = heading[value];
  const handleChange = (event, newValue) => setValue(newValue);
  let history = useHistory();

  return <div className="auth-container">
    <div className="auth-heading">
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
          TabScrollButtonProps={{ style: { color: 'rgba(38, 9, 94, 0.5)' } }}
          TabIndicatorProps={{
            style: { background: "rgba(243, 167, 18, 1)" }
          }}
        >
          {heading.map((data, i) => {
            return <Tab key={i} id='market-tab-heading' style={{ color: (arr === data) ? 'black' : 'rgba(38, 9, 94, 0.5)' }} value={i} label={data} />;
          })}

        </Tabs>
      </Box>
    </div>

    {(arr === 'signup') ? <Signup /> : ''}
    {(arr === 'login') ? <Login /> : ''}
    <Button className='forgotpassword-button' color='error' onClick={() => history.push('/forgotpassword')}>Forgot Password?</Button>

  </div>;
}
function Signup() {

  const [progress, setProgress] = useState(0); // Progress Bar
  const [Message, setMessage] = useState('');

  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  let history = useHistory();
  let validation = yup.object({
    // eslint-disable-next-line
    Email: yup.string().required('Required Field').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must Be a Valid Email'),
    Password: yup.string().min(8, 'Minimum 8 Characters Required').required('Required Field')
  });

  // Password functionality
  const [text, setText] = useState('Show');
  const [visible, setVisible] = useState('password');
  const icon = (visible === 'password') ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === 'password') ? 'text' : 'password');
    setText((text) => (text === 'Show') ? 'Hide' : 'Show');
  };

  const SignUp = (userData) => {

    axios(
      {
        url: `${user_URL}/signup`,
        method: 'POST',
        data: userData,
      }).then(response => { setMessage({ message: response.data.message, result: 'success' }); })
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick).then(() => setProgress(0));
  };

  const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
    initialValues: { Email: '', Password: '' },
    validationSchema: validation,
    onSubmit: (userData) => { SignUp(userData); }
  });
  const GoogleSignUp = (userData) => {
    axios(
      {
        url: `${user_URL}/googlesignup`,
        method: 'POST',
        data: userData,
      }).then(response => response.data).then(data => {
        setMessage({ msg: data.Message, result: 'success' });
        localStorage.setItem('Email', data.Email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.type);

        setTimeout(() => { history.push('/'); }, 3000);
      })
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick).then(() => setProgress(0));
  };

  const Id = process.env.REACT_APP_CLIENT_ID;
  const handleSuccess = (response) => GoogleSignUp(response);



  return <div className="signup">
    {(progress === 1) && <CircularProgress id='loginprogress' color='primary'></CircularProgress>}
    <form onSubmit={handleSubmit}>
      <div className="textfield-container">
        <TextField type='text' label='Email' fullWidth className="signup-textfield" variant='outlined'
          error={errors.Email && touched.Email} value={values.Email} onChange={handleChange} onBlur={handleBlur}
          helperText={errors.Email && touched.Email && errors.Email} name='Email' id='Email' />
      </div>
      <br />

      <div className="textfield-container">
        <TextField type={visible} label='Password' fullWidth className="signup-textfield" variant='outlined'
          onChange={handleChange} onBlur={handleBlur} error={errors.Password && touched.Password} value={values.Password}
          helperText={errors.Password && touched.Password && errors.Password} name='Password' id='Password' InputProps={{
            endAdornment: (<InputAdornment position="start">
              <Tooltip title={text}>
                <IconButton onClick={() => visibility()}>
                  {icon}
                </IconButton>
              </Tooltip>
            </InputAdornment>
            ),
          }} />
      </div>
      <br />

      <Button type='submit' variant='contained' fullWidth color='warning'>Get Started</Button>
    </form>

    <div className='breakline'>
      <div className='line'></div>
      <p>OR</p>
      <div className='line'></div>
    </div>
    <GoogleLogin
      render={renderProps => (
        <Button onClick={renderProps.onClick} fullWidth variant="primary" className='register-G'>
          <img src={googlelogo} alt='logo' />
          Signup with Google</Button>
      )}

      clientId={Id}
      buttonText="Sign In"
      onSuccess={handleSuccess}
      cookiePolicy={'single_host_origin'} />
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={Message.result} sx={{ width: '100%' }}>
          {Message.msg}
        </Alert>
      </Snackbar>
    </Stack>

  </div>;
}
function Login() {

  const [progress, setProgress] = useState(0); // Progress Bar
  const [Message, setMessage] = useState('');

  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  let history = useHistory();
  let validation = yup.object({
    // eslint-disable-next-line
    Email: yup.string().required('Required Field').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must Be a Valid Email'),
    Password: yup.string().min(8, 'Minimum 8 Characters Required').required('Required Field')
  });



  const login = (userData) => {
    axios(
      {
        url: `${user_URL}/login`,
        method: 'POST',
        data: userData,
      }).then(response => response.data).then(data => {
        setMessage({ msg: data.Message, result: 'success' });
        localStorage.setItem('Email', data.Email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.type);
        setTimeout(() => { history.push('/'); }, 3000);
      })
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick).then(() => setProgress(0));
  };



  const { handleChange, handleBlur, handleSubmit, errors, values, touched } = useFormik({
    initialValues: { Email: '', Password: '' },
    validationSchema: validation,
    onSubmit: (userData) => { login(userData); }
  });

  const googleLogin = (userData) => {

    axios(
      {
        url: `${user_URL}/googlelogin`,
        method: 'POST',
        data: userData,
      }).then(response => response.data).then(data => {
        setMessage({ msg: data.Message, result: 'success' });
        localStorage.setItem('Email', data.Email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.type);
        setTimeout(() => { history.push('/'); }, 3000);
      }).catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' }))
      .then(handleClick).then(() => setProgress(0));

  };

  // Password functionality
  const [text, setText] = useState('Show');
  const [visible, setVisible] = useState('password');
  const icon = (visible === 'password') ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === 'password') ? 'text' : 'password');
    setText((text) => (text === 'Show') ? 'Hide' : 'Show');
  };


  const Id = process.env.REACT_APP_CLIENT_ID;
  const handleSuccess = (response) => googleLogin(response);

  return (<div className="login">
    {(progress === 1) && <CircularProgress id='loginprogress' color='primary'></CircularProgress>}

    <form onSubmit={handleSubmit}>
      <div className="textfield-container">
        <TextField type='text' label='Email' fullWidth className="signup-textfield" variant='outlined'
          error={errors.Email && touched.Email} value={values.Email} onChange={handleChange} onBlur={handleBlur}
          helperText={errors.Email && touched.Email && errors.Email} name='Email' id='Email' />
      </div>
      <br />

      <div className="textfield-container">
        <TextField type={visible} label='Password' fullWidth className="signup-textfield" variant='outlined'
          onChange={handleChange} onBlur={handleBlur} error={errors.Password && touched.Password} value={values.Password}
          helperText={errors.Password && touched.Password && errors.Password} name='Password' id='Password' InputProps={{
            endAdornment: (<InputAdornment position="start">
              <Tooltip title={text}>
                <IconButton onClick={() => visibility()}>
                  {icon}
                </IconButton>
              </Tooltip>
            </InputAdornment>
            ),
          }} />
      </div>
      <br />

      <Button variant='contained' type='submit' fullWidth color='primary'>Log In</Button>
    </form>
    <div className='breakline'>
      <div className='line'></div>
      <p>OR</p>
      <div className='line'></div>
    </div>

    <GoogleLogin
      render={renderProps => (
        <Button onClick={renderProps.onClick} fullWidth color="primary" className='login-G'>
          <img src={googlelogo} alt='logo' />
          Login In With Google</Button>
      )}

      clientId={Id}
      buttonText="Sign In"
      onSuccess={handleSuccess}
      cookiePolicy={'single_host_origin'} />

    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={Message.result} sx={{ width: '100%' }}>
          {Message.msg}
        </Alert>
      </Snackbar>
    </Stack>

  </div>);
}
// Forgot Password


export function ForgotPassword() {
  let history = useHistory();
  const [, setEmail] = useState('');

  const [progress, setProgress] = useState(0); // Progress Bar
  const [Message, setMessage] = useState('');

  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };



  let validation = yup.object(
    {                 // eslint-disable-next-line
      Email: yup.string().required('Required Field').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must Be a Valid Email'),
    });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik(
    {
      initialValues: { Email: '' },
      validationSchema: validation,
      onSubmit: (userdata) => forgotPassword(userdata)
    });

  const forgotPassword = async (userdata) => {
    setProgress(1);
    axios(
      {
        url: `${user_URL}/forgotpassword`,
        method: 'POST',
        data: userdata
      }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' }); })
      .catch((error) => setMessage({ msg: error.response.data.Message, result: 'warning' })).then(handleClick).then(() => setProgress(0));
  };


  return (
    <div className='forgotpage'>

      {(progress === 1) && <CircularProgress id='forgotprogress' color='primary'></CircularProgress>}

      <div className='forgotpassword'>

        <Typography gutterBottom variant="h5" className='forgotpasswordheading' component="div">Forgot Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField type="text" className='forgottextfield' fullWidth

            onChange={handleChange} onBlur={handleBlur} error={errors.Email && touched.Email} value={values.Email} onInput={(e) => setEmail(e.target.value)}
            helperText={errors.Email && touched.Email && errors.Email} name='Email' id='Email'
            placeholder="Email" /><br />
          <Button type="submit" fullWidth variant='contained' color='warning'>Submit</Button>
        </form><br />
        <Button type="submit" className='forgotpasswordback' color='primary' onClick={() => history.push('/Auth')}>Back To Login</Button>
        {/* Snack Bar */}
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity={Message.result} sx={{ width: '100%' }}>
              {Message.msg}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>);
}
// Update Password Page



export function UpdatePassword() {
  const [progress, setProgress] = useState(0); // Progress Bar
  const { id: token } = useParams();
  const [Message, setMessage] = useState('');
  let history = useHistory();


  // Snack Bar Open/Close Status
  const [open, setOpen] = useState(false);
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  // Snack Bar Open/Close function
  const handleClick = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };


  let validation = yup.object(
    {
      Password: yup.string().min(8, 'Minimum 8 Characters Required').required('Required Field')
    });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik(
    {
      initialValues: { Password: '', token },
      validationSchema: validation,
      onSubmit: (userdata) => Changepassword(userdata)
    });

  // Password functionality
  const [text, setText] = useState('Show');
  const [visible, setVisible] = useState('password');
  const icon = (visible === 'password') ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === 'password') ? 'text' : 'password');
    setText((text) => (text === 'Show') ? 'Hide' : 'Show');
  };

  const Changepassword = async (userdata) => {
    setProgress(1);
    axios(
      {
        url: `${user_URL}/updatepassword`,
        method: 'POST',
        data: userdata
      }).then(response => response.data).then(data => { setMessage({ msg: data.Message, result: 'success' }); setTimeout(() => history.push('/Auth'), 2000); })
      .catch((error) => { setMessage({ msg: error.response.data.Message, result: 'warning' }); setProgress(0); }).then(handleClick);
  };


  return (<div>

    {(progress === 1) && <CircularProgress id='changepasswordprogress' color='primary'></CircularProgress>}
    <div className='updatepassword'>

      <Typography gutterBottom variant="h5" className='updatepasswordheading' component="div">Change Password</Typography>

      <form onSubmit={handleSubmit}>

        <TextField className='updatepasswordtextfield' fullWidth
          onChange={handleChange} onBlur={handleBlur} error={errors.Password && touched.Password} value={values.Password}
          helperText={errors.Password && touched.Password && errors.Password} name='Password' id='Password' type={visible}
          placeholder="Password" InputProps={{
            endAdornment: (<InputAdornment position="start">
              <Tooltip title={text}>
                <IconButton onClick={() => visibility()}>
                  {icon}
                </IconButton>
              </Tooltip>
            </InputAdornment>
            ),
          }} />
        <br />

        <Button type="submit" variant='contained' fullWidth>  Update Password</Button>
      </form>
    </div>
    {/* Snack Bar */}
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={Message.result} sx={{ width: '100%' }}>
          {Message.msg}
        </Alert>
      </Snackbar>
    </Stack>
  </div>);

}
