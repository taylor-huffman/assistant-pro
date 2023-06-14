import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField, Box, Typography, Tabs, Tab, Alert, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Login() {

    useEffect(() => {
        checkSignupParam()
    }, [])

    const { setUser, isAuth, setIsAuth } = useContext(UserContext)
    const history = useHistory()
    const [value, setValue] = useState(0);
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [profilePicture, setProfilePicture] = useState()
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('')

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setError('')
        setLoginFormData({
            email: '',
            password: ''
        })
    };

    function handleSignUpFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setError('')
        
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
    }

    function handleLoginFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setError('')
        
        setLoginFormData({
          ...loginFormData,
          [name]: value,
        });
    }

      function handleSignupSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', profilePicture)
        formData.append('name', signupFormData.name)
        formData.append('address', signupFormData.address)
        formData.append('phone', signupFormData.phone)
        formData.append('email', signupFormData.email)
        formData.append('password', signupFormData.password)
        formData.append('password_confirmation', signupFormData.password_confirmation)

        fetch(`/accounts`, {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            body: formData
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                console.log(data)
                setUser(data)
                setIsAuth(true)
                history.push('/account')
            })
            : r.json().then(error => {
                console.log(error)
                setError(error.error)
                setSignupFormData({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                })
            })
        })
      }

      function handleLoginSubmit(e) {
        e.preventDefault()
        fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormData)
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                setUser(data)
                console.log(isAuth)
                setIsAuth(true)
                console.log(isAuth)
                history.push('/account')
            })
            : r.json().then(error => {
                console.log(error)
                setError(error.error)
                setLoginFormData({
                    email: '',
                    password: ''
                })
            })
        })
      }

        const urlParams = new URL(window.location.href).searchParams;
        const signup = urlParams.get('signup');
        const checkSignupParam = () => {
            if (signup) {
                setValue(1)
            } else return
        }

        const handleChangeProfilePicture = (e) => {
            // // const [file] = e.target.files[0]
            // console.log(e.target.files[0])
            
            // // if (file) {
            // //     let image = URL.createObjectURL(file)
            // //     setProfilePicture(image)
            // // }
            // let image = URL.createObjectURL(e.target.files[0])
            // setProfilePicture(image)
            console.log(e.target.files[0])
            setProfilePicture(e.target.files[0])
        }

    //   function handleLoginSubmit(e) {
    //     e.preventDefault()
    //     fetch(`/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(loginFormData)
    //     })
    //     .then(r => r.json())
    //     .then(data => {
    //         console.log(data)
    //         setUser(data)
    //         history.push('/account')
    //     })
    //   }

    return (
        <Box sx={{ marginTop: '8vh', marginBottom: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '400px', width: '90%' }}>
                <Tabs value={value} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Signup" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} style={{ maxWidth: '400px', width: '90%' }}>
            <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleLoginSubmit}
                    >
                        <Typography variant='h2' component='h2'>
                            Login
                        </Typography>
                        {error ? error.map(err => {
                            return <Alert key={err} severity="error" sx={{ width: '92%!important' }}>{err}</Alert>
                        }) : null}
                        <TextField
                            id="outlined-email"
                            label="Email"
                            name="email"
                            value={loginFormData.email}
                            onChange={handleLoginFormChange}
                            type="email"
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            name="password"
                            value={loginFormData.password}
                            type="password"
                            onChange={handleLoginFormChange}
                        />
                        <Button variant="contained" type='submit'>Submit</Button>
                    </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ maxWidth: '400px', width: '90%' }}>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        // encType='multipart/form-data'
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSignupSubmit}
                        >
                        <Typography variant='h2' component='h2'>
                            Signup
                        </Typography>
                        {error ? error.map(err => {
                            return <Alert key={err} severity="error" sx={{ width: '92%!important' }}>{err}</Alert>
                        }) : null}
                        <TextField
                            id="outlined-name"
                            label="Name"
                            name="name"
                            value={signupFormData.name}
                            onChange={handleSignUpFormChange}
                            type="text"
                        />
                        <TextField
                            id="outlined-address"
                            label="Full Address"
                            name="address"
                            value={signupFormData.address}
                            onChange={handleSignUpFormChange}
                            type="text"
                        />
                        <TextField
                            id="outlined-phone"
                            label="Phone Number"
                            name="phone"
                            value={signupFormData.phone}
                            onChange={handleSignUpFormChange}
                            type="text"
                        />
                        <TextField
                            id="outlined-email"
                            label="Email"
                            name="email"
                            value={signupFormData.email}
                            onChange={handleSignUpFormChange}
                            type="email"
                        />
                        <TextField
                            id="outlined-password"
                            label="Password"
                            name="password"
                            value={signupFormData.password}
                            type="password"
                            onChange={handleSignUpFormChange}
                        />
                        <TextField
                            id="outlined-password-confirmation"
                            label="Confirm Password"
                            name="password_confirmation"
                            value={signupFormData.password_confirmation}
                            type="password"
                            onChange={handleSignUpFormChange}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 56, height: 56, marginRight: '10px' }} src={profilePicture ? URL.createObjectURL(profilePicture) : null} />
                            <Button sx={{ height: 'fit-content' }} variant="outlined" component="label">
                                Upload Profile Image
                                <input hidden accept="image/png, image/jpeg" type="file" onChange={e => handleChangeProfilePicture(e)} />
                            </Button>
                            {/* <Typography>{profilePicture ? profilePicture : 'No image selected'}</Typography> */}
                        </Box>
                        <Button variant="contained" type='submit'>Submit</Button>
                    </Box>
                </Box>
            </TabPanel>
        </Box>
        // <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        //     <Box
        //         component="form"
        //         sx={{
        //             '& > :not(style)': { m: 1, maxWidth: '400px', width: '90%' },
        //             display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        //         }}
        //         noValidate
        //         autoComplete="off"
        //         onSubmit={handleSubmit}
        //         >
        //         <Typography variant='h1' component='h1'>
        //             Login
        //         </Typography>
        //         <TextField
        //             id="outlined-name"
        //             label="Name"
        //             name="name"
        //             value={formData.name}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-address"
        //             label="Full Address"
        //             name="address"
        //             value={formData.address}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-phone"
        //             label="Phone Number"
        //             name="phone"
        //             value={formData.phone}
        //             onChange={handleChange}
        //             type="text"
        //         />
        //         <TextField
        //             id="outlined-email"
        //             label="Email"
        //             name="email"
        //             value={formData.email}
        //             onChange={handleChange}
        //             type="email"
        //         />
        //         <TextField
        //             id="outlined-password"
        //             label="Password"
        //             name="password"
        //             value={formData.password}
        //             type="password"
        //             onChange={handleChange}
        //         />
        //         <Button variant="contained" type='submit'>Submit</Button>
        //     </Box>
        // </Box>
    )
}

export default Login
