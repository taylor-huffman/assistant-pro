import React, { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Box, Divider, Link, TextField, Button, Alert } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { UserContext } from '../context/user';
import DeleteModal from './DeleteModal';

function Account() {
  
    const { user, setUser } = useContext(UserContext)
    const [editStatus, setEditStatus] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [currentDeleteData, setCurrentDeleteData] = React.useState({})
    const [currentDeleteModel, setCurrentDeleteModel] = React.useState('')
    const [error, setError] = useState('')

    const handleChangeEditStatus = () => {
        setEditStatus(!editStatus)
    }

    const handleEditInfo = (name, email, address, phone) => {
        setName(name)
        setEmail(email)
        setAddress(address)
        setPhone(phone)
        setEditStatus(!editStatus)
        setError('')
    }

    const handleEditNameChange = (e) => {
        setName(e.target.value)
        setError('')
    }

    const handleEditEmailChange = (e) => {
        setEmail(e.target.value)
        setError('')
    }

    const handleEditAddressChange = (e) => {
        setAddress(e.target.value)
        setError('')
    }

    const handleEditPhoneChange = (e) => {
        setPhone(e.target.value)
        setError('')
    }

    const handleOpenDeleteModal = (data, model) => {
        setCurrentDeleteData(data)
        setCurrentDeleteModel(model)
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const handleSaveEdit = () => {
        fetch(`/accounts/${user.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                address: address,
                phone: phone
            })
        })
        .then(r => {
            r.ok ? r.json().then(data => {
                setUser(data)
                handleChangeEditStatus()
                setError('')
            })
            : r.json().then(error => {
                console.log(error)
                setError(error.error)
            })
        })
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                <Box>
                    <Grid xs={12}>
                        <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                            {`Hi, ${user.name}!`}
                        </Typography>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '3.5rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                        <Box sx={{ position: 'sticky', top: '30px' }}>
                            <Typography sx={{ marginBottom: '1.5rem', fontWeight: '900' }}>
                                Account
                            </Typography>
                            <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                    <Link href="#" underline='hover'>
                                        <Typography>
                                            Home
                                        </Typography>
                                    </Link>
                                    <Link href="#personal-info" underline='hover'>
                                        <Typography>
                                            Personal Info
                                        </Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={10} sx={{ padding: '0.4rem 2.5rem',  }}>
                            <Typography variant='h2'>
                                Profiles
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '30px 0' }}>
                                    {user.assistant ? <Link underline='hover' href="/account/profile-assistant" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                        <Grid>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Manage Assistant Profile
                                            </Typography>
                                        </Grid>
                                    </Link>
                                    : <Link underline='hover' href="/account/profile-assistant/create" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                    <Grid>
                                        <Typography variant="p" sx={{ fontWeight: '900' }}>
                                            Create Assistant Profile
                                        </Typography>
                                    </Grid>
                                </Link>}
                                    {user.employer ? <Link underline='hover' href="/account/profile-employer" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                        <Grid>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Manage Employer Profile
                                            </Typography>
                                        </Grid>
                                    </Link>
                                    : <Link underline='hover' href="/account/profile-employer/create" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                    <Grid>
                                        <Typography variant="p" sx={{ fontWeight: '900' }}>
                                            Create Employer Profile
                                        </Typography>
                                    </Grid>
                                </Link>}
                                </Grid>
                            </Box>
                            <Divider variant="middle" />
                            <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '50px 3px 10px' }}>
                                    <Typography variant='h2' sx={{ marginRight: 'auto' }} id="info">
                                        Personal Info
                                    </Typography>
                                    {editStatus ? <><CheckOutlinedIcon onClick={handleSaveEdit} />
                                            <CloseOutlinedIcon onClick={() => handleEditInfo(user.name, user.email, user.address, user.phone)} /></>
                                            : <EditOutlinedIcon onClick={() => handleEditInfo(user.name, user.email, user.address, user.phone)} />}
                                    </Grid>
                                    {error ? error.map(err => {
                                        return <Alert key={err} severity="error" sx={{ width: '92%!important' }}>{err}</Alert>
                                    }) : null}
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Name
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            {editStatus ? <TextField onChange={handleEditNameChange} value={name} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                            : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                            {user ? user.name : "Loading"}
                                        </Typography>
                                        </>}
                                        </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Email
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ? <TextField type='email' onChange={handleEditEmailChange} value={email} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user ? `${user.email}` : "Loading"}
                                                    </Typography>
                                                </>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Address
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ?
                                                // <TextField onChange={handleEditAddressChange} value={address} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                <TextField
                                                    id="outlined-address"
                                                    type="address"
                                                    name="address"
                                                    value={address}
                                                    onChange={handleEditAddressChange}
                                                    // sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    size='small'
                                                    sx={{ marginRight: 'auto', width: '75%' }}
                                                />
                                                : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user ? user.address : "Loading"}
                                                </Typography>
                                                </>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Phone
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ?
                                                    // <TextField onChange={handleEditAddressChange} value={address} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    <TextField
                                                        id="outlined-phone"
                                                        type="number"
                                                        name="phone"
                                                        value={phone}
                                                        onChange={handleEditPhoneChange}
                                                        // sx={{ width: 220 }}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        size='small'
                                                        sx={{ marginRight: 'auto', width: '75%' }}
                                                    />
                                                : <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user ? `${user.phone}` : "Loading"}
                                                </Typography>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Button onClick={() => handleOpenDeleteModal(user, 'accounts')} variant='outlined' color='error'>
                                            Delete Account
                                        </Button>
                                    </Box>
                        </Grid>
                    </Grid>
                </Box>
                <DeleteModal open={open} handleClose={handleClose} user={user} setUser={setUser} currentDeleteData={currentDeleteData} currentDeleteModel={currentDeleteModel} />
            </Container>
        </>
    )
}

export default Account
