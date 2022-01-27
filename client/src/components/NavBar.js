import { AppBar, Avatar, Box, Button, Container, createTheme, Divider, IconButton, InputBase, Menu, MenuItem, Paper, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PSA10Logo from '../2.png';
import LogIn from "../pages/LogIn";

const NavBar = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const pages = [{title: 'My Collection', link: '/profile/collections'}, {title: 'Community', link: '/community'}, {title: 'Message Board', link: '/messageboard'}, {title: 'About Us', link: '/about'}];
    const settings = [{title: 'Profile', link: '/profile/overview'}, {title: 'Account', link: `/users/${auth.id}/edit`}];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElLogin, setAnchorElLogin] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLoginMenu = (event) => {
    setAnchorElLogin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLoginMenu = () => {
    setAnchorElLogin(null);
  };

  const theme = createTheme({
      palette: {
          primary: {
              main: '#6569C8',
              contrastText: '#FFFFFF',
          },
          secondary: {
              main: '#90BDEE',
              contrastText: '#FFFFFF',
          },
          accent: {
              main: '#C4C4C4',
              contrastText: '#FFFFFF',
          },
          white: {
              main: '#FFFFFF',
              contrastText: '#272830',
          },
          black: {
              main: '#272830',
              contrastText: '#FFFFFF',
          },
      }
  });

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.white,
  '&:hover': {
    backgroundColor: theme.palette.white,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

  return (
      <ThemeProvider theme={theme} >
        <AppBar position="static" color="white" >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            {/* <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                LOGO
            </Typography> */}
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex', overflow: "hidden", maxHeight: "65px", alignItems: "center" } }} >
                <img src={PSA10Logo} alt="psa10 logo" height="80px" />
                <Divider orientation="vertical" flexItem variant="middle" />
            </Box>
            {!auth.authenticated && 
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, minWidth: "300px" }}></Box>}
           {auth.authenticated &&
            <>
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
                    <MenuItem key={page.title} onClick={()=> {
                        handleCloseNavMenu();
                        navigate(page.link);}}> 
                    <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </>}
            {/* above here ^^ is when the app bar is small and collapsed */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', overflow: "hidden", maxHeight: "65px", alignItems: "center"  } }} >
                <img src={PSA10Logo} alt="psa10 logo" height="80px" />
                <Divider orientation="vertical" flexItem variant="middle" />
            </Box>
            {auth.authenticated &&
                <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page.title}
                    onClick={()=> {
                        handleCloseNavMenu();
                        navigate(page.link);}} 
                    sx={{ my: 2, display: 'block' }}
                    color="accent"
                >
                    {page.title}
                </Button>
                ))}
            </Box>
            </>}
            <Paper elevation={3} sx={{borderRadius: "10px", marginRight: "20px"}} >
                <Search>
                <SearchIconWrapper>
                <SearchIcon color="black" />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                />
                </Search>
            </Paper>
            {!auth.authenticated && 
            <Box sx={{ flexGrow: 0, ml: 2, position: "relative" }} >
                <Button 
                variant="contained" 
                color="primary" 
                sx={{borderRadius: "20px", marginRight: "20px"}}
                onClick={handleOpenLoginMenu} >
                    Login
                </Button>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElLogin}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElLogin)}
                onClose={handleCloseLoginMenu}
                >
                    <Box sx={{ marginLeft: '25px', marginRight: '25px', marginBottom: '10px'}}>
                        <LogIn />
                    </Box>
                </Menu>
                <Button 
                variant="outlined" 
                color="black" 
                sx={{borderRadius: "20px", marginRight: "20px"}}
                onClick={()=>navigate("/register")} >
                    Sign Up
                </Button>
            </Box>
            }
            {auth.authenticated &&
            <>
            <NotificationsNoneIcon sx={{ marginRight: "20px" }} />
            {/* ^^^ will need to figure out what to do with notifications ^^^ */}
            <Button 
            variant="contained" 
            color="primary" 
            sx={{borderRadius: "20px", marginRight: "20px"}}
            onClick={()=>navigate("/upload")} >
                Upload
            </Button>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="profile" src={auth.image} />
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
                    <MenuItem key={setting.title} onClick={()=>{
                        handleCloseUserMenu();
                        navigate(setting.link);}}>
                    <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
                <MenuItem key={'logout'} onClick={()=>{
                    handleCloseUserMenu();
                    handleCloseLoginMenu();
                    auth.handleLogout(navigate);}}>
                    <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </>}
            </Toolbar>
        </Container>
        </AppBar>
      </ThemeProvider>

    );
};

const styles = {
    container: {
        margin: "0px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "black",
    },
    link: {
        textDecoration: "none",
        margin: "10px",
        color: "white",
    },
    buttonLink: {
        textDecoration: "none",
        margin: "10px",
        color: "white",
        border: '0px',
        backgroundColor: 'black',
        fontSize: '16px',
    }
}

export default NavBar;