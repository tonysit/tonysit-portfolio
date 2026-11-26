import * as React from 'react';
import { Dialog, IconButton, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from '../../hooks/useWindowDimensions';
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
    logoBackground: '#01153C',
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
    logoBackground: '#FFFFFF',
    logoShape: 'square',
    technologies: ['Java', 'Objective-C', 'Backend APIs'],
    highlights: [
      'Maintained a customised CMS for JLL Hong Kong internal business operations.',
      'Developed employee-facing features for the PM Link App.',
      'Used Java, Objective-C and backend API integrations.',
    ],
  },
];

const ProjectCard = ({ project, index, compact, onOpen, t }) => {
  const openDetails = () => onOpen(project);
  const handleKeyDown = (event) => {
    if (compact && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openDetails();
    }
  };

  return (
    <article
      className="project-card"
      role={compact ? 'button' : undefined}
      tabIndex={compact ? 0 : undefined}
      aria-label={compact ? `Project ${index + 1} / ${projects.length}: ${t(project.title)}` : undefined}
      aria-roledescription={compact ? 'slide' : undefined}
      onClick={compact ? openDetails : undefined}
      onKeyDown={compact ? handleKeyDown : undefined}
    >
      <div className="project-logo-panel" style={{ backgroundColor: project.logoBackground }}>
        <img
          className={`project-logo${project.logoShape === 'square' ? ' project-logo-square' : ''}`}
          src={project.logo}
          alt={`${project.company} logo`}
        />
      </div>
      <div className="project-card-content">
        <header className="project-card-header">
          <div className="project-heading">
            {compact ? (
              <Typography className="project-company" component="span">
                {t(project.company)}
              </Typography>
            ) : (
              <a
                className="project-company-link"
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(project.websiteLabel)}
                onClick={(event) => event.stopPropagation()}
              >
                <Typography className="project-company" component="span">
                  {t(project.company)}
                </Typography>
                <LanguageRoundedIcon aria-hidden="true" />
              </a>
            )}
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
              aria-haspopup={compact ? 'dialog' : undefined}
              aria-expanded={compact ? undefined : false}
              onClick={(event) => {
                event.stopPropagation();
                if (compact) openDetails();
              }}
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
  );
};

const ProjectSectionView = ({ sectionRef }) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const compact = width < 900;
  const [activeProjectIndex, setActiveProjectIndex] = React.useState(0);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const touchStart = React.useRef(null);

  const showPreviousProject = () => setActiveProjectIndex((index) => Math.max(0, index - 1));
  const showNextProject = () => setActiveProjectIndex((index) => Math.min(projects.length - 1, index + 1));

  const handleProjectTouchStart = (event) => {
    if (!compact) return;
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleProjectTouchEnd = (event) => {
    if (!compact || !touchStart.current) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touchStart.current.x - touch.clientX;
    const deltaY = touchStart.current.y - touch.clientY;
    touchStart.current = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX > 0) showNextProject();
    else showPreviousProject();
  };

  const handleProjectKeyDown = (event) => {
    if (!compact || event.target !== event.currentTarget) return;
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
          aria-roledescription={compact ? 'carousel' : undefined}
          tabIndex={compact ? 0 : undefined}
          onKeyDown={handleProjectKeyDown}
          onTouchStart={handleProjectTouchStart}
          onTouchEnd={handleProjectTouchEnd}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          <div
            className="project-carousel-track"
            style={{ '--project-slide-offset': `-${activeProjectIndex * 100}%` }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                compact={compact}
                onOpen={setSelectedProject}
                t={t}
              />
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
          <span className="project-carousel-count" aria-live="polite">
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
      <Dialog
        fullScreen
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        PaperProps={{ className: 'project-details-dialog' }}
      >
        {selectedProject && (
          <div className="project-details-dialog-scroll">
            <div className="project-details-dialog-shell">
              <header className="project-details-dialog-header">
                <div>
                  <Typography className="project-company" component="p">
                    {t(selectedProject.company)}
                  </Typography>
                  <Typography className="project-title" component="h2">
                    {t(selectedProject.title)}
                  </Typography>
                </div>
                <IconButton
                  className="project-details-dialog-close"
                  aria-label={t('Close project details')}
                  onClick={() => setSelectedProject(null)}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </header>
              <Typography className="project-details-dialog-summary" component="p">
                {t(selectedProject.summary)}
              </Typography>
              <ul className="project-highlights project-details-dialog-highlights">
                {selectedProject.highlights.map((highlight) => (
                  <li key={highlight}>{t(highlight)}</li>
                ))}
              </ul>
              <div className="project-technologies" aria-label={t('Technologies')}>
                {selectedProject.technologies.map((technology) => (
                  <span className="project-technology" key={technology}>{technology}</span>
                ))}
              </div>
              <a className="project-details-website" href={selectedProject.website} target="_blank" rel="noopener noreferrer">
                {t(selectedProject.websiteLabel)}
                <LanguageRoundedIcon aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default ProjectSectionView;
