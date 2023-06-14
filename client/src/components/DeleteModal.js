import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

export default function DeleteModal({ open, handleClose, user, setUser, currentDeleteData, currentDeleteModel }) {

    const history = useHistory()

    const handleDeleteEmployerProfile = () => {
        fetch(`/${currentDeleteModel}/${currentDeleteData.id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(currentDeleteData)
        })
        .then(r => {
            if (r.ok) {
                if (currentDeleteModel === 'employers') {
                    setUser({...user, employer: null})
                    handleClose()
                    history.push('/account')
                }
                if (currentDeleteModel === 'assistants') {
                    setUser({...user, assistant: null})
                    handleClose()
                    history.push('/account')
                }
                if (currentDeleteModel === 'task_posts') {
                    setUser({...user, employer: {...user.employer, task_posts: [...user.employer.task_posts.filter(post => post.id !== currentDeleteData.id)]}})
                    handleClose()
                }
                if (currentDeleteModel === 'task_agreements') {
                    setUser({...user, employer: {...user.employer, task_agreements: [...user.employer.task_agreements.filter(agreement => agreement.id !== currentDeleteData.id)]}})
                    handleClose()
                }
                if (currentDeleteModel === 'reviews') {
                    setUser({...user, employer: {...user.employer, reviews: [...user.employer.reviews.filter(review => review.id !== currentDeleteData.id)], task_agreements: user.employer.task_agreements.map(agreement => {
                        if (agreement.review && agreement.review.id === currentDeleteData.id) {
                            console.log({...agreement, review: null})
                            return {...agreement, review: null}
                        } else return agreement
                    })}})
                    handleClose()
                }
                if (currentDeleteModel === 'accounts') {
                    fetch('/logout', {
                        method: 'DELETE'
                    }).then(r => {
                        if (r.ok) {
                            setUser('')
                            history.push('/')
                        } else {
                            r.json().then(data => console.log(data))
                        }
                    })
                }
            } else {
                return r.json().then(data => console.log(data))
            }
        })
    }
  
    const handleCloseOnCancel = () => {
        handleClose()
    }

    const modelNameSwitch = () => {
        if (currentDeleteModel === 'employers') return 'employer profile'
        if (currentDeleteModel === 'assistants') return 'assistant profile'
        if (currentDeleteModel === 'task_posts') return 'job post'
        if (currentDeleteModel === 'task_agreements') return 'agreement'
        if (currentDeleteModel === 'reviews') return 'review'
        if (currentDeleteModel === 'accounts') return 'account'
    }

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
                <Typography id="transition-modal-title" variant="h6" component="h2" color='error' sx={{ display: 'flex', alignItems: 'center' }}>
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
                </Stack>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}