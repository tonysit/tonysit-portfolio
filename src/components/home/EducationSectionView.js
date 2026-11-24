import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import ouhkLogo from '../../assets/image/ouhk-white-logo.png';
import iveLogo from '../../assets/image/ive-white-logo.png';

const education = [
  {
    institution: 'The Open University of Hong Kong',
    qualification: 'Bachelor of Computing',
    level: "Bachelor's Degree",
    period: '2018 - 2021',
    logo: ouhkLogo,
    url: 'https://www.hkmu.edu.hk/',
  },
  {
    institution: 'Hong Kong Institute of Vocational Education',
    qualification: 'Higher Diploma in Software Engineering',
    level: 'Higher Diploma',
    period: '2014 - 2016',
    logo: iveLogo,
    url: 'https://www.ive.edu.hk/en/campus/tsing-yi',
  },
];

const EducationSectionView = () => {
  const { t } = useTranslation();

  return (
    <div className="education-content">
      <Typography className="education-summary" component="p">
        {t("Academic studies in computing, progressing from a Higher Diploma to a Bachelor's degree.")}
      </Typography>
      <div className="education-list">
        {education.map(({ institution, qualification, level, period, logo, url }) => (
          <article className="education-card" key={institution}>
            <img className="education-logo" src={logo} alt={`${institution} logo`} loading="lazy" />
            <div className="education-details">
              <span className="education-level">{t(level)}</span>
              <Typography className="education-institution" component="h3">
                {t(institution)}
              </Typography>
              <Typography className="education-qualification" component="p">
                {t(qualification)}
              </Typography>
              <Typography className="education-period" component="p">
                {period}
              </Typography>
            </div>
            <Button
              className="education-link"
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
            >
              {t('Visit school website')}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EducationSectionView;
