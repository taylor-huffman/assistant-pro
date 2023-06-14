import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/system';
import { Checkbox, TextField, FormControlLabel, Rating, Alert } from '@mui/material';

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

export default function EditModal({ open, handleClose, user, setUser, currentEditData, setCurrentEditData, currentModelEdit }) {


    const [checked, setChecked] = React.useState(true);
    const [hover, setHover] = React.useState(-1);
    const [error, setError] = React.useState('')

    console.log(currentEditData)

    function handleEditFormChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        let check = event.target.checked;
        setChecked(!checked)
        setError('')

        function typeConversion() {
            if (name === 'hourly_rate' || name === 'rating') return Number(value)
            if (name === 'task_description' || name === 'task_agreement_notes' || name === 'review_text') return value
            if (name === 'is_active' || name === 'is_completed') {
                return check
            }
        }
     
        setCurrentEditData({
          ...currentEditData,
          [name]: typeConversion(),
        });
    }

    const handleSaveEdit = (e) => {
        e.preventDefault()
        fetch(`/${currentModelEdit}/${currentEditData.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(currentEditData)
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                console.log(data)
                setUser({...user, employer: {...user.employer, [currentModelEdit]: [...user.employer[currentModelEdit].filter(post => post.id !== currentEditData.id), currentEditData]}})
                handleClose()
                setError('')
            }) : r.json().then(error => {
                setError(error.error)
            })
        })
    }
  
    const handleCloseOnCancel = () => {
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
                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    Edit
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSaveEdit}
                >
                {error ? error.map(err => {
                    return <Alert key={err} severity="error" sx={{ width: '92%!important', marginBottom: '10px' }}>{err}</Alert>
                }) : null}
                {Object.keys(currentEditData).map(function(keyName, keyIndex) {
                    if (keyName === 'id') return null
                    if (keyName === 'employer_id') return null
                    if (keyName === 'assistant_id') return null
                    if (keyName === 'task_agreement_id') return null
                    if (keyName === 'created_at') return null
                    if (keyName === 'updated_at') return null
                    if (typeof currentEditData[keyName] === 'object') return null
                    if (typeof currentEditData[keyName] === 'boolean') return <FormControlLabel type="checkbox" onChange={handleEditFormChange} sx={{ textTransform: 'capitalize', order: '2' }} key={keyName} name={keyName} /*value={currentEditData[keyName]}*/ control={<Checkbox checked={currentEditData[keyName]} />} label={`${keyName.split('_').join(' ')}?`} />
                    if (typeof currentEditData[keyName] === 'string') return <TextField multiline rows={4} type='text' onChange={handleEditFormChange} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }} key={keyName} name={keyName} value={currentEditData[keyName]} /*defaultValue={currentEditData[keyName]}*/ label={keyName.split('_').join(' ')}></TextField>
                    if (keyName === 'hourly_rate') return <TextField InputProps={{ inputProps: { min: 0 } }} onChange={handleEditFormChange} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '1' }} key={keyName} name={keyName} label={keyName.split('_').join(' ')} type={typeof currentEditData[keyName]} value={currentEditData[keyName]} /*defaultValue={currentEditData[keyName]}*/></TextField>
                    if (keyName === 'rating') return <Grid key={keyName} sx={{ display: 'flex' }}><Rating onChange={handleEditFormChange} onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }} name="rating" defaultValue={2.5} precision={0.1} value={currentEditData[keyName]} sx={{ marginRight: '0.5rem', paddingBottom: '0.5rem' }} /><Typography>{hover !== -1 ? hover : currentEditData[keyName]}</Typography></Grid>
                    return <Typography /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }} key={keyName}>{currentEditData[keyName]}</Typography>
                })}
                <Stack spacing={2} direction="row" sx={{ marginTop: '30px', order: '3' }}>
                    <Button variant='contained' type='submit'>
                        Save
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
