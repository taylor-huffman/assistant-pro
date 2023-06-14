import React, { useContext, useState, useEffect } from 'react'
import { Button, TextField, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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

    const { user, setUser } = useContext(UserContext)
    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        company_name: '',
        company_bio: '',
        company_start_date: '',
        company_hourly_rate: '',
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

        fetch(`/assistants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...signupFormData, account_id: user.id})
        })
        .then(r => {
            r.ok ? r.json().then(assistantData => {
                fetch(`/assistant_tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({task_category_id: categoriesFetch.filter(cat => cat.name === signupFormSelect.task_category)[0].id, assistant_id: assistantData.id})
                })
                .then(r => {
                    r.ok ? r.json().then(assistantTaskData => {
                        console.log(assistantTaskData)
                        setUser({...user, assistant: {...assistantData, task_category: assistantTaskData.task_category, assistant_task: {assistant_id: assistantTaskData.assistant_id, task_category_id: assistantTaskData.task_category_id, id: assistantTaskData.id}}})
                        history.push('/account/profile-assistant')
                    })
                    : r.json().then(error => {
                        console.log(error)
                        setError(error.error)
                        setSignupFormData({
                            company_name: '',
                            company_bio: '',
                            company_start_date: '',
                            company_hourly_rate: '',
                        })
                        setSignupFormSelect({
                            task_category: ''
                        })
                    })
                })
            })
            : r.json().then(error => {
                console.log(error)
                setError(error.error)
                setSignupFormData({
                    company_name: '',
                    company_bio: '',
                    company_start_date: '',
                    company_hourly_rate: '',
                })
                setSignupFormSelect({
                    task_category: ''
                })
            })
        })
      }

      console.log(error)

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
                            name="company_hourly_rate"
                            value={signupFormData.company_hourly_rate}
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

export default ProfileAssistantCreate
