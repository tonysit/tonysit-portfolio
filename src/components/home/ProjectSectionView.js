import * as React from 'react';
import { IconButton, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useTranslation } from 'react-i18next';
import jebsenLogo from '../../assets/image/jebsen-logo.svg';
import jllLogo from '../../assets/image/jll-pmlink-launchscreen.png';

const projects = [
  {
    id: 'jebsen',
    company: 'Jebsen Beverage',
    title: 'Enterprise Management System',
    summary: 'An integrated system with a web CMS, backend APIs and employee mobile apps for rosters and internal operations.',
    website: 'https://www.jebsen.com/',
    websiteLabel: 'Visit Jebsen website',
    logo: jebsenLogo,
    technologies: ['React Native', 'Android', 'PHP Laravel', 'React.js'],
    highlights: [
      'Designed, developed and deployed a platform with a web CMS, backend API and employee mobile apps.',
      'Built a React.js CMS for employee rosters, reports and operations, plus Laravel APIs for web, mobile and business services.',
      'Developed React Native apps for iOS and Android to manage work rosters, and integrated Microsoft Dynamics 365 APIs.',
      'Deployed on AWS EC2 with Docker Compose and manually triggered GitHub Actions workflows through VPN.',
    ],
  },
  {
    id: 'jll-pmlink',
    company: 'JLL Hong Kong',
    title: 'PM Link App',
    summary: 'Employee app and customised CMS for JLL Hong Kong internal business operations.',
    website: 'https://www.jll.com/en-hk/',
    websiteLabel: 'Visit JLL website',
    logo: jllLogo,
    logoShape: 'square',
    technologies: ['Java', 'Objective-C', 'Backend APIs'],
    highlights: [
      'Maintained a customised CMS for JLL Hong Kong internal business operations.',
      'Developed employee-facing features for the PM Link App.',
      'Used Java, Objective-C and backend API integrations.',
    ],
  },
];

const ProjectSectionView = ({ sectionRef }) => {
  const { t } = useTranslation();
  const [activeProjectIndex, setActiveProjectIndex] = React.useState(0);

  const showPreviousProject = () => {
    setActiveProjectIndex((index) => Math.max(0, index - 1));
  };

  const showNextProject = () => {
    setActiveProjectIndex((index) => Math.min(projects.length - 1, index + 1));
  };

  const handleProjectKeyDown = (event) => {
    if (window.innerWidth >= 900 || event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPreviousProject();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNextProject();
    }
  };

  return (
    <div id="projects" className="section">
      <Toolbar />
      <div ref={sectionRef}></div>
      <Typography variant="h2" gutterBottom component="div" color="common.white" style={{ fontWeight: 500, marginBottom: 0 }}>
        {t('Projects')}
      </Typography>
      <div className="project-content">
        <div
          className="project-carousel-viewport"
          role="group"
          aria-label={t('Projects')}
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleProjectKeyDown}
        >
          <div
            className="project-carousel-track"
            style={{ '--project-slide-offset': `-${activeProjectIndex * 100}%` }}
          >
            {projects.map((project, index) => (
              <article
                className="project-card"
                key={project.id}
                aria-label={`Project ${index + 1} / ${projects.length}: ${t(project.title)}`}
                aria-roledescription="slide"
              >
            <div className="project-logo-panel">
              <img
                className={`project-logo${project.logoShape === 'square' ? ' project-logo-square' : ''}`}
                src={project.logo}
                alt={`${project.company} logo`}
              />
            </div>
            <div className="project-card-content">
              <header className="project-card-header">
                <div className="project-heading">
                  <a
                    className="project-company-link"
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(project.websiteLabel)}
                  >
                    <Typography className="project-company" component="span">
                      {t(project.company)}
                    </Typography>
                    <LanguageRoundedIcon aria-hidden="true" />
                  </a>
                  <Typography className="project-title" component="h3">
                    {t(project.title)}
                  </Typography>
                </div>
              </header>
              <Typography className="project-summary" component="p">
                {t(project.summary)}
              </Typography>
              <div className="project-card-footer">
                <div className="project-technologies" aria-label={t('Technologies')}>
                  {project.technologies.map((technology) => (
                    <span className="project-technology" key={technology}>{technology}</span>
                  ))}
                </div>
                <div className="project-details-popover">
                  <button
                    className="project-details-trigger"
                    type="button"
                    aria-label={t('View project details')}
                    aria-describedby={`project-details-${project.id}`}
                  >
                    !
                  </button>
                  <div className="project-details-tooltip" id={`project-details-${project.id}`} role="tooltip">
                    <ul className="project-highlights">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{t(highlight)}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
              </article>
            ))}
          </div>
        </div>
        <div className="project-carousel-controls" aria-label={t('Project carousel controls')}>
          <IconButton
            className="project-carousel-button"
            aria-label={t('Previous project')}
            disabled={activeProjectIndex === 0}
            onClick={showPreviousProject}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
          <span className="project-carousel-count">
            {activeProjectIndex + 1} / {projects.length}
          </span>
          <IconButton
            className="project-carousel-button"
            aria-label={t('Next project')}
            disabled={activeProjectIndex === projects.length - 1}
            onClick={showNextProject}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectSectionView;
