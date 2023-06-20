import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { FormControl, Select, InputLabel, MenuItem, TextField, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import { useHistory } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



export default function ChooseAssistantModal({ open, handleClose, user, setUser, currentDisplayData, setCurrentDisplayData, currentDisplayModel, setCurrentDisplayModel, assistant }) {

    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        task_agreement_notes: ''
    });
    const [selectedTask, setSelectedTask] = React.useState('');
    const [error, setError] = React.useState('')

    const taskPostsWithoutAgreements = () => {
        const taskPosts = user.employer.task_posts
        return taskPosts.filter(post => post.is_active === true)
    }

    function handleSignUpFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        // setError('')
        
        setSignupFormData({
          ...signupFormData,
          [name]: value,
        });
    }

    function handleSignupSubmit(e) {
        e.preventDefault()
        fetch(`/task_agreements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                assistant_id: assistant.id,
                employer_id: user.employer.id,
                hourly_rate: assistant.company_hourly_rate,
                task_agreement_notes: signupFormData.task_agreement_notes,
                is_completed: false,
                task_post_id: selectedTask
            })
        })
        .then(r => {
            if (r.ok) {
                return r.json().then(data => {
                    fetch(`/task_posts/${selectedTask}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            is_active: false
                        })
                    })
                    .then(r => r.json())
                    .then(post => {
                        setUser({...user, employer: {...user.employer, task_agreements: [...user.employer.task_agreements, data], assistants: [...user.employer.assistants, data.assistant], task_posts: [...user.employer.task_posts.map(p => {
                            if (post.id === p.id) {
                                return post
                            } else {
                                return p
                            }
                        })]}})
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

      const handleTaskSelectChange = (event) => {
        setSelectedTask(event.target.value)
        // setErrors([])
    };

    return (
        <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
            <Box sx={style}>
                <Typography sx={{ fontWeight: 'bold' }}>{assistant.company_name}</Typography>
                <Typography>{assistant.task_category ? assistant.task_category.name : null}</Typography>
                <Typography>{`$${assistant.company_hourly_rate}/hr`}<Rating name="average_rating" size='small' precision={0.1} value={assistant.average_rating} readOnly sx={{ marginLeft: '10px', marginRight: '10px' }} />{assistant.average_rating}</Typography>
                <Typography>{assistant.company_bio}</Typography>
                {error ? error.map(err => {
                    return <Alert key={err} severity="error" sx={{ width: '92%!important', marginBottom: '10px' }}>{err}</Alert>
                }) : null}
                    {user.employer && user.employer.task_posts.filter(post => post.is_active === true).length > 0 ? <FormControl size='small' fullWidth sx={{ margin: '8px 0!important', textAlign: 'left' }}>
                        <InputLabel id="demo-simple-select-label">Select Your Job</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedTask}
                            label="Select Your Job"
                            onChange={handleTaskSelectChange}
                            // MenuProps={MenuProps}
                        >
                            {taskPostsWithoutAgreements().map(task => {
                                return <MenuItem sx={{ fontSize: '12px' }} key={task.id} value={task.id}>{task.task_description}</MenuItem>
                            })}
                        </Select>
                    </FormControl> : null}
                    {user.employer && user.employer.task_posts.filter(post => post.is_active === true).length > 0 ? <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <TextField
                            id="outlined-notes"
                            label="Notes"
                            name="task_agreement_notes"
                            value={signupFormData.company_bio}
                            onChange={handleSignUpFormChange}
                            type="textarea"
                            multiline
                            rows={4}
                        />
                    </Box> : null}
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {user.employer && user.employer.task_posts.filter(post => post.is_active === true).length > 0 ? <Stack spacing={2} direction="row" sx={{ marginTop: '30px' }}>
                    <Button variant='contained' sx={{ borderRadius: '30px' }} onClick={handleSignupSubmit}>
                        Hire Assistant
                    </Button>
                    <Button variant='text' sx={{ color: 'black', '&:hover': { backgroundColor: '#eeeeee' } }} onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack> : <><Typography sx={{ marginTop: '30px', fontStyle: 'italic', fontWeight: '700' }}>{user.employer ? 'You must post a job before you can hire an assistant.' : 'You must create an employer profile and post a job before you can hire an assistant.'}</Typography>{user.employer ? <Button href="/account/profile-employer/post" variant='contained' sx={{ borderRadius: '30px', marginTop: '30px' }}>
                        Post A Job
                    </Button> : <Button href="/account/profile-employer/create" variant='contained' sx={{ borderRadius: '30px', marginTop: '30px' }}>
                        Create Employer Profile
                    </Button>}</>}
                </Grid>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}