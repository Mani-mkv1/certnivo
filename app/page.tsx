const certifications = [
  {
    code: "AZ-104",
    title: "Azure Administrator",
    provider: "Microsoft Azure",
    description:
      "Build practical skills in identity, storage, compute, networking, and monitoring.",
    status: "In development",
  },
  {
    code: "AZ-900",
    title: "Azure Fundamentals",
    provider: "Microsoft Azure",
    description:
      "Build your foundation in cloud concepts, Azure services, and cloud management.",
    status: "Coming soon",
  },
];

const features = [
  {
    icon: "📖",
    title: "Structured Learning",
    description:
      "Follow a clear learning path instead of searching through countless resources.",
  },
  {
    icon: "🎥",
    title: "Curated Resources",
    description:
      "Find useful videos, documentation, labs, and other learning resources in one place.",
  },
  {
    icon: "📝",
    title: "Practice Exams",
    description:
      "Practice by topic and difficulty with questions designed around certification objectives.",
  },
  {
    icon: "🤖",
    title: "AI Tutor",
    description:
      "Ask questions, get explanations, practice concepts, and receive learning guidance.",
  },
];

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="/" className="logo">
            CertNivo
          </a>

          <div className="nav-links">
            <a href="#certifications">Certifications</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <button className="nav-button">Sign in</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              Certification learning, simplified
            </div>

            <h1>
              Stop searching.
              <br />
              <span>Start preparing.</span>
            </h1>

            <p className="hero-description">
              One structured place to learn, practice, explore resources,
              track your progress, and get help while preparing for
              professional certifications.
            </p>

            <div className="hero-actions">
              <a href="#certifications" className="primary-button">
                Explore certifications
              </a>

              <a href="#how-it-works" className="secondary-button">
                How it works
              </a>
            </div>

            <div className="hero-note">
              Built for learners who are tired of resource overload.
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <div>
                <div className="small-label">Featured path</div>
                <h2>AZ-104</h2>
              </div>

              <div className="azure-badge">AZURE</div>
            </div>

            <p className="hero-card-title">Azure Administrator</p>

            <div className="progress-label">
              <span>Learning path</span>
              <span>0%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" />
            </div>

            <div className="topic-list">
              <div>
                <span>01</span>
                Identity &amp; Governance
              </div>
              <div>
                <span>02</span>
                Storage
              </div>
              <div>
                <span>03</span>
                Compute
              </div>
              <div>
                <span>04</span>
                Networking
              </div>
              <div>
                <span>05</span>
                Monitoring
              </div>
            </div>

            <a href="#certifications" className="card-button">
              Start learning →
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">Everything in one place</div>
            <h2>Learn. Practice. Improve.</h2>
            <p>
              CertNivo is being built around the real problem learners face:
              too many resources and no clear path through them.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <div className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="section certifications-section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">Explore</div>
            <h2>Certifications</h2>
            <p>
              We are starting with Microsoft Azure and will expand into more
              certification paths over time.
            </p>
          </div>

          <div className="certification-grid">
            {certifications.map((certification) => (
              <article
                className="certification-card"
                key={certification.code}
              >
                <div className="certification-header">
                  <div className="certification-code">
                    {certification.code}
                  </div>

                  <span className="status">
                    {certification.status}
                  </span>
                </div>

                <div className="certification-provider">
                  {certification.provider}
                </div>

                <h3>{certification.title}</h3>

                <p>{certification.description}</p>

                <a
  href={
    certification.code === "AZ-104"
      ? "/certifications/az-104"
      : "#"
  }
  className="text-link"
>
  Explore path →
</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section how-section">
        <div className="container">
          <div className="section-heading">
            <div className="eyebrow">The CertNivo approach</div>
            <h2>A clearer way to prepare</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Choose</h3>
              <p>
                Select the certification you are preparing for and understand
                what you need to learn.
              </p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3>Learn</h3>
              <p>
                Follow a structured path with explanations, books, videos,
                documentation, and hands-on resources.
              </p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3>Practice</h3>
              <p>
                Test your understanding with questions organized by topic and
                difficulty.
              </p>
            </div>

            <div className="step">
              <div className="step-number">04</div>
              <h3>Improve</h3>
              <p>
                Identify weak areas, review them, and continue practicing until
                you are ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <div className="eyebrow">Starting with AZ-104</div>
            <h2>Your certification journey starts here.</h2>
            <p>
              CertNivo is being built one certification at a time, with
              learners at the center of the experience.
            </p>
          </div>

          <a href="#certifications" className="primary-button">
            Explore AZ-104
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <a href="/" className="logo">
              CertNivo
            </a>
            <p>Structured certification learning for everyone.</p>
          </div>

          <div className="footer-note">
            CertNivo is an independent learning platform.
          </div>
        </div>
      </footer>
    </main>
  );
}