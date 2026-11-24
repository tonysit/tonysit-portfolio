import * as React from 'react';
import { Button, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import jebsenLogo from '../../assets/image/jebsen-logo.svg';

const technologies = [
  'PHP Laravel',
  'React.js',
  'React Native',
  'Microsoft Dynamics 365',
  'AWS EC2',
  'Docker Compose',
  'GitHub Actions',
];

const ProjectSectionView = ({ sectionRef }) => {
  const { t } = useTranslation();

  return (
    <div id="projects" className="section">
      <Toolbar />
      <div ref={sectionRef}></div>
      <Typography variant="h2" gutterBottom component="div" color="common.white" style={{ fontWeight: 500, marginBottom: 0 }}>
        {t('Projects')}
      </Typography>
      <div className="project-content">
        <article className="project-card">
          <header className="project-card-header">
            <div className="project-brand">
              <img className="project-logo" src={jebsenLogo} alt="Jebsen logo" />
              <div>
                <Typography className="project-company" component="p">
                  {t('Jebsen Beverage')}
                </Typography>
                <Typography className="project-title" component="h3">
                  {t('Enterprise Management System')}
                </Typography>
              </div>
            </div>
            <Button
              className="project-link"
              component="a"
              href="https://www.jebsen.com/"
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
            >
              {t('Visit Jebsen website')}
            </Button>
          </header>
          <Typography className="project-summary" component="p">
            {t('An integrated system with a web CMS, backend APIs and employee mobile apps for rosters and internal operations.')}
          </Typography>
          <ul className="project-highlights">
            <li>{t('Designed, developed and deployed a platform with a web CMS, backend API and employee mobile apps.')}</li>
            <li>{t('Built a React.js CMS for employee rosters, reports and operations, plus Laravel APIs for web, mobile and business services.')}</li>
            <li>{t('Developed React Native apps for iOS and Android to manage work rosters, and integrated Microsoft Dynamics 365 APIs.')}</li>
            <li>{t('Deployed on AWS EC2 with Docker Compose and manually triggered GitHub Actions workflows through VPN.')}</li>
          </ul>
          <div className="project-technologies" aria-label={t('Technologies')}>
            {technologies.map((technology) => (
              <span className="project-technology" key={technology}>{technology}</span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectSectionView;
