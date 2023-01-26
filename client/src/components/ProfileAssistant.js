import React, { useContext } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Rating, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Link } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
  
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

function ProfileAssistant() {
    
    // const [account, setAccount] = useState({})
    // const [employer, setEmployer] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [taskPostValue, setTaskPostValue] = React.useState(0)
    const [agreementValue, setAgreementValue] = React.useState(0);

    const handleAgreementChange = (event, newValue) => {
        setAgreementValue(newValue);
    };

    const handleTaskPostChange = (event, newValue) => {
        setTaskPostValue(newValue);
    };

    // useEffect(() => {
    //     fetch('/accounts/1')
    //     .then(r => r.json())
    //     .then(account => {
    //         setAccount(account)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetch('/employers/1')
    //     .then(r => r.json())
    //     .then(employer => {
    //         setEmployer(employer)
    //     })
    // }, [])
    console.log(user)

    return (
        <>
            <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                <Box>
                    <Grid xs={12}>
                        <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                            {user.name ? `Hi, ${user.name}!` : 'Hi!'}
                        </Typography>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '3.5rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Box sx={{ position: 'sticky', top: '30px' }}>
                                <Typography sx={{ marginBottom: '1.5rem', fontWeight: '900' }}>
                                    Assistant Profile
                                </Typography>
                                <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                    <Link href="#" underline='hover'>
                                        <Typography>
                                            Home
                                        </Typography>
                                    </Link>
                                    <Link href="#agreements" underline='hover'>
                                        <Typography>
                                            Agreements
                                        </Typography>
                                    </Link>
                                    <Link href="#categories" underline='hover'>
                                        <Typography>
                                            Categories
                                        </Typography>
                                    </Link>
                                    <Link href="#info" underline='hover'>
                                        <Typography>
                                            Info
                                        </Typography>
                                    </Link>
                                </Box>
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
                            <Grid item xs={12}>
                                <Typography variant='h2' sx={{ paddingTop: '50px' }} id="agreements">
                                    Agreements
                                </Typography>
                                <Box sx={{ width: '100%' }}>
                                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                                        <Tabs value={agreementValue} sx={{ marginBottom: '15px' }} onChange={handleAgreementChange} aria-label="basic tabs example">
                                        <Tab label="Active" sx={{ textTransform: "none" }} {...a11yProps(0)} />
                                        <Tab label="Previous" sx={{ textTransform: "none" }} {...a11yProps(1)} />
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
                                                {user.assistant ? user.assistant.task_agreements.map((agreement) => {
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
                                                {user.assistant ? user.assistant.task_agreements.map((agreement) => {
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
                                                {user.employer ? user.employer.task_agreements.map((agreement) => (
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
                                <Typography variant='h2' sx={{ paddingTop: '50px' }} id="categories">
                                    Categories
                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? user.assistant.task_categories.map(category => {
                                                    return <Button key={category.id} variant="outlined" size='small' color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', marginRight: '10px', padding: '.4rem 1.2rem', boxShadow: 'none', fontSize: '.8rem' }}>
                                                        {category.name}
                                                    </Button>
                                                }) : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Typography variant='h2' sx={{ paddingTop: '50px' }} id="info">
                                    Info
                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                    <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                        Company Name
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? user.assistant.company_name : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box>
                            <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                    <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                        Company Bio
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? `${user.assistant.company_bio.slice(0,50)}...` : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                    <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                        Company Start Date
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? user.assistant.company_start_date : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                    <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                        Company Hourly Rate
                                    </Typography>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? `$${user.assistant.company_hourly_rate}/hr` : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                    <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", color: "red" }}>
                                        Delete Assistant Profile
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default ProfileAssistant
