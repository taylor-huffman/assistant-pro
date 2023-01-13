import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Box, Divider } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function Account() {
  
  const [account, setAccount] = useState([])

    useEffect(() => {
        fetch('/accounts/1')
        .then(r => r.json())
        .then(account => {
            setAccount(account)
        })
    }, [])

    console.log(account)

    return (
        <>
            <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                <Box>
                    <Grid xs={12}>
                        <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                            {`Hi, ${account.name}!`}
                        </Typography>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '3.5rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Typography sx={{ marginBottom: '1.5rem', fontWeight: '900' }}>
                                Account
                            </Typography>
                            <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                <Typography>
                                    Home
                                </Typography>
                                <Typography>
                                    Personal Info
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10} sx={{ padding: '0.4rem 2.5rem',  }}>
                            <Typography variant='h2'>
                                Profiles
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '30px 0' }}>
                                    <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Manage Assistant Profile
                                            </Typography>
                                    </Grid>
                                    <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Create Employer Profile
                                            </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider variant="middle" />
                            <Grid item xs={12} sx={{ padding: '30px 0' }}>
                                <Typography variant='h2'>
                                    Personal Info
                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                    <Typography variant="p" sx={{ fontWeight: '900' }}>
                                        Address
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Typography variant="p">
                                            {account.address}
                                        </Typography>
                                        <EditOutlinedIcon/>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, padding: '0' }}>
                                    <Typography variant="p" sx={{ fontWeight: '900' }}>
                                        Email
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Typography variant="p">
                                            {account.email}
                                        </Typography>
                                        <EditOutlinedIcon/>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, padding: '0 0 30px' }}>
                                    <Typography variant="p" sx={{ fontWeight: '900' }}>
                                        Phone
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Typography variant="p">
                                            {account.phone}
                                        </Typography>
                                        <EditOutlinedIcon/>
                                    </Grid>
                                </Box>
                                <Divider variant="middle" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Account
