import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import { Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';

import '../../styles/HomeComponent.scss';
import DispatchContext from '../../contexts/DispatchContext';
import StateContext from '../../contexts/StateContext';
import videoLanding from '../../assets/video/landing.mp4';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import SkillSectionView from './SkillSectionView';
import EducationSectionView from './EducationSectionView';
import ExperienceSectionView from './ExperienceSectionView';
import ContactSectionView from './ContactSectionView';
import Typewriter from '../common/Typewriter';
import useIsVisible from '../../hooks/useIsVisible';

const HomeComponent = () => {

  // use context section
  const contextDispatch = React.useContext(DispatchContext);
  const contextState = React.useContext(StateContext);

  // use redux section
  const dispatch = useDispatch();
  const { count, section } = useSelector(state => {
    return {
      count: state.home.count,
      section: state.home.section
    };
  });
  console.log('useSelector: ', count, section);

  // use state section
  const [landingHeaderWidth, setLandingHeaderWidth] = React.useState(0);
  const [openLandingHeader, setOpenLandingHeader] = React.useState(false);

  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const skillsRef = React.useRef();
  const educationRef = React.useRef();
  const experiencesRef = React.useRef();
  const projectsRef = React.useRef();
  const contactRef = React.useRef();
  const isVisibleSkills = useIsVisible(skillsRef);
  const isVisibleEducation = useIsVisible(educationRef);
  const isVisibleExperiences = useIsVisible(experiencesRef);
  const isVisibleProjects = useIsVisible(projectsRef);
  const isVisibleContact = useIsVisible(contactRef);
  React.useEffect(() => {
    let payload = 'index';
    if(isVisibleSkills){
      payload = 'skills';
    }else if(isVisibleEducation){
      payload = 'education';
    }else if(isVisibleExperiences){
      payload = 'experiences';
    }else if(isVisibleProjects){
      payload = 'projects';
    }else if(isVisibleContact){
      payload = 'contact';
    }else{
      payload = 'index';
    }
    dispatch({ type: 'SET_SECTION', payload });
  }, [isVisibleSkills, isVisibleEducation, isVisibleExperiences, isVisibleProjects, isVisibleContact]);


  React.useEffect(() => {
    setTimeout(() => {
      setLandingHeaderWidth(document.getElementById('landing-header').offsetWidth);
      setOpenLandingHeader(true);
    }, 500)
  }, []);

  console.log("left", landingHeaderWidth)

  return (
    <div className="scroll-container">
      {/* <Toolbar /> */}
      <div className="section">
        <video id="landing-video" className='landing-video' autoPlay loop muted playsInline preload="auto">
          <source src={videoLanding} type='video/mp4' />
        </video>
        <div
        id="landing-header"
        className="viewport-header"
        style={{ 
          left: landingHeaderWidth ? ( ( width / 2 ) - ( landingHeaderWidth / 2 ) ) : 0,
          opacity: openLandingHeader ? 1 : 0,
        }}
        >
          <Typography variant="h2" gutterBottom component="div" color="common.white" style={{fontWeight: 500, marginBottom: 0}}>{t('On Wa Sit')}</Typography>
          <hr className="divider" />
          <Typography variant="h6" gutterBottom component="div" color="common.white" style={{fontWeight: 500}}>
            <Typewriter text={t('Mobile Application Developer ')} delay={100} />
            <span className="blink" style={{ color: "white" }}>{t('_')}</span>
          </Typography>
        </div>
      </div>
      <div id="skills" className="section">
        <div ref={skillsRef}></div>
        <SkillSectionView />
      </div>
      <div id="education" className="section">
        <Toolbar />
        <div ref={educationRef}></div>
        <Typography variant="h2" gutterBottom component="div" color="common.white" style={{fontWeight: 500, marginBottom: 0}}>{t('Education')}</Typography>
        <EducationSectionView />
      </div>
      <div id="experiences" className="section">
        <Toolbar />
        <div ref={experiencesRef}></div>
        <Typography variant="h2" gutterBottom component="div" color="common.white" style={{fontWeight: 500, marginBottom: 0}}>{t('Experiences')}</Typography>
        <ExperienceSectionView />
      </div>
      <div id="projects" className="section">
        <Toolbar />
        <div ref={projectsRef}></div>
        <Typography variant="h2" gutterBottom component="div" color="common.white" style={{fontWeight: 500, marginBottom: 0}}>{t('Projects')}</Typography>
      </div>
      <div id="contact" className="section">
        <ContactSectionView />
        <div ref={contactRef}></div>
      </div>
    </div>
  );
}

export default HomeComponent;
