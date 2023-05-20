// import React, { useContext, useState } from 'react'
// import { Button, TextField, Box, Typography, Tabs, Tab, Alert } from '@mui/material';
// import PropTypes from 'prop-types';
// import { UserContext } from '../context/user';
// import { useHistory } from 'react-router-dom'

// function ProfileAssistantCreate() {

//     const { user, setUser, isAuth, setIsAuth } = useContext(UserContext)
//     const history = useHistory()
//     const [signupFormData, setSignupFormData] = useState({
//         company_name: '',
//         company_bio: '',
//         company_start_date: ''
//     });
//     // const [error, setError] = useState('')


//     function handleSignUpFormChange(event) {
//         const name = event.target.name;
//         let value = event.target.value;
        
//         setSignupFormData({
//           ...signupFormData,
//           [name]: value,
//         });
//     }

//     console.log(signupFormData)
//     console.log(user.id)

//       function handleSignupSubmit(e) {
//         e.preventDefault()
//         fetch(`/employers`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({...signupFormData, account_id: user.id})
//         })
//         .then(r => r.json())
//         .then(data => {
//             console.log(data)
//             setUser({...user, employer: data})
//             history.push('/account/profile-employer')
//         })
//       }

//     //   function handleLoginSubmit(e) {
//     //     e.preventDefault()
//     //     fetch(`/login`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(loginFormData)
//     //     })
//     //     .then(r => {
//     //         r.ok ? r.json().then(data => {
//     //             setUser(data)
//     //             console.log(isAuth)
//     //             setIsAuth(true)
//     //             history.push('/account')
//     //         })
//     //         : r.json().then(error => {
//     //             console.log(error)
//     //             setError(error.error.login)
//     //             setLoginFormData({
//     //                 email: '',
//     //                 password: ''
//     //             })
//     //         })
//     //     })
//     //   }

//     //   function handleLoginSubmit(e) {
//     //     e.preventDefault()
//     //     fetch(`/login`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(loginFormData)
//     //     })
//     //     .then(r => r.json())
//     //     .then(data => {
//     //         console.log(data)
//     //         setUser(data)
//     //         history.push('/account')
//     //     })
//     //   }

//     return (
//         <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                 <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                     <Box
//                         component="form"
//                         sx={{
//                             '& > :not(style)': { m: 1, width: '100%' },
//                             display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
//                         }}
//                         noValidate
//                         autoComplete="off"
//                         onSubmit={handleSignupSubmit}
//                         >
//                         <Typography variant='h2' component='h2'>
//                             Create Employer
//                         </Typography>
//                         <TextField
//                             id="outlined-company-name"
//                             label="Company Name"
//                             name="company_name"
//                             value={signupFormData.company_name}
//                             onChange={handleSignUpFormChange}
//                             type="text"
//                         />
//                         <TextField
//                             id="outlined-company-bio"
//                             label="Company Bio"
//                             name="company_bio"
//                             value={signupFormData.company_bio}
//                             onChange={handleSignUpFormChange}
//                             type="textarea"
//                             multiline
//                             rows={4}
//                         />
//                         <TextField
//                             id="outlined-company-start-date"
//                             label="Company Start Date"
//                             type="date"
//                             name="company_start_date"
//                             value={signupFormData.company_start_date}
//                             onChange={handleSignUpFormChange}
//                             // sx={{ width: 220 }}
//                             InputLabelProps={{
//                             shrink: true,
//                             }}
//                         />
//                         <Button variant="contained" type='submit'>Create</Button>
//                     </Box>
//                 </Box>
//         </Box>
//         // <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         //     <Box
//         //         component="form"
//         //         sx={{
//         //             '& > :not(style)': { m: 1, maxWidth: '400px', width: '90%' },
//         //             display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
//         //         }}
//         //         noValidate
//         //         autoComplete="off"
//         //         onSubmit={handleSubmit}
//         //         >
//         //         <Typography variant='h1' component='h1'>
//         //             Login
//         //         </Typography>
//         //         <TextField
//         //             id="outlined-name"
//         //             label="Name"
//         //             name="name"
//         //             value={formData.name}
//         //             onChange={handleChange}
//         //             type="text"
//         //         />
//         //         <TextField
//         //             id="outlined-address"
//         //             label="Full Address"
//         //             name="address"
//         //             value={formData.address}
//         //             onChange={handleChange}
//         //             type="text"
//         //         />
//         //         <TextField
//         //             id="outlined-phone"
//         //             label="Phone Number"
//         //             name="phone"
//         //             value={formData.phone}
//         //             onChange={handleChange}
//         //             type="text"
//         //         />
//         //         <TextField
//         //             id="outlined-email"
//         //             label="Email"
//         //             name="email"
//         //             value={formData.email}
//         //             onChange={handleChange}
//         //             type="email"
//         //         />
//         //         <TextField
//         //             id="outlined-password"
//         //             label="Password"
//         //             name="password"
//         //             value={formData.password}
//         //             type="password"
//         //             onChange={handleChange}
//         //         />
//         //         <Button variant="contained" type='submit'>Submit</Button>
//         //     </Box>
//         // </Box>
//     )
// }

// export default ProfileAssistantCreate




import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Box, Typography, Tabs, Tab, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom'

function ProfileAssistantCreate() {

    useEffect(() => {
        fetch('/task_categories')
        .then(r => {
            r.ok ? r.json().then(data => setCategoriesFetch(data))
            : r.json().then(error => console.log(error))
        })
    }, [])

    const { user, setUser, isAuth, setIsAuth } = useContext(UserContext)
    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        company_name: '',
        company_bio: '',
        company_start_date: '',
        hourly_rate: '',
    });
    const [signupFormSelect, setSignupFormSelect] = useState({
        task_category: ''
    })
    const [categoriesFetch, setCategoriesFetch] = useState([])
    const [error, setError] = useState('')


    function handleSignUpFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setError('')
        
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
    }

    function handleFormSelectChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setError('')
        
        setSignupFormSelect({
          [name]: value,
        });
    }

    

    console.log(signupFormData)
    console.log(signupFormSelect)

    function handleSignupSubmit(e) {
        e.preventDefault()

        async function assistant() {
            const response = await fetch(`/assistants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...signupFormData, account_id: user.id})
            })
            return response
        }

        async function taskCategory() {
            const response = await fetch(`/assistant_tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task_category_id: categoriesFetch.filter(cat => cat.name === signupFormSelect.task_category).id, assistant_id: user.id})
            })
            return response
        }

        if (assistant().ok && taskCategory().ok) {
            return assistant().then(data => {
                console.log(data)
            })
        } else {
            console.log('not ok')
        }

        // fetch(`/assistants`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({...signupFormData, account_id: user.id})
        // })
        // .then(r => {
        //     r.ok ? r.json().then(data => {
        //         console.log(data)
        //         setUser({...user, assistant: data})
        //         history.push('/account/profile-assistant')
        //     })
        //     : r.json().then(error => {
        //         console.log(error)
        //         setError(error.error)
        //         setSignupFormData({
        //             company_name: '',
        //             company_bio: '',
        //             company_start_date: '',
        //             hourly_rate: '',
        //         })
        //         setSignupFormSelect({
        //             task_category: ''
        //         })
        //     })
        // })

        // fetch(`/assistant_tasks`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({task_category_id: categoriesFetch.filter(cat => cat.name === signupFormSelect.task_category).id, assistant_id: user.id})
        // })
        // .then(r => {
        //     r.ok ? r.json().then(data => {
        //         console.log(data)
        //         setUser({...user, assistant: data})
        //         history.push('/account/profile-assistant')
        //     })
        //     : r.json().then(error => {
        //         console.log(error)
        //         setError(error.error)
        //         setSignupFormData({
        //             company_name: '',
        //             company_bio: '',
        //             company_start_date: '',
        //             hourly_rate: '',
        //         })
        //         setSignupFormSelect({
        //             task_category: ''
        //         })
        //     })
        // })
      }

      console.log(error)
      

    //   function handleLoginSubmit(e) {
    //     e.preventDefault()
    //     fetch(`/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(loginFormData)
    //     })
    //     .then(r => {
    //         r.ok ? r.json().then(data => {
    //             setUser(data)
    //             console.log(isAuth)
    //             setIsAuth(true)
    //             history.push('/account')
    //         })
    //         : r.json().then(error => {
    //             console.log(error)
    //             setError(error.error.login)
    //             setLoginFormData({
    //                 email: '',
    //                 password: ''
    //             })
    //         })
    //     })
    //   }

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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    return (
        <Box sx={{ marginTop: '8vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '100%' },
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSignupSubmit}
                        >
                        <Typography variant='h2' component='h2'>
                            Create Assistant Profile
                        </Typography>
                        {error ? error.map(err => {
                            return <Alert key={err} severity="error" sx={{ width: '92%!important' }}>{err}</Alert>
                        }) : null}
                        {/* <TextField
                            id="outlined-company-name"
                            label="Company Name"
                            name="company_name"
                            value={signupFormData.company_name}
                            onChange={handleSignUpFormChange}
                            type="text"
                        /> */}
                        <TextField
                            id="outlined-company-name"
                            label="Company Name"
                            name="company_name"
                            value={signupFormData.company_name}
                            onChange={handleSignUpFormChange}
                            type="text"
                        />
                        <TextField
                            id="outlined-company-bio"
                            label="Company Bio"
                            name="company_bio"
                            value={signupFormData.company_bio}
                            onChange={handleSignUpFormChange}
                            type="textarea"
                            multiline
                            rows={4}
                        />
                        <TextField
                            id="outlined-company-start-date"
                            label="Company Start Date"
                            type="date"
                            name="company_start_date"
                            value={signupFormData.company_start_date}
                            onChange={handleSignUpFormChange}
                            // sx={{ width: 220 }}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        {/* <TextField
                            id="outlined-job-description"
                            label="Job Description"
                            name="task_description"
                            value={signupFormData.task_description}
                            onChange={handleSignUpFormChange}
                            type="textarea"
                            multiline
                            rows={4}
                        /> */}
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Task Category</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='task_category'
                                    value={signupFormSelect.task_category}
                                    label='Task Category'
                                    onChange={handleFormSelectChange}
                                    MenuProps={MenuProps}
                                    >
                                    {categoriesFetch.map((category) => (
                                        <MenuItem
                                        key={category.name}
                                        value={category.name}
                                        //   style={getStyles(category.name, personName, theme)}
                                        >
                                        {category.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        <TextField
                            id="outlined-hourly-rate"
                            label="Hourly Rate"
                            type="number"
                            name="hourly_rate"
                            value={signupFormData.hourly_rate}
                            onChange={handleSignUpFormChange}
                            // sx={{ width: 220 }}
                            // InputLabelProps={{
                            // shrink: true,
                            // }}
                        />
                        <Button variant="contained" type='submit'>Create</Button>
                    </Box>
                </Box>
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

export default ProfileAssistantCreate
