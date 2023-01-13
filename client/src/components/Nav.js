// import React from 'react'
// import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
// import { styled } from '@mui/system';
// import Stack from '@mui/material/Stack';

// const blue = {
//     500: '#007FFF',
//     600: '#0072E5',
//     700: '#0059B2',
//   };
  
//   const CustomButton = styled(ButtonUnstyled)`
//     font-family: IBM Plex Sans, sans-serif;
//     font-weight: bold;
//     font-size: 0.875rem;
//     background-color: ${blue[500]};
//     padding: 12px 24px;
//     border-radius: 12px;
//     color: white;
//     transition: all 150ms ease;
//     cursor: pointer;
//     border: none;
  
//     &:hover {
//       background-color: ${blue[600]};
//     }
  
//     &.${buttonUnstyledClasses.active} {
//       background-color: ${blue[700]};
//     }
  
//     &.${buttonUnstyledClasses.focusVisible} {
//       box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
//       outline: none;
//     }
  
//     &.${buttonUnstyledClasses.disabled} {
//       opacity: 0.5;
//       cursor: not-allowed;
//     }
//   `;

// function Nav() {
//   return (
//     <div>
//         <Stack spacing={2} direction="row">
//             <CustomButton>Button</CustomButton>
//             <CustomButton disabled>Disabled</CustomButton>
//         </Stack>
//     </div>
//   )
// }

// export default Nav



import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input'
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';

// import { useTheme } from '@mui/material/styles'

const pages = ['Categories', 'Log In'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const ariaLabel = { 'aria-label': 'description' };

const Nav = () => {
    // const theme = useTheme()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'unset',
            borderBottom: '1px solid #e4e4e4'
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                {/* <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                    flexGrow: 1,
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}
                <Box sx={{ 
                    display: { xs: 'none', md: 'flex' },
                }}>
                    <img alt="Assistant Pro Logo" src={require('../media/assistantpro-logo-dark.png')} style={{ marginRight: 'auto', maxWidth: '250px' }} />
                </Box>
                <Box sx={{ 
                    flexGrow: 1,
                    marginLeft: '1.5rem',
                    display: { xs: 'none', md: 'flex' }
                }}>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    placeholder="Search Assistants" inputProps={ariaLabel}
                    disableUnderline={true}
                    sx={{ 
                        backgroundColor: '#e4e4e4',
                        borderRadius: '2rem',
                        padding: '0 .5rem'
                    }} />
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography> */}
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                }}>
                <img alt="Assistant Pro Logo" src={require('../media/assistantpro-logo-dark.png')} style={{ marginRight: 'auto', maxWidth: '180px' }} />
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <ListItem
                        component="a"
                        href={`/${page}`}
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'black', display: 'block', padding: '0 10px' }}
                    >
                        <ListItemText primary={page} />
                    </ListItem>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" /*src="../media/taylorheadshot.jpg"*/ />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </Toolbar>
                <Box sx={{ 
                    display: { xs: 'flex', md: 'none' }
                }}>
                    <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    placeholder="Search Assistants" inputProps={ariaLabel}
                    disableUnderline={true}
                    sx={{ 
                        backgroundColor: '#e4e4e4',
                        borderRadius: '2rem',
                        padding: '0 .5rem',
                        width: '100%',
                        marginBottom: '1rem'
                    }} />
                </Box>
            </Container>
        </AppBar>
    );
};
export default Nav;

