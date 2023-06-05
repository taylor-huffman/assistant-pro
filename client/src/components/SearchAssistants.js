import React, { useContext, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Rating, Avatar, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Link, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, FormHelperText, Slider, Input, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';
import DisplayModal from './DisplayModal';
import ChooseAssistantModal from './ChooseAssistantModal'

  
    // function TabPanel(props) {
    //     const { children, value, index, ...other } = props;
      
    //     return (
    //       <div
    //         role="tabpanel"
    //         hidden={value !== index}
    //         id={`simple-tabpanel-${index}`}
    //         aria-labelledby={`simple-tab-${index}`}
    //         {...other}
    //       >
    //         {value === index && (
    //           <Box sx={{ p: 0 }}>
    //             {children}
    //           </Box>
    //         )}
    //       </div>
    //     );
    //   }
      
    //   TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.number.isRequired,
    //     value: PropTypes.number.isRequired,
    //   };
      
    //   function a11yProps(index) {
    //     return {
    //       id: `simple-tab-${index}`,
    //       'aria-controls': `simple-tabpanel-${index}`,
    //     };
    //   }

function SearchAssistants() {
    
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
    const [assistants, setAssistants] = React.useState([])
    const handleOpenDisplay = () => setOpenDisplayModal(true)
    const handleCloseDisplay = () => setOpenDisplayModal(false)
    const handleClose = () => setOpen(false);
    const [currentAssistant, setCurrentAssistant] = React.useState({})
    
    console.log(user)
    // const arr = []
    
    // const catToBoolean = () => {
    //     let obj = {}
    //     for (let category of categoriesFetch) {
    //         obj[category.name] = false
    //         // console.log(obj)
    //     }
    //     return obj
    // }


    // const catBoolean = catToBoolean()

    const [categoryState, setCategoryState] = React.useState({});
    const [ratingValue, setRatingValue] = React.useState(0);
    const [ratingHover, setRatingHover] = React.useState(-1);
    const [hourlyRateValue, setHourlyRateValue] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('')

    console.log(searchValue)

    const marks = [
        {
          value: 0,
          label: '$0',
        },
        {
          value: 150,
          label: '$150+',
        },
      ];

    const filteredAssistants = assistants.filter(assistant => {
        if((Object.keys(categoryState).filter(keyName => categoryState[keyName] === true)).length > 0) {
            return (Object.keys(categoryState).filter(keyName => categoryState[keyName] === true)).includes(assistant.task_category.name)
        } else return assistant
    }).filter(assistant => {
        if(ratingValue) {
            return assistant.average_rating >= ratingValue
        } else return assistant
    }).filter(assistant => assistant.company_hourly_rate >= hourlyRateValue).filter(assistant => {
        if(searchValue) {
            return assistant.task_category.name.toUpperCase().includes(searchValue.toUpperCase()) || assistant.company_name.toUpperCase().includes(searchValue.toUpperCase())
        } else return assistant
    })

    // console.log(assistants.filter(assistant => {
    //     if(assistant.task_category) {
    //         return assistant.task_category.name === categoryState
    //     }
    // }))

    console.log(filteredAssistants)

    // catToBoolean()

    

    // console.log(Object.keys(categoryState).filter(keyName => categoryState[keyName] === true))
    
      const handleChange = (event) => {
        setCategoryState({
          ...categoryState,
          [event.target.name]: event.target.checked,
        });
      };


    useEffect(() => {
        fetch('/assistants')
        .then(r => {
            r.ok ? r.json().then(data => {
                console.log(data)
                setAssistants(data)
            })
            : r.json().then(error => console.log(error))
        })
    }, [])

    useEffect(() => {
        fetch('/task_categories')
        .then(r => {
            r.ok ? r.json().then(data => {
                setCategoriesFetch(data)
                let obj = {}
                for (let category of data) {
                    obj[category.name] = false
                    // console.log(obj)
                }
                setCategoryState(obj)
            })
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
        .then(r => {
            if (r.ok) {
                r.json().then(data => {
                    console.log(data)
                    setUser({...user, assistant: data})
                    handleChangeEditStatus()
                })
            }
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

    const handleOpenChooseAssistant = (assistant) => {
        setOpen(true)
        setCurrentAssistant(assistant)
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                <Box>
                    <Grid xs={12}>
                        <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                            Find Assistants
                        </Typography>
                    </Grid>
                </Box>
                <Box sx={{ marginTop: '3.5rem' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={2.5}>
                            <Box sx={{ position: 'sticky', top: '30px' }}>
                                <Typography sx={{ marginBottom: '1.5rem', fontWeight: '900' }}>
                                    Filters
                                </Typography>
                                <Typography sx={{ marginBottom: '5px' }}>Categories</Typography>
                                <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)', maxHeight: '230px', overflowY: 'auto', overflowX: 'hidden' }}>
                                    {/* <Link href="#" underline='hover'>
                                        <Typography>
                                            Home
                                        </Typography>
                                    </Link>
                                    <Link href="#agreements" underline='hover'>
                                        <Typography>
                                            Agreements
                                        </Typography>
                                    </Link>
                                    <Link href="#info" underline='hover'>
                                        <Typography>
                                            Info
                                        </Typography>
                                    </Link> */}
                                    <FormControl sx={{ m: 0, fontSize: '12px' }} component="fieldset" variant="standard">
                                            <FormGroup>
                                                {Object.keys(categoryState).map((keyName, keyIndex) => {
                                                return <FormControlLabel
                                                sx={{ fontSize: '14px',
                                                '& > span': {
                                                    fontSize: '14px',
                                                    padding: '5px 0 0 8px'
                                                } }}
                                                key={keyName}
                                                control={
                                                <Checkbox checked={categoryState[keyName]} onChange={handleChange} name={keyName} />
                                                }
                                                label={keyName}
                                                />
                                                })}
                                            </FormGroup>
                                    </FormControl>
                                </Box>
                                <Box sx={{ marginTop: '40px' }}>
                                    <Typography>Rating</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                                    <Rating
                                        name="simple-controlled"
                                        precision={0.5}
                                        value={ratingValue}
                                        onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setRatingHover(newHover);
                                          }}
                                    />
                                    <Typography sx={{ marginLeft: '10px' }}>{ratingHover !== -1 ? ratingHover : ratingValue}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ marginTop: '40px' }}>
                                    <Typography>Hourly Rate</Typography>
                                    <Box sx={{ display: 'flex' }}>
                                    <Slider sx={{ marginTop: '10px' }} aria-label="Hourly-Rate" value={hourlyRateValue} onChange={(event, newValue) => {
                                        setHourlyRateValue(newValue);
                                    }}
                                    valueLabelDisplay="auto"
                                    max={150}
                                    marks={marks} />
                                    {/* <Typography sx={{ marginLeft: '10px' }}>{ratingHover !== -1 ? ratingHover : ratingValue}</Typography> */}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={9.5} sx={{ padding: '0.4rem 2.5rem',  }}>
                            {/* <Typography variant='h2'>
                                What would you like to do today?
                            </Typography> */}
                            <Box sx={{ flexGrow: 1 }}>
                                {/* <Grid container spacing={1} sx={{ justifyContent: 'space-between', padding: '10px 0 30px' }}>
                                    <Grid xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '100%' }}>
                                            <Typography variant="p" sx={{ fontWeight: '900' }}>
                                                Find A Job
                                            </Typography>
                                    </Grid>
                                </Grid> */}
                                <Box sx={{ 
                                    flexGrow: 1,
                                    marginBottom: '30px',
                                    display: { xs: 'none', md: 'flex' }
                                }}>
                                    <Input
                                    id="input-with-icon-adornment-desktop"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                    placeholder="Search Assistant Name or Category"
                                    // inputProps={ariaLabel}
                                    disableUnderline={true}
                                    sx={{ 
                                        backgroundColor: '#e4e4e4',
                                        borderRadius: '2rem',
                                        padding: '0 .5rem',
                                        width: '100%',
                                    }}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    value={searchValue} />
                                </Box>
                            </Box>
                            <Divider variant="middle" />
                            <Grid item xs={12} sx={{ padding: '0' }}>
                                {filteredAssistants.length > 0 ? filteredAssistants.map(assistant => {
                                    return <Grid key={assistant.id} sx={{ width: '100%', display: 'flex' }}>
                                    <Grid item>
                                        <Avatar sx={{ minWidth: '80px', minHeight: '80px' }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Box>
                                                <Typography sx={{ fontWeight: 'bold', color: '#538F39', display: 'flex', alignItems: 'center' }}>
                                                    {assistant.company_name} {assistant.average_rating ? <><Rating name="average_rating" size='small' precision={0.1} value={assistant.average_rating} readOnly sx={{ marginLeft: '10px' }} /><span style={{ fontWeight: '500', color: 'lightgray', marginLeft: '10px', fontSize: '14px'}}>{assistant.average_rating}</span></> : <span style={{ fontWeight: '500', color: 'lightgray', marginLeft: '10px', fontSize: '14px' }}>No Reviews</span>}
                                                </Typography>
                                                <Typography sx={{ fontWeight: '700', display: 'flex', alignItems: 'center' }}>
                                                    {`$${assistant.company_hourly_rate}/hr`} {assistant.task_category ? <Button sx={{ borderRadius: '30px', fontSize: '14px', marginLeft: '8px', padding: '0 10px' }}>
                                                    {assistant.task_category.name}
                                                </Button> : null}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ marginLeft: 'auto' }}>
                                                <Button onClick={() => {handleOpenChooseAssistant(assistant)}} variant='outlined' sx={{ borderRadius: '30px', fontSize: '14px' }}>Choose Assistant</Button>
                                            </Box>
                                        </Box>
                                        <Box sx={{ marginLeft: 'auto' }}>
                                            <Typography>
                                                {assistant.company_bio}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                }) : <Grid item xs={12} sx={{ padding: '50px' }}><Typography>No results. Please adjust your filters.</Typography></Grid>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <DisplayModal open={openDisplayModal} handleClose={handleCloseDisplay} user={user} setUser={setUser} currentDisplayData={currentDisplayData} setCurrentDisplayData={setCurrentDisplayData} currentDisplayModel={currentDisplayModel} setCurrentDisplayModel={setCurrentDisplayModel} />
            </Container>
            <ChooseAssistantModal open={open} handleClose={handleClose} user={user} setUser={setUser} currentDeleteData={currentDeleteData} currentDeleteModel={currentDeleteModel} assistant={currentAssistant} />
        </>
    )
}

export default SearchAssistants
