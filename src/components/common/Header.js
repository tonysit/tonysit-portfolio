import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Pages } from '../../configs/Menu';
import useWindowScroll from '../../hooks/useWindowScroll';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { iOS } from '../../helpers/DeviceUtils';
import Variables from '../../configs/Variables';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const history = useHistory();
  const { offset } = useWindowScroll('.scroll-container');
  const { height } = useWindowDimensions();
  const { t } = useTranslation();
  const { section } = useSelector(state => {
    return {
      section: state.home.section
    };
  });

  const handleOpenNavMenu = () => setMobileNavOpen(true);
  const handleCloseNavMenu = (index) => () => {
    const targetPath = Pages[index].path;
    setMobileNavOpen(false);
    history.push(`/#${targetPath}`);
    requestAnimationFrame(() => {
      document.getElementById(targetPath)?.scrollIntoView({
        behavior: Variables.scrollBehavior,
        block: 'start',
      });
    });
  };

  const handleCloseMobileNav = () => setMobileNavOpen(false);

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
                aria-label={t('Open navigation menu')}
                aria-controls="mobile-fullscreen-nav"
                aria-haspopup="true"
                aria-expanded={mobileNavOpen}
                onClick={handleOpenNavMenu}
                color="secondary"
                >
                <MenuIcon />
                </IconButton>
            </Box>
            <Dialog
                fullScreen
                id="mobile-fullscreen-nav"
                open={mobileNavOpen}
                onClose={handleCloseMobileNav}
                PaperProps={{ className: 'mobile-nav-dialog' }}
            >
                <div className="mobile-nav-shell">
                    <div className="mobile-nav-header">
                        <Image
                            src={require('../../assets/image/icon_white_v2.png').default}
                            alt=""
                            width={42}
                            height={42}
                        />
                        <span className="mobile-nav-brand">TONY SIT</span>
                        <IconButton
                            className="mobile-nav-close"
                            aria-label={t('Close navigation')}
                            onClick={handleCloseMobileNav}
                        >
                            <CloseRoundedIcon />
                        </IconButton>
                    </div>
                    <div className="mobile-nav-content">
                        <nav aria-label={t('Main navigation')}>
                            {Pages.map((item, index) => (
                                <Button
                                    className={`mobile-nav-link${section === item.path ? ' is-active' : ''}`}
                                    disabled={section === item.path}
                                    aria-current={section === item.path ? 'page' : undefined}
                                    key={item.path}
                                    onClick={handleCloseNavMenu(index)}
                                >
                                    <span className="mobile-nav-link-title">{item.title}</span>
                                    {section !== item.path && <ArrowOutwardRoundedIcon className="mobile-nav-arrow" />}
                                </Button>
                            ))}
                        </nav>
                    </div>
                </div>
            </Dialog>
            </Toolbar>
        </Container>
        </AppBar>
        <Toolbar />
    </React.Fragment>
  );
};
export default Header;
