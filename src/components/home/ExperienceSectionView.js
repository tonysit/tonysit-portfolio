import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import playMoreIcon from '../../assets/image/playmore-icon.png';
import threeDPlusIcon from '../../assets/image/3d-plus-icon.png';
import smartKiddoIcon from '../../assets/image/smart-kiddo-logo.jpg';

const experiences = [
  {
    company: 'PlayMore Limited',
    role: 'Software Developer',
    period: 'Nov 2017 - Nov 2026',
    location: 'Hong Kong',
    logo: playMoreIcon,
    url: 'https://playmore.com.hk/',
    linkLabel: 'Visit company website',
    highlights: [
      'Developed business applications, employee apps and backend systems for Jebsen Beverage, HKTDC and JLL Hong Kong.',
      'Built PHP Laravel APIs, React.js CMS platforms and React Native apps, connecting web, mobile and backend services.',
      'Supported live systems and deployments with SQL/MySQL, Linux scripts, AWS EC2, Docker Compose and GitHub Actions; investigated and released fixes.',
      'Worked with clients and teams on requirements, estimates, user support and delivery.',
    ],
  },
  {
    company: '3D Plus Limited',
    role: 'Application Programmer',
    period: '2016 - 2017',
    location: 'Hong Kong',
    logo: threeDPlusIcon,
    highlights: [
      'Developed 3D mobile applications for entertainment and supporting web pages and server-side features.',
      'Maintained specifications, change records and version histories while managing concurrent tasks to deadlines.',
    ],
  },
  {
    company: 'Smart Kiddo Education Limited',
    role: 'Tutor (Part-time)',
    period: '2015 - 2016',
    location: 'Hong Kong',
    logo: smartKiddoIcon,
    url: 'https://www.facebook.com/smartkiddoeducation',
    linkLabel: 'View Facebook page',
    highlights: [
      'Delivered robotics and technology programmes to students with different learning needs.',
      'Monitored progress and adapted teaching approaches using constructive feedback.',
    ],
  },
];

const ExperienceSectionView = () => {
  const { t } = useTranslation();

  return (
    <div className="experience-content">
      <Typography className="experience-summary" component="p">
        {t('Experience across web, mobile and backend development, production support, deployment and technical education.')}
      </Typography>
      <div className="experience-list">
        {experiences.map(({ company, role, period, location, logo, url, linkLabel, highlights }, index) => (
          <article
            className={`experience-card${index === 0 ? ' experience-card-featured' : ''}`}
            key={company}
          >
            <header className="experience-card-header">
              <div className="experience-heading">
                {logo && <img className="experience-logo" src={logo} alt={`${company} logo`} loading="lazy" />}
                <div>
                  <Typography className="experience-company" component="h3">
                    {t(company)}
                  </Typography>
                  <Typography className="experience-role" component="p">
                    {t(role)}
                  </Typography>
                </div>
              </div>
              <time className="experience-period">{period}</time>
            </header>
            <Typography className="experience-location" component="p">
              {t(location)}
            </Typography>
            <ul className="experience-highlights">
              {highlights.map((highlight) => (
                <li key={highlight}>{t(highlight)}</li>
              ))}
            </ul>
            {url && (
              <Button
                className="experience-link"
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
              >
                {t(linkLabel)}
              </Button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSectionView;
