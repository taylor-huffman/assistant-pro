import React, { useContext, useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Rating, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Link, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import DisplayModal from './DisplayModal';
import DeleteModal from './DeleteModal'

  
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
    // const [assistant, setAssistant] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [taskPostValue, setTaskPostValue] = React.useState(0)
    const [agreementValue, setAgreementValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [editStatus, setEditStatus] = React.useState(false)
    const [editCompanyNameInput, setEditCompanyNameInput] = React.useState('')
    const [editCompanyBioInput, setEditCompanyBioInput] = React.useState('')
    const [editCompanyStartDateInput, setEditCompanyStartDateInput] = React.useState('')
    const [editCompanyHourlyRateInput, setEditCompanyHourlyRateInput] = React.useState('')
    // const [editCompanyCategoryInput, setEditCompanyCategoryInput] = React.useState({})
    const [currentCategoryObject, setCurrentCategoryObject] = React.useState({})
    const [currentDeleteData, setCurrentDeleteData] = React.useState({})
    const [currentDeleteModel, setCurrentDeleteModel] = React.useState('')
    const [categoriesFetch, setCategoriesFetch] = React.useState([])
    const [openDisplayModal, setOpenDisplayModal] = React.useState(false)
    const [currentDisplayData, setCurrentDisplayData] = React.useState({})
    const [currentDisplayModel, setCurrentDisplayModel] = React.useState('')
    const handleOpenDisplay = () => setOpenDisplayModal(true)
    const handleCloseDisplay = () => setOpenDisplayModal(false)
    const [signupFormSelect, setSignupFormSelect] = useState({
        task_category: `${user.assistant.task_category.name}`
    })
    const [error, setError] = React.useState('')

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    function handleFormSelectChange(event) {
        const name = event.target.name;
        let value = event.target.value;
        setError('')
        
        setSignupFormSelect({
          [name]: value,
        });
    }


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

    const handleClose = () => setOpen(false);

    const handleOpenDeleteModal = (data, model) => {
        setCurrentDeleteData(data)
        setCurrentDeleteModel(model)
        setOpen(true)
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

    const handleEditHourlyRateChange = (e) => {
        setEditCompanyHourlyRateInput(e.target.value)
    }

    // const handleEditCompanyCategoryChange = (e) => {
    //     setEditCompanyCategoryInput(e.target.value)
    //     setCurrentCategoryObject(categoriesFetch.filter(category => category.name !== e.target.value))
    // }

    const handleOpenDisplayModalOnClick = (data, model) => {
        handleOpenDisplay()
        setCurrentDisplayData(data)
        setCurrentDisplayModel(model)
        // console.log('open')
    }

    const handleEditInfo = (name, bio, startDate, hourlyRate, category) => {
        console.log(name, bio, startDate, hourlyRate, category)
        setEditCompanyNameInput(name)
        setEditCompanyBioInput(bio)
        setEditCompanyStartDateInput(startDate)
        setEditCompanyHourlyRateInput(hourlyRate)
        // setEditCompanyCategoryInput(category)
        setEditStatus(!editStatus)
        setError('')
    }

    const handleSaveEdit = () => {
        fetch(`/assistants/${user.assistant.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                ...user.assistant,
                company_name: editCompanyNameInput,
                company_bio: editCompanyBioInput,
                company_start_date: editCompanyStartDateInput,
                company_hourly_rate: editCompanyHourlyRateInput,
                // task_category: {currentCategoryObject}
            })
        })
        // .then(r => {
        //     if (r.ok) {
        //         r.json().then(data => {
        //             console.log(data)
        //             setUser({...user, assistant: data})
        //             handleChangeEditStatus()
        //         })
        //     }
        // })
        .then(r => {
            r.ok ? r.json().then(assistantData => {
                fetch(`/assistant_tasks/${user.assistant.assistant_task.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({task_category_id: categoriesFetch.filter(cat => cat.name === signupFormSelect.task_category)[0].id, assistant_id: assistantData.id})
                })
                .then(r => {
                    r.ok ? r.json().then(assistantTaskData => {
                        console.log(assistantTaskData)
                        setUser({...user, assistant: {...assistantData, task_category: assistantTaskData.task_category, assistant_task: {...user.assistant.assistant_task, task_category_id: assistantTaskData.task_category_id }}})
                        handleChangeEditStatus()
                        setError('')
                    })
                    : r.json().then(error => {
                        console.log(error)
                        setError(error.error)
                        // setSignupFormData({
                        //     company_name: '',
                        //     company_bio: '',
                        //     company_start_date: '',
                        //     company_hourly_rate: '',
                        // })
                        // setSignupFormSelect({
                        //     task_category: ''
                        // })
                    })
                })
            })
            : r.json().then(error => {
                console.log(error)
                setError(error.error)
                // setSignupFormData({
                //     company_name: '',
                //     company_bio: '',
                //     company_start_date: '',
                //     company_hourly_rate: '',
                // })
                // setSignupFormSelect({
                //     task_category: ''
                // })
            })
        })
    }

    // useEffect(() => {
    //     fetch('/accounts/1')
    //     .then(r => r.json())
    //     .then(account => {
    //         setAccount(account)
    //     })
    // }, [])

    // useEffect(() => {
    //     fetch('/assistants/1')
    //     .then(r => r.json())
    //     .then(assistant => {
    //         setAssistant(assistant)
    //     })
    // }, [])
    console.log(user)
    console.log(signupFormSelect)

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
                                    {/* <Link href="#categories" underline='hover'>
                                        <Typography>
                                            Categories
                                        </Typography>
                                    </Link> */}
                                    <Link href="#info" underline='hover'>
                                        <Typography>
                                            Info
                                        </Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={10} sx={{ padding: '0.4rem 2.5rem',  }}>
                            {/* <Typography variant='h2'>
                                What would you like to do today?
                            </Typography> */}
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 0 30px' }}>
                                    <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '100%' }}>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Find A Job
                                            </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider variant="middle" />
                            <Grid item xs={12} sx={{ padding: '0' }}>

                            <Typography variant='h2' sx={{ paddingTop: '50px' }} id="agreements">
                                        Agreements
                                    </Typography>
                                    {user.assistant && user.assistant.task_agreements.length > 0 ?
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
                                                    <TableCell sx={{ width: '25%' }} align="left">Employer</TableCell>
                                                    <TableCell sx={{ width: '8%' }} align="left">Price</TableCell>
                                                    <TableCell sx={{ width: '17%' }} align="left">Date</TableCell>
                                                    <TableCell sx={{ width: '17%' }} align="right"></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {user.assistant && user.assistant.task_agreements.filter(agreement => agreement.is_completed === false).length > 0 ? user.assistant.task_agreements.filter(agreement => agreement.is_completed === false).map(agreement => {
                                                                return (<TableRow
                                                                    key={agreement.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                    <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                        {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                                    </TableCell>
                                                                    <TableCell align="left">{agreement.task_category.name}</TableCell>
                                                                    <TableCell align="left">{agreement.employer.company_name}</TableCell>
                                                                    <TableCell align="left">{`$${agreement.hourly_rate}/hr`}</TableCell>
                                                                    <TableCell align="left">{agreement.created_at}</TableCell>
                                                                    <TableCell align="right" sx={{ paddingRight: '0'  }}><Button onClick={() => handleOpenDisplayModalOnClick(agreement, 'Agreement')} >View</Button></TableCell>
                                                                    </TableRow>)
                                                        }) : <TableRow>
                                                            <TableCell align="left" sx={{ paddingLeft: '0', border: '0' }}>No Active Agreements</TableCell>
                                                        </TableRow> }
                                                {/* {user.assistant.task_agreements.map((agreement) => {
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
                                                    <TableCell sx={{ width: '25%' }} align="left">Employer</TableCell>
                                                    <TableCell sx={{ width: '8%' }} align="left">Price</TableCell>
                                                    <TableCell sx={{ width: '17%' }} align="left">Date</TableCell>
                                                    <TableCell sx={{ width: '17%', paddingRight: '0' }} align="right"></TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {user.assistant.task_agreements.filter(agreement => agreement.is_completed === true).length > 0 ? user.assistant.task_agreements.filter(agreement => agreement.is_completed === true).map(agreement => {
                                                                return (<TableRow
                                                                    key={agreement.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                    <TableCell component="th" scope="row" sx={{ paddingLeft: '0' }}>
                                                                        {`${agreement.task_post.task_description.slice(0,20)}...`}
                                                                    </TableCell>
                                                                    <TableCell align="left">{agreement.task_category.name}</TableCell>
                                                                    <TableCell align="left">{agreement.employer.company_name}</TableCell>
                                                                    <TableCell align="left">{`$${agreement.hourly_rate}/hr`}</TableCell>
                                                                    <TableCell align="left">{agreement.created_at}</TableCell>
                                                                    <TableCell align="right" sx={{ paddingRight: '0'  }}><Button onClick={() => handleOpenDisplayModalOnClick(agreement, 'Agreement')} >View</Button></TableCell>
                                                                    </TableRow>)
                                                        }) : <TableRow>
                                                            <TableCell align="left" sx={{ paddingLeft: '0', border: '0' }}>No Completed Agreements</TableCell>
                                                        </TableRow> }
                                                {/* {user.assistant.task_agreements.map((agreement) => {
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

                                {/* <Typography variant='h2' sx={{ paddingTop: '50px' }} id="agreements">
                                    Agreements
                                </Typography>
                                <Box sx={{ width: '100%' }}>
                                    {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
                                        {/* <Tabs value={agreementValue} sx={{ marginBottom: '15px' }} onChange={handleAgreementChange} aria-label="basic tabs example">
                                        <Tab label="Active" sx={{ textTransform: "none" }} {...a11yProps(0)} />
                                        <Tab label="Previous" sx={{ textTransform: "none" }} {...a11yProps(1)} />
                                        </Tabs> */}
                                    {/* </Box> */}
                                    {/* <TabPanel value={agreementValue} index={0}>
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
                                </Box> */}
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
                                                {user.assistant ? user.assistant.task_agreements.map((agreement) => (
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
                                {/* <Typography variant='h2' sx={{ paddingTop: '50px' }} id="categories">
                                    Categories
                                </Typography>
                                <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                    <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                        <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                {user.assistant ? <Button key={user.assistant.task_category.id} variant="outlined" size='small' color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', marginRight: '10px', padding: '.4rem 1.2rem', boxShadow: 'none', fontSize: '.8rem' }}>
                                                        {user.assistant.task_category.name}
                                                    </Button>
                                                : "Loading"}
                                            </Typography>
                                            <EditOutlinedIcon/>
                                        </Grid>
                                    </Grid>
                                </Box> */}
                                {/* <Typography variant='h2' sx={{ paddingTop: '50px' }} id="info">
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
                                </Box> */}
                                <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '50px 3px 10px' }}>
                                    <Typography variant='h2' sx={{ marginRight: 'auto' }} id="info">
                                        Info
                                    </Typography>
                                    {editStatus ? <><CheckOutlinedIcon onClick={handleSaveEdit} />
                                            <CloseOutlinedIcon onClick={() => handleEditInfo(user.assistant.company_name, user.assistant.company_bio, user.assistant.company_start_date, user.assistant.company_hourly_rate, user.assistant.task_category.name)} /></>
                                            : <EditOutlinedIcon onClick={() => handleEditInfo(user.assistant.company_name, user.assistant.company_bio, user.assistant.company_start_date, user.assistant.company_hourly_rate, user.assistant.task_category.name)} />}
                                    </Grid>
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        {error ? error.map(err => {
                                            return <Alert key={err} severity="error" sx={{ width: '75%!important', marginBottom: '10px' }}>{err}</Alert>
                                        }) : null}
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline'  }}>
                                            Company Name
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                            {editStatus ? <TextField onChange={handleEditNameChange} value={editCompanyNameInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                            : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                            {user.assistant ? user.assistant.company_name : "Loading"}
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
                                                    {user.assistant ? `${user.assistant.company_bio.slice(0,50)}...` : "Loading"}
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
                                                {user.assistant ? user.assistant.company_start_date : "Loading"}
                                                </Typography>
                                                </>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Company Hourly Rate
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ?
                                                    // <TextField onChange={handleEditStartDateChange} value={editCompanyStartDateInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    <TextField
                                                        id="outlined-company-hourly-rate"
                                                        type="number"
                                                        name="company_hourly_rate"
                                                        value={editCompanyHourlyRateInput}
                                                        onChange={handleEditHourlyRateChange}
                                                        // sx={{ width: 220 }}
                                                        InputLabelProps={{
                                                        shrink: true,
                                                        }}
                                                        InputProps={{ inputProps: { min: 0 } }}
                                                        size='small'
                                                        sx={{ marginRight: 'auto', width: '75%' }}
                                                    />
                                                : <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user.assistant ? `$${user.assistant.company_hourly_rate}/hr` : "Loading"}
                                                </Typography>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Category
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '100%' }}>
                                                {editStatus ?
                                                    // <TextField onChange={handleEditStartDateChange} value={editCompanyStartDateInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    // <TextField
                                                    //     id="outlined-company-hourly-rate"
                                                    //     type="number"
                                                    //     name="company_hourly_rate"
                                                    //     value={editCompanyHourlyRateInput}
                                                    //     onChange={handleEditHourlyRateChange}
                                                    //     // sx={{ width: 220 }}
                                                    //     InputLabelProps={{
                                                    //     shrink: true,
                                                    //     }}
                                                    //     size='small'
                                                    //     sx={{ marginRight: 'auto', width: '75%' }}
                                                    // />

                                                    <Box sx={{ width: '75%' }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">Task Category</InputLabel>
                                                            <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name='task_category'
                                                            value={signupFormSelect.task_category}
                                                            label='Task Category'
                                                            onChange={handleFormSelectChange}
                                                            MenuProps={MenuProps}
                                                            >
                                                            {categoriesFetch.map((category) => (
                                                                <MenuItem
                                                                key={category.name}
                                                                value={category.name}
                                                                //   style={getStyles(category.name, personName, theme)}
                                                                >
                                                                {category.name}
                                                                </MenuItem>
                                                            ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                : <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user.assistant ? `${user.assistant.task_category.name}` : "Loading"}
                                                </Typography>}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    {/* <Box sx={{ flexGrow: 1, padding: '0px 0 0' }}>
                                        <Typography variant='p' component="p" sx={{ paddingTop: '0px', fontFamily: 'Poppins', fontWeight: "500", textDecoration: 'underline' }}>
                                            Category
                                        </Typography>
                                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 3px' }}>
                                            <Grid container spacing={1} sx={{ padding: '10px 4px', width: '75%' }}>
                                                {editStatus ?
                                                    // <TextField onChange={handleEditStartDateChange} value={editCompanyStartDateInput} size='small' sx={{ marginRight: 'auto', width: '75%' }}></TextField>
                                                    // <TextField
                                                    //     id="outlined-task-category"
                                                    //     type="number"
                                                    //     name="task_category"
                                                    //     value={editCompanyCategoryInput}
                                                    //     onChange={handleEditCompanyCategoryChange}
                                                    //     // sx={{ width: 220 }}
                                                    //     InputLabelProps={{
                                                    //     shrink: true,
                                                    //     }}
                                                    //     size='small'
                                                    //     sx={{ marginRight: 'auto', width: '75%' }}
                                                    // />
                                                    <FormControl sx={{ width: '100%' }}>
                                                        {/* <InputLabel id="demo-simple-select-label">Task Category</InputLabel> */}
                                                            {/* <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            name='task_category'
                                                            value={editCompanyCategoryInput}
                                                            // label='Task Category'
                                                            onChange={handleEditCompanyCategoryChange}
                                                            size='small'
                                                            >
                                                            {categoriesFetch.map((category) => (
                                                                <MenuItem
                                                                key={category.name}
                                                                value={category.name}
                                                                //   style={getStyles(category.name, personName, theme)}
                                                                >
                                                                {category.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select> */}
                                                    {/* </FormControl> */}
                                                {/* : <Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                                    {user.assistant ? <Button key={user.assistant.task_category.id} variant="outlined" size='small' color="primary" sx={{  borderRadius: '1.5rem', marginBottom: '0', marginRight: '10px', padding: '.4rem 1.2rem', boxShadow: 'none', fontSize: '.8rem' }}>
                                                            {user.assistant.task_category.name}
                                                        </Button>
                                                    : "Loading"}
                                                </Typography>}
                                            </Grid>
                                        </Grid> */}
                                    {/* </Box> */}
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
                                            <CloseOutlinedIcon onClick={() => handleEditInfo(user.assistant.company_name)} /></>
                                            : <><Typography variant='p' sx={{ marginRight: 'auto', fontFamily: 'Poppins' }}>
                                            {user.assistant ? user.assistant.company_name : "Loading"}
                                        </Typography>
                                        <EditOutlinedIcon onClick={() => handleEditInfo(user.assistant.company_name)} /></>}
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
                                    </Box> */}
                                    <Box sx={{ flexGrow: 1, padding: '30px 0 0' }}>
                                        <Button onClick={() => handleOpenDeleteModal(user.assistant, 'assistants')} variant='outlined' color='error'>
                                            Delete Assistant Profile
                                        </Button>
                                    </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <DeleteModal open={open} handleClose={handleClose} user={user} setUser={setUser} currentDeleteData={currentDeleteData} currentDeleteModel={currentDeleteModel} />
                <DisplayModal open={openDisplayModal} handleClose={handleCloseDisplay} user={user} setUser={setUser} currentDisplayData={currentDisplayData} setCurrentDisplayData={setCurrentDisplayData} currentDisplayModel={currentDisplayModel} setCurrentDisplayModel={setCurrentDisplayModel} />
            </Container>
        </>
    )
}

export default ProfileAssistant
