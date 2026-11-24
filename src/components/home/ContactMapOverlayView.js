import * as React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslation } from 'react-i18next';
import locationIcon from '../../assets/image/contact-location.png';
import messageIcon from '../../assets/image/contact-message.png';
import selectIcon from '../../assets/image/contact-select.png';
import telephoneIcon from '../../assets/image/contact-telephone.png';
import gitHubIcon from '../../assets/image/social-github.svg';
import leetCodeIcon from '../../assets/image/social-leetcode.svg';

const ContactMapOverlayView = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-map-overlay" aria-label={t('Contact details')}>
      <div className="contact-map-info">
        <div className="contact-map-details">
          <div className="contact-map-row contact-map-status">
            <span className="contact-status-dot" aria-hidden="true" />
            <span>{t('Open for opportunities')}: {t('Yes')}</span>
          </div>
          <a className="contact-map-row" href="tel:+447831488346">
            <img src={telephoneIcon} alt="" aria-hidden="true" />
            <span>{t('Phone')}: +44 7831 488346</span>
          </a>
          <div className="contact-map-row">
            <img src={locationIcon} alt="" aria-hidden="true" />
            <span>{t('Location')}: {t('United Kingdom')}</span>
          </div>
          <div className="contact-map-row">
            <img src={selectIcon} alt="" aria-hidden="true" />
            <span>{t('Right to work')}: {t('Eligible to work in the UK')}</span>
          </div>
        </div>
      </div>

      <nav className="contact-social-links" aria-label={t('Social profiles')}>
        <a className="contact-social-link" href="https://www.linkedin.com/in/tony1994217/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon color="inherit" aria-hidden="true" />
        </a>
        <a className="contact-social-link" href="mailto:tony1994217@gmail.com" aria-label="Email">
          <img src={messageIcon} alt="" />
        </a>
        <a className="contact-social-link" href="https://github.com/tonysit" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <img src={gitHubIcon} alt="" />
        </a>
        <a className="contact-social-link" href="https://leetcode.com/u/tony1994217/" aria-label="LeetCode" target="_blank" rel="noopener noreferrer">
          <img src={leetCodeIcon} alt="" />
        </a>
      </nav>
    </section>
  );
};

export default ContactMapOverlayView;
