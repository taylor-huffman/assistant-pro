import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom'

function ProfileEmployerCreateJob() {

    useEffect(() => {
        fetch('/task_categories')
        .then(r => {
            r.ok ? r.json().then(data => setCategoriesFetch(data))
            : r.json().then(error => console.log(error))
        })
    }, [])

    const { user, setUser } = useContext(UserContext)
    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        task_description: '',
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
        
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
    }

    function handleFormSelectChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        
        setSignupFormSelect({
          [name]: value,
        });
    }


      function handleSignupSubmit(e) {
        e.preventDefault()
        fetch(`/task_posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...signupFormData, employer_id: user.employer.id, is_active: true})
        })
        .then(r => {
            if (r.ok) {
                return r.json().then(post => {
        
                    function findCatObject() {
                        let obj = categoriesFetch.filter(category => category.name === signupFormSelect.task_category)
                        return obj
                    }
        
                    fetch(`/task_post_categories`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({task_post_id: post.id, task_category_id: findCatObject()[0].id})
                    })
                    .then(r => r.json())
                    .then(taskPostCategory => {
        
                        let postWithCategories = {...post, task_category: findCatObject(), task_post_category: taskPostCategory}
        
                        setUser({...user, task_post_category: taskPostCategory})
                        setUser({...user, employer: {...user.employer, task_posts: [...user.employer.task_posts, postWithCategories]}})
                        history.push('/account/profile-employer')
                    })
                })
            } else {
                return r.json().then(error => {
                    setError(error.error)
                })
            }
        })
        
      }

    
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
                            Create Job Post
                        </Typography>
                        {error ? error.map(err => {
                            return <Alert key={err} severity="error" sx={{ width: '92%!important', marginBottom: '10px' }}>{err}</Alert>
                        }) : null}
                        <TextField
                            id="outlined-job-description"
                            label="Job Description"
                            name="task_description"
                            value={signupFormData.task_description}
                            onChange={handleSignUpFormChange}
                            type="textarea"
                            multiline
                            rows={4}
                        />
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
                            InputProps={{ inputProps: { min: 0 } }}
                            // sx={{ width: 220 }}
                            // InputLabelProps={{
                            // shrink: true,
                            // }}
                        />
                        <Button variant="contained" type='submit'>Create</Button>
                    </Box>
                </Box>
        </Box>
    )
}

export default ProfileEmployerCreateJob