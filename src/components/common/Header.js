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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { Pages } from '../../configs/Menu';
import useWindowScroll from '../../hooks/useWindowScroll';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { iOS } from '../../helpers/DeviceUtils';
import Variables from '../../configs/Variables';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const { offset } = useWindowScroll('.scroll-container');
  const { height } = useWindowDimensions();
  const { t } = useTranslation();
  const { section } = useSelector(state => {
    return {
      section: state.home.section
    };
  });

  const handleOpenNavMenu = (event) => {
    
  };
  const handleOpenUserMenu = (event) => {
    
  };

  const handleCloseNavMenu = (index) => event => {
    document.getElementById(Pages[index].path).scrollIntoView({ behavior: Variables.scrollBehavior, block: 'start' })
    history.push(`/#${Pages[index].path}`);
  };

  const handleCloseUserMenu = (index) => event => {

  };

  const isFirstSection = offset < height * 0.3 && !iOS;
  
  return (
    <React.Fragment>
        <AppBar 
        position="fixed" 
        color={isFirstSection ? 'transparent' : 'primary'}
        elevation={isFirstSection ? 0 : 4}
        >
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                <Image src={require('../../assets/image/icon_white_v2.png').default} alt={t('Tony Sit')} height={40}/>
            </Typography>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                <Image src={require('../../assets/image/icon_white_v2.png').default} alt={t('Tony Sit')} width={40}/>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {Pages.map((item, index) => (
                <Button
                    key={index}
                    disabled={section == item.path}
                    onClick={handleCloseNavMenu(index)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {item.title}
                </Button>
                ))}
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
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
                {Pages.map((item, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu(index)}>
                        <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
        <Toolbar />
    </React.Fragment>
  );
};
export default Header;