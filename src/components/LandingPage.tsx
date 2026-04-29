import { useState } from 'react';
import './LandingPage.css';
import UnifiedFooter from './UnifiedFooter';

type AudienceTab = 'learners' | 'teachers' | 'partners';

type FaqItem = {
  question: string;
  answer: string;
};

type LandingPageProps = {
  onApply?: () => void;
};

const faqItems: FaqItem[] = [
  {
    question: 'What is Bitcoin, and why does it matter for Africa?',
    answer:
      'Bitcoin is a digital currency that allows you to send and receive money without banks or intermediaries. It runs on a decentralized network called blockchain, where transactions are verified worldwide and recorded on a public ledger that no single entity controls. For Africa, where millions lack access to traditional banking, Bitcoin represents financial infrastructure that belongs to everyone.',
  },
  {
    question: 'Do I need prior Bitcoin or tech experience?',
    answer:
      'No. The program is designed for motivated learners starting from zero. What matters is your commitment to showing up, studying 10–20 hours per week by yourself, and your willingness to eventually share what you learn with your community.',
  },
  {
    question: 'Is the program really free?',
    answer:
      "Yes, completely free for all learners. Our mission is to remove every barrier to quality education. Cost should never be one of them. The program is funded through grants and the Bitcoin ecosystem's support for open education.",
  },
  {
    question: 'Why do I need to speak two languages?',
    answer:
      "The core of this program is localization, making Bitcoin education accessible to communities that don't speak English. Ambassadors who are fluent in at least two languages (English included) can bridge that gap for the next cohort. The bilingual requirement is not a barrier; it's your superpower in this network.",
  },
  {
    question: 'What happens after I complete the program?',
    answer:
      'Top graduates are identified through assessments and peer performance. Those who show educator-readiness are invited to lead their own cohort of 8–12 learners in their language, in their community. You receive curriculum support, tutor resources, and compensation ($5–10/hr) for your time. The knowledge compounds from there.',
  },
  {
    question: 'Is Bitcoin legal in my country?',
    answer:
      "Bitcoin's legal status varies by country. In most African countries, Bitcoin is legal to own and use, though regulations differ. Some countries have embraced it, others have restrictions on businesses, and a few have specific bans. Our program teaches you about Bitcoin's technical foundations and how to navigate the regulatory landscape in your region safely.",
  },
];

function LandingPage({ onApply }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<AudienceTab>('learners');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="landing-page-root">
      <nav>
        <a href="#" className="nav-logo">
          Africa Bitcoin<span>.</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#program">Program</a>
          </li>
          <li>
            <a href="#why">Why Africa</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#apply" className="nav-cta">
              Apply Now
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">🌍 Continent-wide · Multilingual · Free</div>
            <h1>
              Learn Bitcoin.
              <br />
              Teach Africa.
              <br />
              <em>In your language.</em>
            </h1>
            <p className="hero-sub">
              Join a structured Bitcoin education network building technical fluency across Africa.
              in the languages people actually think in. Learners become educators. Knowledge
              compounds.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={onApply} className="btn-primary">
                Apply as Ambassador →
              </button>
              <a href="#program" className="btn-outline">
                Explore the Program
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-label">Program at a glance</div>
            <div className="stat-row">
              <div className="stat-item">
                <div className="stat-number">12+</div>
                <div className="stat-label">
                  Countries · Nigeria, Ghana, Cameroon, Cote D'ivoire, Senegal, Togo, Egypt, Kenya,
                  Uganda, Tanzania + more
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5–10</div>
                <div className="stat-label">
                  African languages · Luganda, Kikuyu, Twi, Swahili, French…
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">12 weeks</div>
                <div className="stat-label">
                  Cohort-based program · 90 min/week + 10 hrs reading
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Free</div>
                <div className="stat-label">learn at zero cost</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="program">
        <div className="section-inner">
          <div className="section-label">Who is this for?</div>
          <h2 className="section-title">There's a place for you here</h2>
          <p className="section-sub">
            Whether you want to learn, teach, or scale Bitcoin education, the network is built for
            you.
          </p>

          <div className="tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'learners'}
              aria-controls="tab-learners"
              className={`tab-btn ${activeTab === 'learners' ? 'active' : ''}`}
              onClick={() => setActiveTab('learners')}
            >
              🎒 Learners
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'teachers'}
              aria-controls="tab-teachers"
              className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
              onClick={() => setActiveTab('teachers')}
            >
              🎓 Educators
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'partners'}
              aria-controls="tab-partners"
              className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`}
              onClick={() => setActiveTab('partners')}
            >
              🤝 Partners
            </button>
          </div>

          <div
            className={`tab-panel learners ${activeTab === 'learners' ? 'active' : ''}`}
            id="tab-learners"
            role="tabpanel"
            aria-labelledby="learners-tab"
          >
            <div className="panel-hero learners">
              <div>
                <div className="panel-hero-icon">🌱</div>
                <h3>Start your Bitcoin journey in your language</h3>
                <p>
                  Free, structured Bitcoin education for Africans aged 18–35. Learn blockchain,
                  cryptography, economics, and coding. No prior experience needed, just the drive to
                  understand and the commitment to share.
                </p>
                <button type="button" onClick={onApply} className="btn-teal">
                  Apply as Ambassador →
                </button>
              </div>
              <div>
                <div className="feature-tiles learners">
                  <div className="feature-tile">
                    <div className="tile-label">Commitment</div>
                    <div className="tile-value">90 min/week + 10 hrs reading</div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">What you learn</div>
                    <div className="tile-value">
                      Bitcoin · AI · Cryptography · Economics · Coding
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">Who can apply</div>
                    <div className="tile-value">Ages 18–35 · No experience needed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col learners">
              <div>
                <div className="col-head">Who can apply</div>
                <ul className="check-list">
                  <li>High school, university, or graduate students</li>
                  <li>Anyone eager to learn Bitcoin, no prior knowledge required</li>
                  <li>Willing to share knowledge in your local language</li>
                  <li>Fluent in at least 2 languages (English inclusive)</li>
                  <li>Have reliable internet and a computer or smartphone</li>
                </ul>
              </div>
              <div>
                <div className="col-head">Languages we support</div>
                <div className="pill-row">
                  <span className="pill pill-teal">🇳🇬 English</span>
                  <span className="pill pill-teal">🇫🇷 French</span>
                  <span className="pill pill-teal">Luganda</span>
                  <span className="pill pill-teal">Kikuyu</span>
                  <span className="pill pill-teal">Twi</span>
                  <span className="pill pill-teal">Swahili</span>
                  <span className="pill pill-teal">+ More</span>
                </div>
                <div style={{ marginTop: 24 }}>
                  <div className="col-head">Countries we're active in</div>
                  <div className="pill-row">
                    <span className="pill pill-teal">Nigeria</span>
                    <span className="pill pill-teal">Ghana</span>
                    <span className="pill pill-teal">Kenya</span>
                    <span className="pill pill-teal">Uganda</span>
                    <span className="pill pill-teal">Tanzania</span>
                    <span className="pill pill-teal">+ More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`tab-panel teachers ${activeTab === 'teachers' ? 'active' : ''}`}
            id="tab-teachers"
            role="tabpanel"
            aria-labelledby="teachers-tab"
          >
            <div className="panel-hero teachers">
              <div>
                <div className="panel-hero-icon">🎓</div>
                <h3>Become a certified Bitcoin educator</h3>
                <p>
                  Join our tutor network. Train a cohort of 8–12 learners, localize curriculum into
                  regional languages, and build Africa's next generation of technical Bitcoin
                  educators. Get compensated for your expertise.
                </p>
                <button type="button" onClick={onApply} className="btn-blue">
                  Apply as Tutor →
                </button>
              </div>
              <div>
                <div className="feature-tiles teachers">
                  <div className="feature-tile">
                    <div className="tile-label">Tutor personas</div>
                    <div className="tile-value">
                      SME · Technical SME · Professor · Event Organizer
                    </div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">Cohort size</div>
                    <div className="tile-value">8–12 learners per educator</div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">Support & pay</div>
                    <div className="tile-value">Weekly calls · Curriculum · $5–10/hr</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col teachers">
              <div>
                <div className="col-head">Who should apply</div>
                <ul className="check-list">
                  <li>Bilingual educators and translators</li>
                  <li>High school and university teachers</li>
                  <li>Community organizers running meetups</li>
                  <li>Subject matter experts in Bitcoin or technology</li>
                  <li>Developers keen to share technical knowledge</li>
                </ul>
              </div>
              <div>
                <div className="col-head">Tutor journey</div>
                <ul className="check-list">
                  <li>
                    <strong>Phase 1 - Orientation:</strong> Welcome, platform training, mock
                    teaching session
                  </li>
                  <li>
                    <strong>Phase 2 - Run cohort:</strong> Lead weekly sessions, localize content,
                    bi-weekly check-ins
                  </li>
                  <li>
                    <strong>Phase 3 - Review & grow:</strong> Collect feedback, refine curriculum,
                    mentor next cohort
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`tab-panel partners ${activeTab === 'partners' ? 'active' : ''}`}
            id="tab-partners"
            role="tabpanel"
            aria-labelledby="partners-tab"
          >
            <div className="panel-hero partners">
              <div>
                <div className="panel-hero-icon">🤝</div>
                <h3>Scale Bitcoin education across Africa</h3>
                <p>
                  Co-build a continent-wide, language-first Bitcoin knowledge network. Support
                  curriculum development, events, infrastructure, and ambassador growth across 7+
                  countries.
                </p>
                <a href="mailto:ambassadors@africabitcoineducation.org" className="btn-amber">
                  Explore Partnership →
                </a>
              </div>
              <div>
                <div className="feature-tiles partners">
                  <div className="feature-tile">
                    <div className="tile-label">Our reach</div>
                    <div className="tile-value">7 countries · 12–14 cities · 56+ ambassadors</div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">The opportunity</div>
                    <div className="tile-value">Language-first · Grassroots · Scalable</div>
                  </div>
                  <div className="feature-tile">
                    <div className="tile-label">Core hub</div>
                    <div className="tile-value">Librería de Satoshi - content & expertise</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-col partners">
              <div>
                <div className="col-head">Partnership opportunities</div>
                <ul className="check-list">
                  <li>Curriculum co-development and content sponsorship</li>
                  <li>Event and meetup coordination support</li>
                  <li>Ambassador stipends and infrastructure funding</li>
                  <li>Research, data insights, and co-branding</li>
                  <li>Language localisation and translation partnerships</li>
                </ul>
              </div>
              <div>
                <div className="col-head">Who should partner with us</div>
                <div className="pill-row">
                  <span className="pill pill-amber">NGOs</span>
                  <span className="pill pill-amber">Universities</span>
                  <span className="pill pill-amber">Bitcoin Orgs</span>
                  <span className="pill pill-amber">Tech Companies</span>
                  <span className="pill pill-amber">Grant Funders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="how">
        <div className="section-inner">
          <div className="section-label">The model</div>
          <h2 className="section-title">How the program works</h2>
          <p className="section-sub">
            A structured three-month journey from learner to ambassador to educator.
          </p>

          <div className="how-grid">
            <div className="how-card">
              <div className="how-num">01</div>
              <h4>Cohort-based learning</h4>
              <p>
                Small, focused groups across African countries. Guided sessions with weekly
                check-ins ensure accountability and real progress, not passive watching.
              </p>
            </div>
            <div className="how-card">
              <div className="how-num">02</div>
              <h4>Hands-on technical training</h4>
              <p>
                Practical exercises in Bitcoin fundamentals, cryptography, coding basics, and
                open-source tools. You build real skills, not surface-level familiarity.
              </p>
            </div>
            <div className="how-card">
              <div className="how-num">03</div>
              <h4>Proof-of-work funnel</h4>
              <p>
                Learners advance by passing assessments, not just showing up. Progress is earned,
                which makes the credential mean something.
              </p>
            </div>
            <div className="how-card">
              <div className="how-num">04</div>
              <h4>Localization & language-first</h4>
              <p>
                Bilingual ambassadors translate and contextualize every module. Your cohort learns
                in the language you think in, not the language forced on you.
              </p>
            </div>
            <div className="how-card">
              <div className="how-num">05</div>
              <h4>Learner → Educator pipeline</h4>
              <p>
                Top performers are identified and given the tools, curriculum, and support to lead
                their own cohort. Knowledge compounds, region by region.
              </p>
            </div>
            <div className="how-card">
              <div className="how-num">06</div>
              <h4>Certification & recognition</h4>
              <p>
                Graduates receive an official certificate shareable on LinkedIn, access to the
                educator network, and priority for grant opportunities across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="section-inner">
          <div className="section-label">What you gain</div>
          <h2 className="section-title">Benefits of joining</h2>
          <p className="section-sub">
            This is not a passive course. You leave as a technically literate educator with a real
            network and a real credential.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏅</div>
              <h4>Certified Educator</h4>
              <p>
                Earn an official certification that recognizes you as a qualified Bitcoin and
                open-source educator across Africa.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h4>Earn as You Learn</h4>
              <p>
                Receive financial rewards, access to grants, and economic benefits for your active
                participation and contributions throughout the program.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💼</div>
              <h4>Paid Internships</h4>
              <p>
                Top performers get access to paid internship opportunities within the technology and
                open-source ecosystem.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌐</div>
              <h4>Global Community & Opportunities</h4>
              <p>
                Connect with Bitcoin educators and ecosystem leaders worldwide, and unlock
                scholarships, conference invitations, and international residencies.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h4>Cutting-Edge Tech Training</h4>
              <p>
                Hands-on training in Bitcoin, cryptography, Blockchain, coding, AI, and open-source
                tools and skills that matter now and in the future.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📁</div>
              <h4>International Portfolio</h4>
              <p>
                Build a real and verifiable portfolio of work and contributions that stands out in
                the global tech space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-inner">
          <div className="section-label">Questions</div>
          <h2 className="section-title">Frequently asked</h2>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={item.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <div className="faq-q" onClick={() => setOpenFaqIndex(isOpen ? null : index)}>
                    {item.question}
                    <span className="icon">+</span>
                  </div>
                  <div className="faq-a">{item.answer}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-banner" id="apply">
        <h2>
          Ready to be part of
          <br />
          Africa's Bitcoin <em>future?</em>
        </h2>
        <p>
          Whether you're here to learn, teach, or invest in this mission, there's a place for you.
          Join the network building Bitcoin education from the ground up, in every African language.
        </p>
        <div className="cta-actions">
          <button type="button" onClick={onApply} className="btn-primary">
            Apply as Learner →
          </button>
          <button type="button" onClick={onApply} className="btn-outline">
            Become a Tutor
          </button>
          <a href="mailto:ambassadors@africabitcoineducation.org" className="btn-outline">
            Partner With Us
          </a>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}

export default LandingPage;
