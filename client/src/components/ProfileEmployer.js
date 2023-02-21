import React, { useContext, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Rating, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Link, TextField } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import DisplayModal from './DisplayModal';
  
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
    
        // const [account, setAccount] = useState({})
        // const [employer, setEmployer] = useState([])
        const { user, setUser } = useContext(UserContext)
        const [taskPostValue, setTaskPostValue] = React.useState(0)
        const [agreementValue, setAgreementValue] = React.useState(0);
        const [open, setOpen] = React.useState(false);
        const [openEditModal, setOpenEditModal] = React.useState(false)
        const [openDisplayModal, setOpenDisplayModal] = React.useState(false)
        const [currentEditData, setCurrentEditData] = React.useState({})
        const [currentModelEdit, setCurrentModelEdit] = React.useState(null)
        const [currentPostCategories, setCurrentPostCategories] = React.useState([])
        const [editStatus, setEditStatus] = React.useState(false)
        const [editCompanyNameInput, setEditCompanyNameInput] = React.useState('')
        const [editCompanyBioInput, setEditCompanyBioInput] = React.useState('')
        const [editCompanyStartDateInput, setEditCompanyStartDateInput] = React.useState('')
        const [currentDeleteData, setCurrentDeleteData] = React.useState({})
        const [currentDeleteModel, setCurrentDeleteModel] = React.useState('')
        const [currentDisplayData, setCurrentDisplayData] = React.useState({})
        const [currentDisplayModel, setCurrentDisplayModel] = React.useState('')
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const handleOpenEdit = () => setOpenEditModal(true)
        const handleCloseEdit = () => setOpenEditModal(false)
        const handleOpenDisplay = () => setOpenDisplayModal(true)
        const handleCloseDisplay = () => setOpenDisplayModal(false)
        const [categoriesFetch, setCategoriesFetch] = React.useState([])

        useEffect(() => {
            fetch('/task_categories')
            .then(r => {
                r.ok ? r.json().then(data => setCategoriesFetch(data))
                : r.json().then(error => console.log(error))
            })
        }, [])
    
        const handleAgreementChange = (event, newValue) => {
            setAgreementValue(newValue);
        };
    
        const handleTaskPostChange = (event, newValue) => {
            setTaskPostValue(newValue);
        };

        const handleOpenDeleteModal = (data, model) => {
            setCurrentDeleteData(data)
            setCurrentDeleteModel(model)
            setOpen(true)
        }

        const handleOpenEditModal = (e) => {
            setOpenEditModal(true)
        }

        const handleEditInfo = (name, bio, startDate) => {
            console.log(name, bio, startDate)
            setEditCompanyNameInput(name)
            setEditCompanyBioInput(bio)
            setEditCompanyStartDateInput(startDate)
            setEditStatus(!editStatus)
        }

        const handleChangeEditStatus = () => {
            setEditStatus(!editStatus)
        }

        const handleEditNameChange = (e) => {
            setEditCompanyNameInput(e.target.value)
        }

        const handleEditBioChange = (e) => {
            setEditCompanyBioInput(e.target.value)
        }

        const handleEditStartDateChange = (e) => {
            setEditCompanyStartDateInput(e.target.value)
        }

        const handleSaveEdit = () => {
            fetch(`/employers/${user.employer.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    ...user.employer,
                    company_name: editCompanyNameInput,
                    company_bio: editCompanyBioInput,
                    company_start_date: editCompanyStartDateInput
                })
            })
            .then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        console.log(data)
                        setUser({...user, employer: data})
                        handleChangeEditStatus()
                    })
                }
            })
        }

        const handleOpenEditModalOnClick = (data, model) => {
            handleOpenEdit()
            setCurrentEditData(data)
            setCurrentModelEdit(model)
            setCurrentPostCategories(data.task_category)
            // console.log(data, model)
        }

        const handleOpenDisplayModalOnClick = (data, model) => {
            handleOpenDisplay()
            setCurrentDisplayData(data)
            setCurrentDisplayModel(model)
            // console.log('open')
        }
    
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
                                        Employer Profile
                                    </Typography>
                                    <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                                        <Link href="#" underline='hover'>
                                            <Typography>
                                                Home
                                            </Typography>
                                        </Link>
                                        <Link href="#job-posts" underline='hover'>
                                            <Typography>
                                                Job Posts
                                            </Typography>
                                        </Link>
                                        <Link href="#assistants" underline='hover'>
                                            <Typography>
                                                Assistants
                                            </Typography>
                                        </Link>
                                        <Link href="#agreements" underline='hover'>
                                            <Typography>
                                                Agreements
                                            </Typography>
                                        </Link>
                                        <Link href="#reviews" underline='hover'>
                                            <Typography>
                                                Reviews
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
                                        {/* <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                                <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                    Find An Assistant
                                                </Typography>
                                        </Grid> */}
                                        <Link underline='hover' href="/search/assistants" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                            <Grid>
                                                <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                    Find An Assistant
                                                </Typography>
                                            </Grid>
                                        </Link>
                                        <Link underline='hover' href="/account/profile-employer/post" xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '45%' }}>
                                            <Grid>
                                                <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                    Post A Job
                                                </Typography>
                                            </Grid>
                                        </Link>
                                    </Grid>
                                </Box>
                                <Divider variant="middle" />
                                <Grid item xs={12} sx={{ padding: '0' }}>
                                    <Typography variant='h2' id="job-posts" sx={{ padding: '40px 0 0' }}>
                                        Job Posts
                                    </Typography>
                                    {user.employer && user.employer.task_posts.length > 0 ? 
                                        <Box sx={{ width: '100%' }}>
                                            <Tabs value={taskPostValue} onChange={handleTaskPostChange} aria-label="basic tabs example">
                                                <Tab label="Active" sx={{ textTransform: "none" }} {...a11yProps(0)} />
                                                <Tab label="Previous" sx={{ textTransform: "none" }} {...a11yProps(1)} />
                                            </Tabs>
                                            <TabPanel value={taskPostValue} index={0}>
                                                <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 0px 10px 3px' }}>
                                                        {user.employer.task_posts.filter(post => post.is_active === true).length > 0 ? user.employer.task_posts.filter(post => post.is_active === true).map(post => {
                                                                return (<Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    {`${post.task_description.slice(0,50)}...`}
                                                                </Typography>
                                                                <EditOutlinedIcon onClick={() => handleOpenEditModalOnClick(post, 'task_posts')} />
                                                                <DeleteOutlineOutlinedIcon onClick={() => handleOpenDeleteModal(post, 'task_posts')} />
                                                            </Grid>)
                                                        }) : <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    No Active Job Posts
                                                                </Typography>
                                                            </Grid> }
                                                    </Grid>
                                                </Box>
                                            </TabPanel>
                                            <TabPanel value={taskPostValue} index={1}>
                                                <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 0px 10px 3px' }}>
                                                        {user.employer.task_posts.filter(post => post.is_active === false).length > 0 ? user.employer.task_posts.filter(post => post.is_active === false).map(post => {
                                                                return (<Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    {`${post.task_description.slice(0,50)}...`}
                                                                </Typography>
                                                                <Button onClick={() => handleOpenDisplayModalOnClick(post, 'Job Post')}>View</Button>
                                                            </Grid>)
                                                        }) : <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    No Previous Job Posts
                                                                </Typography>
                                                            </Grid> }
                                                        {/* {user.employer ? user.employer.task_posts.map(post => {
                                                            if (post.is_active === false) {
                                                                return (<Grid key={post.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    {`${post.task_description.slice(0,50)}...`}
                                                                </Typography>
                                                                <EditOutlinedIcon/>
                                                                <DeleteOutlineOutlinedIcon/>
                                                            </Grid>)
                                                            } else {
                                                                return null
                                                            }
                                                        }) : <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    No Previous Job Posts
                                                                </Typography>
                                                            </Grid> } */}
                                                    </Grid>
                                                </Box>
                                            </TabPanel>
                                        </Box>
                                        :   <Typography variant='p' component='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins', paddingTop: '20px' }}>
                                                You Haven't Posted Any Jobs Yet
                                            </Typography>  
                                    }
                                    {/* <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Typography variant="p" sx={{ fontWeight: '900' }}>
                                            Active
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            {user.employer ? user.employer.task_posts.map(post => {
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
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }} id="assistants">
                                        Assistants
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            {user.employer && user.employer.assistants.length > 0 ? <Grid key={user.assistant.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%', alignItems: 'center' }}>
                                                    <Avatar sx={{ marginRight: '10px' }} aria-label="assistant">
                                                                
                                                    </Avatar>
                                                    <Typography variant='p' component="p" sx={{ fontFamily: 'Poppins' }}>
                                                        {user.assistant.company_name}
                                                    </Typography>
                                                    {/* {user.assistant.task_categories.map(category => {
                                                        return (
                                                            <Button key={category.id} variant="outlined" size='small' color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', marginLeft: '10px', padding: '.4rem 1.2rem', boxShadow: 'none', fontSize: '.8rem' }}>
                                                                {category.name}
                                                            </Button>
                                                        )
                                                    })} */}
                                                    {user.assistant.task_category ? <Button key={user.assistant.task_category.id} variant="outlined" size='small' color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', marginLeft: '10px', padding: '.4rem 1.2rem', boxShadow: 'none', fontSize: '.8rem' }}>
                                                                {user.assistant.task_category.name}
                                                            </Button>
                                                            : 'Loading...'}
                                                    {/* <Button variant="outlined" color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                                        Category
                                                    </Button> */}
                                                    {/* <EditOutlinedIcon sx={{ marginLeft: 'auto' }} />
                                                    <DeleteOutlineOutlinedIcon/> */}
                                                </Grid>
                                            : <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins', paddingTop: '10px' }}>
                                            You Don't Have Any Assitants Yet
                                        </Typography>}
                                        </Grid>
                                    </Box>
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }} id="agreements">
                                        Agreements
                                    </Typography>
                                    {user.employer && user.employer.task_agreements.length > 0 ?
                                    <Box sx={{ width: '100%' }}>
                                    <Tabs value={agreementValue} sx={{ marginBottom: '15px' }} onChange={handleAgreementChange} aria-label="basic tabs example">
                                        <Tab label="Active" sx={{ textTransform: "none" }} {...a11yProps(0)} />
                                        <Tab label="Previous" sx={{ textTransform: "none" }} {...a11yProps(1)} />
                                    </Tabs>
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
                                                    <TableCell sx={{ width: '17%' }} align="right"></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {user.employer.task_agreements.filter(agreement => agreement.is_completed === false).length > 0 ? user.employer.task_agreements.filter(agreement => agreement.is_completed === false).map(agreement => {
                                                                return (<TableRow
                                                                    key={agreement.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                    <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                        {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                                    </TableCell>
                                                                    <TableCell align="left">{agreement.task_category.name}</TableCell>
                                                                    <TableCell align="left">{agreement.assistant.company_name}</TableCell>
                                                                    <TableCell align="left">{`$${agreement.hourly_rate}/hr`}</TableCell>
                                                                    <TableCell align="left">{agreement.created_at}</TableCell>
                                                                    <TableCell align="right" sx={{ paddingRight: '0'  }}><EditOutlinedIcon onClick={() => handleOpenEditModalOnClick(agreement, 'task_agreements')} sx={{ marginLeft: 'auto'}} />
                                                                    <DeleteOutlineOutlinedIcon onClick={() => handleOpenDeleteModal(agreement, 'task_agreements')} /></TableCell>
                                                                    </TableRow>)
                                                        }) : <TableRow>
                                                            <TableCell align="left" sx={{ paddingLeft: '0', border: '0' }}>No Active Agreements</TableCell>
                                                        </TableRow> }
                                                {/* {user.employer.task_agreements.map((agreement) => {
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
                                                        <TableCell align="right" sx={{ paddingRight: '0'  }}><EditOutlinedIcon sx={{ marginLeft: 'auto'}} />
                                                    <DeleteOutlineOutlinedIcon/></TableCell>
                                                        </TableRow>)} else {
                                                        return null
                                                    }
                                                    })} */}
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
                                                    <TableCell sx={{ width: '17%', paddingRight: '0' }} align="right"></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {user.employer.task_agreements.filter(agreement => agreement.is_completed === true).length > 0 ? user.employer.task_agreements.filter(agreement => agreement.is_completed === true).map(agreement => {
                                                                return (<TableRow
                                                                    key={agreement.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                    <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                        {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                                    </TableCell>
                                                                    <TableCell align="left">{agreement.task_category.name}</TableCell>
                                                                    <TableCell align="left">{agreement.assistant.company_name}</TableCell>
                                                                    <TableCell align="left">{`$${agreement.hourly_rate}/hr`}</TableCell>
                                                                    <TableCell align="left">{agreement.created_at}</TableCell>
                                                                    <TableCell align="right" sx={{ paddingRight: '0'  }}><Button onClick={() => handleOpenDisplayModalOnClick(agreement, 'Agreement')} >View</Button></TableCell>
                                                                    </TableRow>)
                                                        }) : <TableRow>
                                                            <TableCell align="left" sx={{ paddingLeft: '0', border: '0' }}>No Completed Agreements</TableCell>
                                                        </TableRow> }
                                                {/* {user.employer.task_agreements.map((agreement) => {
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
                                                        <TableCell align="right">View</TableCell>
                                                        </TableRow>)} else {
                                                        return (
                                                            <Grid key={agreement.id} container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                                <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                                    No Previously Completed Agreements
                                                                </Typography>
                                                            </Grid>
                                                        )
                                                    }
                                                    })} */}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TabPanel>
                                </Box>
                                    : <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' component='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins', paddingTop: '20px' }}>
                                                You Don't Have Any Agreements Yet
                                            </Typography>
                                        </Grid>}
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
                                    <Typography variant='h2' sx={{ paddingTop: '50px' }} id="reviews">
                                        Reviews
                                    </Typography>
                                    {user.employer && user.employer.reviews.length > 0 ? <Box sx={{ flexGrow: 1, padding: '10px 0 0' }}>
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
                                                    {user.employer ? user.employer.reviews.map((review) => (
                                                        <TableRow
                                                            key={review.id}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                            <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                {`${review.task_post.task_description.slice(0,20)}...`}
                                                            </TableCell>
                                                            <TableCell align="left">{review.assistant.company_name}</TableCell>
                                                            <TableCell align="left">{`${review.review_text.slice(0,20)}...`}</TableCell>
                                                            <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}><Rating name="half-rating-read" defaultValue={2.5} precision={0.1} value={review.rating} readOnly sx={{ marginRight: '0.5rem' }} />{review.rating}</TableCell>
                                                            <TableCell align="right" sx={{ paddingRight: '0'  }}>
                                                                <EditOutlinedIcon onClick={() => handleOpenEditModalOnClick(review, 'reviews')} />
                                                                <DeleteOutlineOutlinedIcon onClick={() => handleOpenDeleteModal(review, 'reviews')} />
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
                                    : <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                    <Typography variant='p' component='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins', paddingTop: '20px' }}>
                                        You Haven't Posted Any Reviews Yet
                                    </Typography>
                                </Grid>}
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '50px 3px 10px' }}>
                                    <Typography variant='h2' sx={{ marginRight: 'auto' }} id="info">
                                        Info
                                    </Typography>
                                    {editStatus ? <><CheckOutlinedIcon onClick={handleSaveEdit} />
                                            <CloseOutlinedIcon onClick={() => handleEditInfo(user.employer.company_name, user.employer.company_bio, user.employer.company_start_date)} /></>
                                            : <EditOutlinedIcon onClick={() => handleEditInfo(user.employer.company_name, user.employer.company_bio, user.employer.company_start_date)} />}
                                    </Grid>
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Company Name
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            {editStatus ? <TextField onChange={handleEditNameChange} value={editCompanyNameInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                            : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                            {user.employer ? user.employer.company_name : "Loading"}
                                        </Typography>
                                        </>}
                                        </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Company Bio
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ? <TextField multiline rows={4} onChange={handleEditBioChange} value={editCompanyBioInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user.employer ? `${user.employer.company_bio.slice(0,50)}...` : "Loading"}
                                                    </Typography>
                                                </>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Company Start Date
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ?
                                                // <TextField onChange={handleEditStartDateChange} value={editCompanyStartDateInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                <TextField
                                                    id="outlined-company-start-date"
                                                    type="date"
                                                    name="company_start_date"
                                                    value={editCompanyStartDateInput}
                                                    onChange={handleEditStartDateChange}
                                                    // sx={{ width: 220 }}
                                                    InputLabelProps={{
                                                    shrink: true,
                                                    }}
                                                    size='small'
                                                    sx={{ marginRight: 'auto', width: '75%' }}
                                                />
                                                : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.employer ? user.employer.company_start_date : "Loading"}
                                                </Typography>
                                                </>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {/* <Typography variant='h2' sx={{ paddingTop: '50px' }} id="info">
                                        Info
                                    </Typography>
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Company Name
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            {editStatus ? <><TextField onChange={handleEditChange} value={editInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                            <SaveOutlinedIcon onClick={handleSaveEdit} />
                                            <CloseOutlinedIcon onClick={() => handleEditInfo(user.employer.company_name)} /></>
                                            : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                            {user.employer ? user.employer.company_name : "Loading"}
                                        </Typography>
                                        <EditOutlinedIcon onClick={() => handleEditInfo(user.employer.company_name)} /></>}
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
                                                    {user.employer ? `${user.employer.company_bio.slice(0,50)}...` : "Loading"}
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
                                                    {user.employer ? user.employer.company_start_date : "Loading"}
                                                </Typography>
                                                <EditOutlinedIcon/>
                                            </Grid>
                                        </Grid>
                                    </Box> */}
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Button onClick={() => handleOpenDeleteModal(user.employer, 'employers')} variant='outlined' color='error'>
                                            Delete Employer Profile
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <DeleteModal open={open} handleClose={handleClose} user={user} setUser={setUser} currentDeleteData={currentDeleteData} currentDeleteModel={currentDeleteModel} />
                    <EditModal open={openEditModal} handleClose={handleCloseEdit} user={user} setUser={setUser} currentEditData={currentEditData} setCurrentEditData={setCurrentEditData} currentModelEdit={currentModelEdit} currentPostCategories={currentPostCategories} setCurrentPostCategories={setCurrentPostCategories} categoriesFetch={categoriesFetch} />
                    <DisplayModal open={openDisplayModal} handleClose={handleCloseDisplay} user={user} setUser={setUser} currentDisplayData={currentDisplayData} setCurrentDisplayData={setCurrentDisplayData} currentDisplayModel={currentDisplayModel} setCurrentDisplayModel={setCurrentDisplayModel} />
                </Container>
            </>
        )
    }

export default ProfileEmployer
