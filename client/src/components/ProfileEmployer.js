import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Rating, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
  
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 0 }}>
                {children}
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    
    
    function ProfileEmployer() {
    
        const [account, setAccount] = useState({})
        // const [employer, setEmployer] = useState([])
        const [taskPostValue, setTaskPostValue] = React.useState(0)
        const [agreementValue, setAgreementValue] = React.useState(0);
    
        const handleAgreementChange = (event, newValue) => {
            setAgreementValue(newValue);
        };
    
        const handleTaskPostChange = (event, newValue) => {
            setTaskPostValue(newValue);
        };
    
        useEffect(() => {
            fetch('/accounts/1')
            .then(r => r.json())
            .then(account => {
                setAccount(account)
            })
        }, [])
    
        // useEffect(() => {
        //     fetch('/employers/1')
        //     .then(r => r.json())
        //     .then(employer => {
        //         setEmployer(employer)
        //     })
        // }, [])
    
        // const employer = account.employer
        // console.log(employer.task_posts)
        console.log(account)
    
        return (
            <>
                <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                    <Box>
                        <Grid xs={12}>
                            <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                                {account.name ? `Hi, ${account.name}!` : 'Hi!'}
                            </Typography>
                        </Grid>
                    </Box>
                    <Box sx={{ marginTop: '3.5rem' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={2}>
                                <Typography sx={{ marginBottom: '1.5rem', fontWeight: '900' }}>
                                    Employer Profile
                                </Typography>
                                <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                    <Typography>
                                        Home
                                    </Typography>
                                    <Typography>
                                        Job Posts
                                    </Typography>
                                    <Typography>
                                        Assistants
                                    </Typography>
                                    <Typography>
                                        Agreements
                                    </Typography>
                                    <Typography>
                                        Reviews
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={10} sx={{ padding: '0.4rem 2.5rem',  }}>
                                <Typography variant='h2'>
                                    What would you like to do today?
                                </Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '30px 0' }}>
                                        <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                                <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                    Find An Assistant
                                                </Typography>
                                        </Grid>
                                        <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                                <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                    Post A Job
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider variant="middle" />
                                <Grid item xs={12} sx={{ padding: '30px 0' }}>
                                    <Typography variant='h2'>
                                        Job Posts
                                    </Typography>
                                    <Box sx={{ width: '100%' }}>
                                        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                                            <Tabs value={taskPostValue} onChange={handleTaskPostChange} aria-label="basic tabs example">
                                            <Tab label="Active" {...a11yProps(0)} />
                                            <Tab label="Previous" {...a11yProps(1)} />
                                            </Tabs>
                                        {/* </Box> */}
                                        <TabPanel value={taskPostValue} index={0}>
                                            <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                                    {account.employer ? account.employer.task_posts.map(post => {
                                                        if (post.is_active === true) {
                                                            return (<Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                            <Typography variant='p' sx={{ marginRight: 'auto' }}>
                                                                {`${post.task_description.slice(0,50)}...`}
                                                            </Typography>
                                                            <EditOutlinedIcon/>
                                                            <DeleteOutlineOutlinedIcon/>
                                                        </Grid>)
                                                        } else {
                                                            return null
                                                        }
                                                    }) : 'Loading' }
                                                </Grid>
                                            </Box>
                                        </TabPanel>
                                        <TabPanel value={taskPostValue} index={1}>
                                            <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                                    {account.employer ? account.employer.task_posts.map(post => {
                                                        if (post.is_active === false) {
                                                            return (<Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                            <Typography variant='p' sx={{ marginRight: 'auto' }}>
                                                                {`${post.task_description.slice(0,50)}...`}
                                                            </Typography>
                                                            <EditOutlinedIcon/>
                                                            <DeleteOutlineOutlinedIcon/>
                                                        </Grid>)
                                                        } else {
                                                            return null
                                                        }
                                                    }) : 'Loading' }
                                                </Grid>
                                            </Box>
                                        </TabPanel>
                                    </Box>
                                    {/* <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Typography variant="p" sx={{ fontWeight: '900' }}>
                                            Active
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            {account.employer ? account.employer.task_posts.map(post => {
                                                return <Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                    <Typography variant='p' sx={{ marginRight: 'auto' }}>
                                                        {`${post.task_description.slice(0,50)}...`}
                                                    </Typography>
                                                    <EditOutlinedIcon/>
                                                    <DeleteOutlineOutlinedIcon/>
                                                </Grid>
                                            }) : 'Loading' }
                                        </Grid>
                                    </Box> */}
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }}>
                                        Assistants
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            {account.employer ? account.employer.assistant_list.map(assistant => {
                                                return <Grid key={assistant.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%', alignItems: 'center' }}>
                                                    <Avatar sx={{ marginRight: '10px' }} aria-label="assistant">
                                                                
                                                    </Avatar>
                                                    <Typography variant='p' sx={{ marginRight: '10px' }}>
                                                        {assistant.company_name}
                                                    </Typography>
                                                    <Button variant="outlined" color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                                        Category
                                                    </Button>
                                                    <EditOutlinedIcon sx={{ marginLeft: 'auto' }} />
                                                    <DeleteOutlineOutlinedIcon/>
                                                </Grid>
                                            }) : 'Loading' }
                                        </Grid>
                                    </Box>
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }}>
                                        Agreements
                                    </Typography>
                                    <Box sx={{ width: '100%' }}>
                                        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                                            <Tabs value={agreementValue} onChange={handleAgreementChange} aria-label="basic tabs example">
                                            <Tab label="Active" {...a11yProps(0)} />
                                            <Tab label="Previous" {...a11yProps(1)} />
                                            </Tabs>
                                        {/* </Box> */}
                                        <TabPanel value={agreementValue} index={0}>
                                             <TableContainer>
                                                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ paddingLeft: '0', width: '25%' }}>Job</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Category</TableCell>
                                                        <TableCell sx={{ width: '25%' }} align="left">Assistant</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Price</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="left">Date</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="right">More</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {account.employer ? account.employer.task_agreements.map((agreement) => {
                                                        if (agreement.is_completed === false) {
                                                        return (<TableRow
                                                            key={agreement.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                            </TableCell>
                                                            <TableCell align="left">Hello</TableCell>
                                                            <TableCell align="left">{agreement.assistant.company_name}</TableCell>
                                                            <TableCell align="left">{`$${agreement.hourly_rate}`}</TableCell>
                                                            <TableCell align="left">{agreement.created_at}</TableCell>
                                                            <TableCell align="right">View Details</TableCell>
                                                            </TableRow>)} else {
                                                            return null
                                                        }
                                                        }) :
                                                        <TableRow>
                                                            <TableCell>
                                                                'Loading'
                                                            </TableCell>
                                                        </TableRow>}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </TabPanel>
                                        <TabPanel value={agreementValue} index={1}>
                                        <TableContainer>
                                                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ paddingLeft: '0', width: '25%' }}>Job</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Category</TableCell>
                                                        <TableCell sx={{ width: '25%' }} align="left">Assistant</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Price</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="left">Date</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="right">More</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {account.employer ? account.employer.task_agreements.map((agreement) => {
                                                        if (agreement.is_completed === true) {
                                                        return (<TableRow
                                                            key={agreement.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                            </TableCell>
                                                            <TableCell align="left">Hello</TableCell>
                                                            <TableCell align="left">{agreement.assistant.company_name}</TableCell>
                                                            <TableCell align="left">{`$${agreement.hourly_rate}`}</TableCell>
                                                            <TableCell align="left">{agreement.created_at}</TableCell>
                                                            <TableCell align="right">View Details</TableCell>
                                                            </TableRow>)} else {
                                                            return null
                                                        }
                                                        }) :
                                                        <TableRow>
                                                            <TableCell>
                                                                'Loading'
                                                            </TableCell>
                                                        </TableRow>}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </TabPanel>
                                    </Box>
                                    {/* <Typography variant='h2' sx={{ paddingTop: '50px' }}>
                                        Agreements
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                             <TableContainer>
                                                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ paddingLeft: '0', width: '25%' }}>Job</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Category</TableCell>
                                                        <TableCell sx={{ width: '25%' }} align="left">Assistant</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Price</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="left">Date</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="right">More</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {account.employer ? account.employer.task_agreements.map((agreement) => (
                                                        <TableRow
                                                            key={agreement.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                            </TableCell>
                                                            <TableCell align="left">Hello</TableCell>
                                                            <TableCell align="left">{agreement.assistant.company_name}</TableCell>
                                                            <TableCell align="left">{`$${agreement.hourly_rate}`}</TableCell>
                                                            <TableCell align="left">{agreement.created_at}</TableCell>
                                                            <TableCell align="right">View Details</TableCell>
                                                            </TableRow>
                                                        )) :
                                                        <TableRow>
                                                            <TableCell>
                                                            'Loading'
                                                            </TableCell>
                                                        </TableRow>}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Box> */}
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }}>
                                        Reviews
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <TableContainer>
                                                <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ paddingLeft: '0', width: '25%' }}>Job</TableCell>
                                                        <TableCell sx={{ width: '8%' }} align="left">Assistant</TableCell>
                                                        <TableCell sx={{ width: '33%' }} align="left">Review</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="left">Rating</TableCell>
                                                        <TableCell sx={{ width: '17%' }} align="right"></TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {account.employer ? account.employer.reviews.map((review) => (
                                                        <TableRow
                                                            key={review.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                Description
                                                            </TableCell>
                                                            <TableCell align="left">Assistant</TableCell>
                                                            <TableCell align="left">{`${review.review_text.slice(0,50)}...`}</TableCell>
                                                            <TableCell align="left"><Rating name="half-rating-read" defaultValue={2.5} precision={0.1} value={review.rating} readOnly sx={{ marginRight: '0.5rem' }} /></TableCell>
                                                            <TableCell align="right">
                                                                <EditOutlinedIcon/>
                                                                <DeleteOutlineOutlinedIcon/>
                                                            </TableCell>
                                                            </TableRow>
                                                        )) :
                                                        <TableRow>
                                                            <TableCell>
                                                                'Loading'
                                                            </TableCell>
                                                        </TableRow>}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
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

export default ProfileEmployer
