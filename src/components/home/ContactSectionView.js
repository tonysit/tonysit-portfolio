import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import isEmail from 'validator/lib/isEmail';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import { iOS } from '../../helpers/DeviceUtils';
import useWindowScroll from '../../hooks/useWindowScroll';
import GoogleMap from '../common/GoogleMap';
import * as Mailgun from '../../helpers/Mailgun';
import FlashMessage from '../common/FlashMessage';
import moment from 'moment'

const SpeedDialTheme = createTheme({
    palette: {
      primary: {
        main: common.white,
      },
    },
});

export default () => {
    const { t } = useTranslation();
    const { height, width } = useWindowDimensions();
    const { offset, scrollEnd } = useWindowScroll('.scroll-container');

    // set state
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mesage, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const [flashOptions, setFlashOptions] = React.useState({
        open: false,
        type: '',
        msg: ''
    });


    const _submitButtonClicked = async (e) => {
        e.preventDefault();
        let newErrors = [];
        let currentIsValidEmail = isValidEmail;
        if(!name){
            newErrors.push('name');
        }
        if(!email){
            newErrors.push('email');
        }else{
            currentIsValidEmail = isEmail(email);
            setIsValidEmail(currentIsValidEmail);
        }
        if(!mesage){
            newErrors.push('mesage');
        }
        if(newErrors.length > 0 || !currentIsValidEmail){
            setErrors(newErrors);
        }else{
            setLoading(true);
            const senttime = localStorage.getItem('senttime');
            let isOK = false;
            if(senttime){
                const minutes = moment().diff(moment(senttime), 'minutes');
                console.log("minutes", minutes)
                if(minutes > 5){
                    const res = await Mailgun.send('tony@playmore.com.hk', 'Contact Me', `Name: ${name} \n Email: ${email} \n Message: ${mesage}`);
                    if(res){
                        localStorage.setItem("senttime", moment());
                         setFlashOptions({
                            open: true,
                            type: 'success',
                            msg: 'Successfully submitted.'
                        });
                    }else{
                        setFlashOptions({
                            open: true,
                            type: 'error',
                            msg: 'Can not submit again within 5 minutes.'
                        });
                    }
                }else{
                    setFlashOptions({
                        open: true,
                        type: 'error',
                        msg: 'Fail submitted.'
                    });
                }
            }else{
                const res = await Mailgun.send('tony@playmore.com.hk', 'Contact Me', `Name: ${name} \n Email: ${email} \n Message: ${mesage}`);
                if(res){
                    localStorage.setItem("senttime", moment());
                }else{
                    setFlashOptions({
                        open: true,
                        type: 'error',
                        msg: 'Fail submitted.'
                    });
                }
            }

            if(isOK){
                localStorage.setItem("senttime", moment());
                setFlashOptions({
                    open: true,
                    type: 'success',
                    msg: 'Successfully submitted.'
                });
            }else{
                
            }

            setEmail('');
            setMessage('');
            setName('');
            setErrors([]);
            setLoading(false);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setFlashOptions({
            open: false,
            type: '',
            msg: ''
        });
    };

    const _textFieldChanged = (name) => (e) => {
        console.log('***_textFieldChanged***', e.target.value)
        switch(name){
            case 'email': {
                setEmail(e.target.value);
            }   break;
            case 'mesage': {
                setMessage(e.target.value);
            }   break;
            default: {
                setName(e.target.value);
            }
        }
    }

    const isScrollEnd = offset >= scrollEnd && scrollEnd;
    return (
        <React.Fragment>
            <Box sx={{  width: '100%', height: '75%', textAlign: 'center' }}>
                <Toolbar />
                <Typography variant="h2" gutterBottom component="div" color="common.white" style={{fontWeight: 500, marginTop: 5}}>{t('Contact')}</Typography>

                <Box
                component="form"
                sx={{
                    maxWidth: '100%',
                    margin: 5
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField 
                    id="name" value={name} 
                    onChange={_textFieldChanged('name')} 
                    label={t('Name')} 
                    variant="filled" 
                    fullWidth margin="normal" 
                    error={errors.includes('name')}
                    helperText={errors.includes('name') ? `(${t('Required')})` : ''}
                    />
                    <TextField 
                    id="email" 
                    onChange={_textFieldChanged('email')} 
                    label={t('Email Address')} 
                    variant="filled" 
                    fullWidth 
                    margin="normal"
                    error={errors.includes('email') || !isValidEmail}
                    helperText={errors.includes('email') ? `(${t('Required')})` : (
                        isValidEmail ? '' : `${t('Incorrect')} ${t('Email Address')}.`
                    )}
                    />
                    <TextField 
                    id="mesage" 
                    value={mesage} 
                    onChange={_textFieldChanged('mesage')} 
                    label={t('Message')} 
                    variant="filled" 
                    fullWidth 
                    margin="normal" 
                    rows={8} 
                    multiline
                    error={errors.includes('mesage')}
                    helperText={errors.includes('mesage') ? `(${t('Required')})` : ''}
                    />
                </Box>
            </Box>
            <Box sx={{  width: '100%', height: '25%' }}>
                <LinearProgress color="secondary" hidden={!loading}/>
                <GoogleMap 
                width={'100%'} 
                height={'100%'}
                center={{
                    lat: 22.2991733,
                    lng: 114.1739824
                }}
                zoom={18}
                options={{
                    disableDefaultUI: true
                }}
                />
                <Link href="#" underline="none" onClick={_submitButtonClicked} >
                <ThemeProvider theme={SpeedDialTheme}>
                    <Tooltip title={t('Submit')} placement="bottom" arrow>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            direction='down'
                            hidden={!isScrollEnd || loading}
                            sx={{ position: 'absolute', bottom: ( height * 0.25 ) - ( iOS ? 20 : 40 ), right: 30 }}
                            icon={<SpeedDialIcon icon={<SendRoundedIcon /> } />}
                        ></SpeedDial>
                        </Tooltip>
                    </ThemeProvider>
                </Link>
            </Box>
            <FlashMessage 
            open={flashOptions.open} 
            severity={flashOptions.type} 
            onClose={handleClose} 
            anchorOrigin={{ 
                vertical: 'bottom',
                horizontal: 'center', 
            }}>
                {flashOptions.msg}
            </FlashMessage>
        </React.Fragment>
    );
}

