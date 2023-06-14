import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import { TextField, Rating, Alert } from '@mui/material';

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

export default function ReviewModal({ open, handleClose, user, setUser, currentAgreementData }) {

    console.log(currentAgreementData)

    const [checked, setChecked] = React.useState(true);
    const [hover, setHover] = React.useState(-1);
    const [rating, setRating] = React.useState(2.5)
    const [reviewText, setReviewText] = React.useState('')
    const [error, setError] = useState('')

    console.log(user)

    function handleEditFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setChecked(!checked)

        function typeConversion() {
            if (name === 'rating') return Number(value)
        }
     
        setRating(typeConversion());
    }

    function handleReviewTextOnChange(event) {
        setReviewText(event.target.value)
        setError('')
    }

    const handleSubmitReview = (e) => {
        e.preventDefault()
        fetch(`/reviews`, {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                rating: rating,
                task_agreement_id: currentAgreementData.id,
                review_text: reviewText,
                employer_id: currentAgreementData.employer.id,
                assistant_id: currentAgreementData.assistant.id
            })
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                console.log(data)
                setUser({...user, employer: {...user.employer, reviews: [...user.employer.reviews, data], task_agreements: [...user.employer.task_agreements.map(a => {
                    if (a.id === currentAgreementData.id) {
                        console.log({...a, review: data})
                        let updatedAgreement = {...a, review: data}
                        return updatedAgreement
                    } else {
                        return a
                    }
                })]}})
                handleCloseModal()
            }) : r.json().then(error => {
                setError(error.error)
            })
        })
    }
  
    const handleCloseOnCancel = () => {
        setRating(2.5)
        setReviewText('')
        handleClose()
        setError('')
    }

    const handleCloseModal = () => {
        setRating(2.5)
        setReviewText('')
        handleClose()
        setError('')
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
                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', marginBottom: '0' }}>
                    Leave A Review
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmitReview}
                >
                {error ? error.map(err => {
                            return <Alert key={err} severity="error" sx={{ width: '92%!important' }}>{err}</Alert>
                        }) : null}
                <Grid sx={{ display: 'flex' }}><Rating onChange={handleEditFormChange} onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }} name="rating" defaultValue={2.5} precision={0.1} value={rating} sx={{ marginRight: '0.5rem', paddingBottom: '0.5rem' }} /><Typography>{hover !== -1 ? hover : rating}</Typography></Grid>
                <TextField
                    id="outlined-review"
                    label="Review"
                    name="review"
                    value={reviewText}
                    onChange={handleReviewTextOnChange}
                    type="textarea"
                    multiline
                    rows={4}
                    sx={{ marginBottom: '20px!important' }}
                />
                <Stack spacing={2} direction="row" sx={{ marginTop: '30px', order: '3' }}>
                    <Button variant='contained' type='submit'>
                        Submit
                    </Button>
                    <Button variant='text' onClick={handleCloseOnCancel}>
                        Cancel
                    </Button>
                </Stack>
                </Box>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}
