import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { UserContext } from '../context/user';
import Link from '@mui/material/Link';
import { useHistory } from 'react-router-dom';

const pages = ['Categories', 'Login'];

const Nav = () => {
    const { user, setUser, setIsAuth } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const history = useHistory()

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

    const handleLogOut = (event) => {
        handleCloseUserMenu(event)
        fetch('/logout', {
            method: 'DELETE'
        }).then(r => {
            if (r.ok) {
                setUser('')
                setIsAuth(false)
                history.push('/login')
            } else {
                r.json().then(data => console.log(data))
            }
        })
    }

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'unset',
            borderBottom: '1px solid #e4e4e4'
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                <Link href='/' sx={{ marginRight: 'auto' }}>
                    <Box sx={{ 
                        display: { xs: 'none', md: 'flex' },
                    }}>
                        <img alt="Assistant Pro Logo" src={require('../media/assistantpro-logo-dark.png')} style={{ marginRight: 'auto', maxWidth: '250px' }} />
                    </Box>
                </Link>
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
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                }}>
                <img alt="Assistant Pro Logo" src={require('../media/assistantpro-logo-dark.png')} style={{ marginRight: 'auto', maxWidth: '180px' }} />
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <ListItem
                        component="a"
                        href={'/search/assistants'}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'black', display: 'block', padding: '0 10px' }}
                    >
                        <ListItemText primary='Search' />
                    </ListItem>
                    {user ? null : <ListItem
                        component="a"
                        href={'/login'}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'black', display: 'block', padding: '0 10px' }}
                    >
                        <ListItemText primary='Log In' />
                    </ListItem>}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    {user ? <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={user.image} />
                    </IconButton>
                    </Tooltip> : <Link href='/login?signup=1' underline="none"><Button variant="contained" sx={{ borderRadius: '30px' }}>Sign Up</Button></Link> }
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
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Link href={'/account'} underline="hover">
                                <Typography textAlign="center">Account</Typography>
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleLogOut}>
                            <Link underline="hover">
                                <Typography textAlign="center">Log Out</Typography>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Nav;

