import React, { useContext, useState } from 'react'
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom'

function ProfileEmployerCreate() {

    const { user, setUser } = useContext(UserContext)
    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        company_name: '',
        company_bio: '',
        company_start_date: ''
    });
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

      function handleSignupSubmit(e) {
        e.preventDefault()
        fetch(`/employers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...signupFormData, account_id: user.id})
        })
        .then(r => {
            if (r.ok) {
                return r.json().then(data => {
                    setUser({...user, employer: data})
                    history.push('/account/profile-employer')
            })} else {
                return r.json().then(error => {
                    console.log(error)
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
                            Create Employer
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
                        <Button variant="contained" type='submit'>Create</Button>
                    </Box>
                </Box>
        </Box>
    )
}

export default ProfileEmployerCreate
