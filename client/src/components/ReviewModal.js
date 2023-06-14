import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
// import { useHistory } from 'react-router-dom';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Checkbox, TextField, FormControlLabel, Rating, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import TaskCategoriesSelect from './TaskCategoriesSelect';

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

export default function ReviewModal({ open, handleClose, user, setUser, currentAgreementData, setCurrentAgreementData }) {

    console.log(currentAgreementData)

    // useEffect(() => {
    //     fetch('/task_categories')
    //     .then(r => {
    //         r.ok ? r.json().then(data => setCategoriesFetch(data))
    //         : r.json().then(error => console.log(error))
    //     })
    // }, [])

    // useEffect(() => {
    //     // fetch('/task_post_categories', {
    //     //     method: "PATCH",
    //     //     headers: {
    //     //         "Content-type": "application/json"
    //     //     },
    //     //     body: JSON.stringify(currentPostCategories)
    //     // })
    //     console.log(currentPostCategories)
    // }, [currentAgreementData])
    

    // const history = useHistory()

    // const initialData = function() {
    //     let array = {}
    //     for (const keyName in currentAgreementData) {
    //         if (keyName === 'id') array[keyName] = currentAgreementData[keyName]
    //         // if (keyName === 'created_at') return null
    //         // if (keyName === 'updated_at') return null
    //         if (typeof currentAgreementData[keyName] === 'object') return null
    //         if (typeof currentAgreementData[keyName] === 'boolean') array[keyName] = currentAgreementData[keyName]
    //         if (typeof currentAgreementData[keyName] === 'string') array[keyName] = currentAgreementData[keyName]
    //         if (typeof currentAgreementData[keyName] === 'number') array[keyName] = currentAgreementData[keyName]
    //         // return <Typography size='small' sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }} key={keyName}>{currentAgreementData[keyName]}</Typography>
    //     }
    //     return array
    // }

    // const [editFormData, setEditFormData] = useState(initialData)

    const [checked, setChecked] = React.useState(true);
    const [hover, setHover] = React.useState(-1);
    const [rating, setRating] = React.useState(2.5)
    const [reviewText, setReviewText] = React.useState('')
    const [taskPostCategoryId, setTaskPostCategoryId] = React.useState()
    // const [categoriesFetch, setCategoriesFetch] = React.useState(null)
    const [error, setError] = useState('')

    console.log(user)

    // const handleCheckboxChange = (event) => {
    //     setChecked(event.target.checked);
    // };

    // console.log(checked)

    function handleEditFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        let check = event.target.checked;
        setChecked(!checked)

        function typeConversion() {
            if (name === 'rating') return Number(value)
            // if (name === 'task_category') {
            //     let catFind = categoriesFetch.find(category => {
            //         if (value === category.name) return category
            //     })
            //     // console.log(catFind)
            //     setCurrentAgreementData({...currentAgreementData, task_post_category: {...currentAgreementData.task_post_category, task_category_id: catFind.id}})
            //     // setCurrentAgreementData({...currentAgreementData, task_categories: array})
            //     return catFind
            // }
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
        // console.log('model', currentModelEdit)
        // console.log('data', currentAgreementData)
        // console.log({...user, employer: {...user.employer, [currentModelEdit]: [...user.employer[currentModelEdit].filter(post => post.id !== currentAgreementData.id), currentAgreementData]}})
    }
  
    const handleCloseOnCancel = () => {
        setRating(2.5)
        setReviewText('')
        handleClose()
        // setChecked(false)
        setError('')
    }

    const handleCloseModal = () => {
        setRating(2.5)
        setReviewText('')
        handleClose()
        setError('')
    }

    // const displayData = () => {
    //     for (const [key, value] of Object.entries(currentAgreementData)) {
    //         return <Typography>{`${key}: ${value}`}</Typography>
    //     }
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
