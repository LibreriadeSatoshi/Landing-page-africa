import { useState } from 'react';
import { Mail, Twitter, MessageCircle, Globe, BookOpen } from 'lucide-react';
import './UnifiedFooter.css';

interface UnifiedFooterProps {
  onNewsletterSubmit?: (email: string) => void;
}

export default function UnifiedFooter({ onNewsletterSubmit }: UnifiedFooterProps) {
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

  return (
    <footer className="unified-footer">
      <div className="footer-content">
        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-container">
            <div className="newsletter-text">
              <h3>Stay updated on Bitcoin education across Africa</h3>
              <p>
                Get updates on new programs, ambassador stories, and resources delivered to your
                inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="email-input"
                />
                <button type="submit" className="subscribe-btn">
                  <Mail size={16} />
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="success-message">Thanks for subscribing! Check your email.</p>
              )}
              <p className="consent-text">
                We respect your privacy. Unsubscribe anytime.
                <a href="#"> Privacy Policy</a>
              </p>
            </form>
          </div>
        </section>

        {/* Main Footer Grid */}
        <section className="footer-grid">
          <div className="footer-column">
            <h4 className="footer-title">Program</h4>
            <ul className="footer-links">
              <li>
                <a href="#program">Learners</a>
              </li>
              <li>
                <a href="#program">Educators</a>
              </li>
              <li>
                <a href="#program">Partners</a>
              </li>
              <li>
                <a href="#apply" className="cta-link">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Learn</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Bitcoin Basics</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://libreria.bitcoin.education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Librería de Satoshi
                </a>
              </li>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="mailto:ambassadors@africabitcoineducation.org">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Connect</h4>
            <div className="social-links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Globe size={20} />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <BookOpen size={20} />
              </a>
            </div>
            <div className="social-text">
              <p>Join our community across Africa and stay connected.</p>
            </div>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              <strong>Africa Bitcoin Education</strong> — Building technical fluency across Africa
              in every language.
            </p>
            <p className="copyright">
              © {new Date().getFullYear()} Africa Bitcoin Education. All rights reserved.
            </p>
          </div>
          <div className="footer-bottom-right">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Code of Conduct</a>
          </div>
        </section>
      </div>
    </footer>
  );
}
