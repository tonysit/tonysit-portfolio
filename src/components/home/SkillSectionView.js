import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import RightIcon from '@mui/icons-material/ArrowCircleRight';
import LeftIcon from '@mui/icons-material/ArrowCircleLeft';
import IconButton from '@mui/material/IconButton';

import Styles from '../../styles/Styles';
import useAnimateNumber from '../../hooks/useAnimateNumber';
import useWindowScroll from '../../hooks/useWindowScroll';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Variables from '../../configs/Variables';

const FrontEndSkills = [
    { name: 'React Native', value: 90 },
    { name: 'Java', value: 80 },
    { name: 'Objective C', value: 70 },
    { name: 'JavaScript', value: 90 },
    { name: 'React.js', value: 90 },
];

const BackEndSkills = [
    { name: 'PHP Laravel', value: 95 },
    { name: 'Node.js', value: 75 },
];

const Cards = [
    { 
        img: require('../../assets/image/card_v1.jpg').default, 
        title: 'Infrastructure & Tools', 
        content: 'Git, GitHub Actions, Docker, AWS, Firebase, Linux, Nginx, Apache, MySQL, MongoDB, Redis' 
    },
    { 
        img: require('../../assets/image/card_v2.jpg').default, 
        title: 'Languages', 
        content: 'Cantonese (native), Mandarin (fluent), English (proficient, B2 / upper-intermediate).' 
    }
];

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: Styles.textColor,
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component="div">{children}</Typography>
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

  

export default () => {
    const { t } = useTranslation();
    const { offset } = useWindowScroll('.scroll-container');
    const { height, width } = useWindowDimensions();
    const isFirstSection = offset < height * 0.5;
    const boxSize = ( width * 0.9 ) / 5;

    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [cardIndex, setCardIndex] = React.useState(0);
    let progressRef = React.useRef(null);
    if(!Array.isArray(progressRef.current)){
        progressRef.current = [];
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        const refs = progressRef.current;
        refs.forEach((callback) => callback());
        setValue(index);
    };

    const isMobile = width <= Variables.mobileScreenWidth;
    const cardWidth = ( width / ( isMobile ? 1 : 2 ) ) - 80;
    const isNextCard = width <= 500 && cardIndex === 0 && Array.isArray(Cards) && cardIndex < Cards.length;
    const isPreviousCard = isMobile && cardIndex - 1 >= 0;

    return (
        <React.Fragment>
            <Toolbar />

            <Box sx={{  width: '100%' }}>
                <Tabs
                value={value}
                onChange={handleChange}
                aria-label="disabled tabs example"
                variant="fullWidth"
                textColor="secondary"
                indicatorColor="secondary"
                >
                    <Tab label={t('Front-end')} />
                    <Tab label={t('Back-end')} />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Box sx={{ width: '100%' }}>
                            <h2 style={{color: Styles.infoColor, paddingBottom: isMobile ? 0 : 5}}>{t('Front-end')}</h2>
                            {
                                Array.isArray(FrontEndSkills) && FrontEndSkills.map((item, index) => {
                                    const [progress, setProgress] = useAnimateNumber(item.value, !isFirstSection, FrontEndSkills.length - index);
                                    progressRef.current.push(() => setProgress(item.value));
                                    return (
                                        <Box key={index} sx={{ paddingTop: isMobile ? 1 : 2, paddingBottom: isMobile ? 1 : 2 }}>
                                            <h5 style={{color: Styles.textColor}}>{t(item.name)}</h5>
                                            <BorderLinearProgress variant="determinate" value={progress} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Box sx={{ width: '100%', marginTop: 5 }}>
                            <h2 style={{color: Styles.infoColor, paddingBottom: 0 ? 0 : 5}}>{t('Back-end')}</h2>
                            {
                                Array.isArray(BackEndSkills) && BackEndSkills.map((item, index) => {
                                    const [progress, setProgress] = useAnimateNumber(item.value, !isFirstSection, BackEndSkills.length - index);

                                    return (
                                        <Box key={index} sx={{ paddingTop: isMobile ? 1 : 2, paddingBottom: isMobile ? 1 : 2 }}>
                                            <h5 style={{color: Styles.textColor}}>{t(item.name)}</h5>
                                            <BorderLinearProgress variant="determinate" value={progress} />
                                        </Box>
                                    );
                                })
                            }
                        </Box>
                    </TabPanel>
                </SwipeableViews>
            </Box>

            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 4,
                },
            }}
            >
                {
                    Array.isArray(Cards) && Cards.map((item, index) => {
                        if(width <= Variables.mobileScreenWidth && index != cardIndex){
                            return null;
                        }else{
                            return (
                                <Card key={index} sx={{ width: cardWidth }}>
                                    <CardMedia
                                        component="img"
                                        height={isMobile ? 0 : 140}
                                        image={item.img}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {t(item.title)}
                                        </Typography>
                                        <Typography component="div" variant="body2" color="text.secondary">
                                        {t(item.content)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions style={{display: "flex", justifyContent: isNextCard ? "flex-end" : "flex-start"}}>
                                        {
                                            isNextCard &&
                                            <IconButton aria-label="next" onClick={() => setCardIndex((preCardIndex) => preCardIndex+1)}>
                                                <RightIcon />
                                            </IconButton>
                                        }
                                        {
                                            isPreviousCard &&
                                            <IconButton aria-label="previous" onClick={() => setCardIndex((preCardIndex) => preCardIndex-1)}>
                                                <LeftIcon />
                                            </IconButton>
                                        }
                                    </CardActions>
                                </Card>
                            );
                        }
                    })
                }
            </Box>
        </React.Fragment>
    );
}