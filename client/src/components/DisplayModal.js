import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import { Stack } from '@mui/system';
// import { useHistory } from 'react-router-dom';
// import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

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

export default function DisplayModal({ open, handleClose, currentDisplayData, currentDisplayModel }) {

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
                <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                    {Object.keys(currentDisplayData).map(function(keyName, keyIndex) {
                        if (keyName === 'id') return <Typography key={keyName} id="transition-modal-title" variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize', marginBottom: '10px', order: '0' }}>
                            {`${currentDisplayModel} ${keyName.split('_').join(' ')}: ${currentDisplayData[keyName]}`}
                        </Typography>
                        if (keyName === 'task_category') return <Typography key={keyName} sx={{ display: 'flex', alignItems: 'center', textTransform: 'capitalize', marginBottom: '10px', order: '0' }}>
                        {`${keyName.split('_').join(' ').toUpperCase()}: ${currentDisplayData[keyName].name}`}
                    </Typography> 
                        if (keyName === 'employer_id') return null
                        if (keyName === 'assistant_id') return null
                        if (keyName === 'task_agreement_id') return null
                        if (keyName === 'created_at') return null
                        if (keyName === 'updated_at') return null
                        // if (keyName === 'task_category') {
                        //     return (
                        //         <Box sx={{ minWidth: 120 }} key={keyName}>
                        //             <FormControl fullWidth>
                        //                 <InputLabel id="demo-simple-select-label">Task Category</InputLabel>
                        //                 <Select
                        //                 labelId="demo-simple-select-label"
                        //                 id="demo-simple-select"
                        //                 name={keyName}
                        //                 value={currentDisplayData[keyName].name}
                        //                 label={`${keyName.split('_').join(' ')}?`}
                        //                 onChange={handleEditFormChange}
                        //                 >
                        //                 {categoriesFetch.map((category) => (
                        //                     <MenuItem
                        //                     key={category.name}
                        //                     value={category.name}
                        //                     //   style={getStyles(category.name, personName, theme)}
                        //                     >
                        //                     {category.name}
                        //                     </MenuItem>
                        //                 ))}
                        //                 </Select>
                        //             </FormControl>
                        //         </Box>
                        //     // <TaskCategoriesSelect key={keyName} currentSelectedCategories={currentDisplayData[keyName]} currentDisplayData={currentDisplayData} setCurrentEditData={setCurrentEditData} currentPostCategories={currentPostCategories} setCurrentPostCategories={setCurrentPostCategories} />
                        // )}
                        if ((typeof currentDisplayData[keyName] === 'object' && keyName === 'employer') || (typeof currentDisplayData[keyName] === 'object' && keyName === 'assistant') ) return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '0' }}>{`${keyName.split('_').join(' ').toUpperCase()}: ${currentDisplayData[keyName].company_name}`}</Typography>
                        if (typeof currentDisplayData[keyName] === 'object' && keyName === 'task_post') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '2' }}>{`${'Task Description'.toUpperCase()}: ${currentDisplayData[keyName].task_description}`}</Typography>
                        if (typeof currentDisplayData[keyName] === 'object' && currentDisplayData[keyName] && keyName === 'review') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '3' }}>{`${keyName.split('_').join(' ').toUpperCase()}: ${currentDisplayData[keyName].review_text}`}</Typography>
                        if (typeof currentDisplayData[keyName] === 'object') return null
                        if (typeof currentDisplayData[keyName] === 'boolean') return null
                        if (keyName === 'task_description') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '2' }}>{`${keyName.split('_').join(' ').toUpperCase()}: ${currentDisplayData[keyName]}`}</Typography>
                        if (keyName === 'task_agreement_notes') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '3' }}>{`${keyName.split('_').join(' ').toUpperCase()}: ${currentDisplayData[keyName]}`}</Typography>
                        // if (keyName === 'task_agreement_notes') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }}>{`${keyName.split('_').join(' ')}: ${currentDisplayData[keyName]}`}</Typography>
                        if (keyName === 'hourly_rate') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '1' }}>{`${keyName.split('_').join(' ').toUpperCase()}: $${currentDisplayData[keyName]}/hr`}</Typography>
                        // if (keyName === 'rating') return <Typography key={keyName} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }}>{`${keyName.split('_').join(' ')}: ${currentDisplayData[keyName]}`}</Typography>
                        // if (keyName === 'hourly_rate') return <TextField onChange={handleEditFormChange} /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize', order: '1' }} key={keyName} name={keyName} label={keyName.split('_').join(' ')} type={typeof currentDisplayData[keyName]} value={currentDisplayData[keyName]} /*defaultValue={currentDisplayData[keyName]}*/></TextField>
                        // if (keyName === 'rating') return <Grid key={keyName} sx={{ display: 'flex' }}><Rating onChange={handleEditFormChange} onChangeActive={(event, newHover) => {
                        //     setHover(newHover);
                        //   }} name="rating" defaultValue={2.5} precision={0.1} value={currentDisplayData[keyName]} sx={{ marginRight: '0.5rem', paddingBottom: '0.5rem' }} /><Typography>{hover !== -1 ? hover : currentDisplayData[keyName]}</Typography></Grid>
                        return <Typography /*size='small'*/ sx={{ marginBottom: '15px', width: '100%', textTransform: 'capitalize' }} key={keyName}>{currentDisplayData[keyName]}</Typography>
                    })}
                </Grid>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}