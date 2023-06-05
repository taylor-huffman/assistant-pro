import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { FormControl, FormControlLabel, Select, InputLabel, MenuItem, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useHistory } from 'react-router-dom';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

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

    console.log(assistant, user)

    const history = useHistory()
    const [signupFormData, setSignupFormData] = useState({
        task_agreement_notes: ''
    });
    const [selectedTask, setSelectedTask] = React.useState('');

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
        // console.log({
        //     assistant_id: assistant.id,
        //     employer_id: user.employer.id,
        //     hourly_rate: assistant.company_hourly_rate,
        //     task_agreement_notes: signupFormData.task_agreement_notes,
        //     is_completed: false,
        //     task_post_id: selectedTask
        // })
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
        .then(r => r.json())
        .then(data => {
            setUser({...user, employer: {...user.employer, task_agreements: [...user.employer.task_agreements, data], assistants: [...user.employer.assistants, data.assistant]}})
            history.push('/account/profile-employer')
        })
      }

      const handleTaskSelectChange = (event) => {
        setSelectedTask(event.target.value)
        // setErrors([])
    };

    // const history = useHistory()

    // const handleDeleteEmployerProfile = () => {
    //     fetch(`/${currentDeleteModel}/${currentDeleteData.id}`, {
    //         method: "DELETE",
    //     })
    //     .then(r => {
    //         if (r.ok) {
    //             if (currentDeleteModel === 'employers') {
    //                 setUser({...user, employer: null})
    //                 handleClose()
    //                 history.push('/account')
    //             }
    //             if (currentDeleteModel === 'task_posts') {
    //                 setUser({...user, employer: {...user.employer, task_posts: [...user.employer.task_posts.filter(post => post.id !== currentDeleteData.id)]}})
    //                 handleClose()
    //             }
    //             if (currentDeleteModel === 'task_agreements') {
    //                 setUser({...user, employer: {...user.employer, task_agreements: [...user.employer.task_agreements.filter(agreement => agreement.id !== currentDeleteData.id)]}})
    //                 handleClose()
    //             }
    //             if (currentDeleteModel === 'reviews') {
    //                 setUser({...user, employer: {...user.employer, reviews: [...user.employer.reviews.filter(review => review.id !== currentDeleteData.id)], task_agreements: user.employer.task_agreements.map(agreement => {
    //                     if (agreement.review && agreement.review.id === currentDeleteData.id) {
    //                         console.log({...agreement, review: null})
    //                         return {...agreement, review: null}
    //                     } else return agreement
    //                 })}})
    //                 handleClose()
    //             }
    //         } else {
    //             return r.json().then(data => console.log(data))
    //         }
    //     })
    // }
  
    // const handleCloseOnCancel = () => {
    //     handleClose()
    // }

    // const modelNameSwitch = () => {
    //     if (currentDeleteModel === 'task_posts') return 'Job Post'
    //     if (currentDeleteModel === 'task_agreements') return 'Agreement'
    //     if (currentDeleteModel === 'reviews') return 'Review'
    // }

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
                {/* <Typography id="transition-modal-title" variant="h6" component="h2" color='error' sx={{ display: 'flex', alignItems: 'center' }}>
                    <WarningAmberOutlinedIcon sx={{ marginRight: '5px' }} /> Warning!
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {`Are you sure you want to delete your ${modelNameSwitch()}? This action is permanent and irreversible.`}
                </Typography>
                <Stack spacing={2} direction="row" sx={{ marginTop: '30px' }}>
                    <Button variant='contained' color='error' onClick={handleDeleteEmployerProfile}>
                        {`Delete ${modelNameSwitch()}`}
                    </Button>
                    <Button variant='text' sx={{ color: 'black', '&:hover': { backgroundColor: '#eeeeee' } }} onClick={handleCloseOnCancel}>
                        Cancel
                    </Button>
                </Stack> */}
                <Typography sx={{ fontWeight: 'bold' }}>{assistant.company_name}</Typography>
                <Typography>{assistant.task_category ? assistant.task_category.name : null}</Typography>
                <Typography>{`$${assistant.company_hourly_rate}/hr`}<Rating name="average_rating" size='small' precision={0.1} value={assistant.average_rating} readOnly sx={{ marginLeft: '10px', marginRight: '10px' }} />{assistant.average_rating}</Typography>
                <Typography>{assistant.company_bio}</Typography>
                
                    {user.employer.task_posts ? <FormControl size='small' fullWidth sx={{ margin: '8px 0!important', textAlign: 'left' }}>
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
                    <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                    </Box>
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {user.employer.task_posts ? <Stack spacing={2} direction="row" sx={{ marginTop: '30px' }}>
                    <Button variant='contained' sx={{ borderRadius: '30px' }} onClick={handleSignupSubmit}>
                        Hire Assistant
                    </Button>
                    <Button variant='text' sx={{ color: 'black', '&:hover': { backgroundColor: '#eeeeee' } }} onClick={handleClose}>
                        Cancel
                    </Button>
                </Stack> : <><Typography sx={{ marginTop: '30px', fontStyle: 'italic', fontWeight: '700' }}>You must post a job before you can hire an assistant. Click below to post a job.</Typography><Button href="/account/profile-employer/post" variant='contained' sx={{ borderRadius: '30px', marginTop: '30px' }}>
                        Post A Job
                    </Button></>}
                </Grid>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}