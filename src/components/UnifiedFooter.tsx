import { useState } from 'react';
import { Mail, Twitter, MessageCircle, Globe, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './UnifiedFooter.css';

interface UnifiedFooterProps {
  onNewsletterSubmit?: (email: string) => void;
}

export default function UnifiedFooter({ onNewsletterSubmit }: UnifiedFooterProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onNewsletterSubmit?.(email);
      setEmail('');
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="unified-footer">
      <div className="footer-content">
        <section className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-text">
              <h3>{t('unifiedFooter.newsletterTitle')}</h3>
              <p>{t('unifiedFooter.newsletterDescription')}</p>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder={t('unifiedFooter.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  <Mail size={16} />
                  {t('unifiedFooter.subscribe')}
                </button>
              </div>
              {subscribed && (
                <p className="success-message">{t('unifiedFooter.subscribeSuccess')}</p>
              )}
              <p className="consent-text">
                {t('unifiedFooter.consent')}
                <a href="#"> {t('unifiedFooter.privacyPolicy')}</a>
              </p>
            </form>
          </div>
        </section>

        <section className="footer-grid">
          <div className="footer-column">
            <h4 className="footer-title">{t('unifiedFooter.columnProgram')}</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">{t('unifiedFooter.linkLearners')}</a>
              </li>
              <li>
                <a href="#about">{t('unifiedFooter.linkEducators')}</a>
              </li>
              <li>
                <a href="#about">{t('unifiedFooter.linkPartners')}</a>
              </li>
              <li>
                <a href="#apply" className="cta-link">
                  {t('unifiedFooter.linkApplyNow')}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('unifiedFooter.columnLearn')}</h4>
            <ul className="footer-links">
              <li>
                <a href="#">{t('unifiedFooter.linkBitcoinBasics')}</a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkResources')}</a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkBlog')}</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('unifiedFooter.columnExplore')}</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://libreria.bitcoin.education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('unifiedFooter.linkLibreria')}
                </a>
              </li>
              <li>
                <a href="#">{t('unifiedFooter.linkDocumentation')}</a>
              </li>
              <li>
                <a href="#faq">{t('unifiedFooter.linkFaq')}</a>
              </li>
              <li>
                <a href="mailto:ambassadors@africabitcoineducation.org">
                  {t('unifiedFooter.linkContact')}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('unifiedFooter.columnConnect')}</h4>
            <div className="social-links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaTwitter')}
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaTelegram')}
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaYoutube')}
              >
                <Globe size={20} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('unifiedFooter.ariaDiscord')}
              >
                <BookOpen size={20} />
              </a>
            </div>
            <div className="social-text">
              <p>{t('unifiedFooter.connectBlurb')}</p>
            </div>
          </div>
        </section>

        <section className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              <strong>{t('unifiedFooter.bottomLead')}</strong> — {t('unifiedFooter.bottomTagline')}
            </p>
            <p className="copyright">{t('unifiedFooter.copyright', { year })}</p>
          </div>
          <div className="footer-bottom-right">
            <a href="#">{t('unifiedFooter.legalPrivacy')}</a>
            <a href="#">{t('unifiedFooter.legalTerms')}</a>
            <a href="#">{t('unifiedFooter.legalConduct')}</a>
          </div>
        </section>
      </div>
    </footer>
  );
}
