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
import Tooltip from '@mui/material/Tooltip';
import isEmail from 'validator/lib/isEmail';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import { iOS } from '../../helpers/DeviceUtils';
import useWindowScroll from '../../hooks/useWindowScroll';
import GoogleMap from '../common/GoogleMap';
import ContactMapOverlayView from './ContactMapOverlayView';
import FlashMessage from '../common/FlashMessage';

const SpeedDialTheme = createTheme({
    palette: {
      primary: {
        main: common.white,
      },
    },
});

export default () => {
    const { t } = useTranslation();
    const { height } = useWindowDimensions();
    const { offset, scrollEnd } = useWindowScroll('.scroll-container');

    // set state
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [mesage, setMessage] = React.useState('');
    const [errors, setErrors] = React.useState([]);
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const [sending, setSending] = React.useState(false);
    const [flashOptions, setFlashOptions] = React.useState({
        open: false,
        type: '',
        msg: ''
    });


    const _submitButtonClicked = async (e) => {
        e.preventDefault();
        if (sending) return;

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
            setSending(true);
            try {
                const response = await fetch('https://mail-turnstile.tony1994217.workers.dev/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        subject: `Portfolio Contact from ${name.trim()}`,
                        message: mesage.trim(),
                    }),
                });

                if (!response.ok) throw new Error('Contact request failed');

                setFlashOptions({
                    open: true,
                    type: 'success',
                    msg: t('Message sent successfully.'),
                });
                setName('');
                setEmail('');
                setMessage('');
                setErrors([]);
                setIsValidEmail(true);
            } catch (error) {
                setFlashOptions({
                    open: true,
                    type: 'error',
                    msg: t('Unable to send message. Please try again.'),
                });
            } finally {
                setSending(false);
            }
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
                    id="email" value={email}
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
            <Box className="contact-map-footer" sx={{  width: '100%', height: '25%' }}>
                <Box className="contact-map-stage">
                <GoogleMap 
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                width={'100%'} 
                height={'100%'}
                center={{
                    lat: 53.4615823,
                    lng: -2.1179265
                }}
                zoom={10}
                options={{
                    disableDefaultUI: true
                }}
                />
                <ContactMapOverlayView />
                </Box>
                <Link href="#" underline="none" onClick={_submitButtonClicked}>
                    <ThemeProvider theme={SpeedDialTheme}>
                        <Tooltip title={sending ? t('Sending...') : t('Submit')} placement="bottom" arrow>
                            <SpeedDial
                                ariaLabel={sending ? t('Sending...') : t('Submit')}
                                direction="down"
                                disabled={sending}
                                hidden={!isScrollEnd}
                                sx={{ position: 'absolute', bottom: (height * 0.25) - (iOS ? 20 : 40), right: 30 }}
                                icon={<SpeedDialIcon icon={<SendRoundedIcon />} />}
                            />
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
