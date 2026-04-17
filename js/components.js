export function createHeader(navigation) {
  const linksMarkup = navigation.links
    .map((link) => `<a class="nav-link" href="${link.href}">${link.label}</a>`)
    .join('');

  return `
    <div class="container site-header__inner fade-in">
      <a class="logo" href="#hero-section" aria-label="${navigation.logo.alt}">
        <span class="logo-mark">G</span>
        <span>${navigation.logo.text}</span>
      </a>
      <nav aria-label="Primary navigation">
        ${linksMarkup}
        <a class="nav-cta" href="${navigation.cta.href}">${navigation.cta.label}</a>
      </nav>
    </div>
  `;
}

export function createHero(hero) {
  const shapes = `
    ${hero.decorativeShapes.circle.show ? '<div class="shape shape--circle" aria-hidden="true"></div>' : ''}
    ${hero.decorativeShapes.rectangle.show ? '<div class="shape shape--rect" aria-hidden="true"></div>' : ''}
  `;

  return `
    <div class="container hero__layout fade-in">
      <div class="hero__copy">
        <span class="hero__eyebrow">${hero.eyebrow}</span>
        <h1>
          ${hero.headlinePrefix}
          <span class="gradient-text"> ${hero.headlineGradient}</span>
          ${hero.headlineSuffix}
        </h1>
        <p>${hero.subheadline}</p>
        <a class="btn" href="${hero.cta.href}">${hero.cta.label}</a>
      </div>

      <div class="hero__visual">
        ${shapes}
        <div class="hero-dashboard">
          <div class="hero-dashboard__screen">
            <img src="${hero.dashboardImage.src}" alt="${hero.dashboardImage.alt}" />
          </div>
        </div>
        <div class="hero-badge hero-badge--top">${hero.badges[0].label}</div>
        <div class="hero-badge hero-badge--bottom">${hero.badges[1].label}</div>
      </div>
    </div>
  `;
}

export function createProductCard(product) {
  return `
    <article class="product-card card">
      <img class="product-card__image" src="${product.image}" alt="${product.alt}" loading="lazy" />
      <div class="product-card__icon" aria-hidden="true">${product.icon}</div>
      <div>
        <h3>${product.title}</h3>
        <p>${product.description}</p>
      </div>
    </article>
  `;
}

export function createFeaturesSection(features) {
  return `
    <div class="container fade-in">
      <div class="features__head">
        <h2>
          ${features.title}
          <span class="gradient-text"> ${features.titleAccent}</span>
        </h2>
        <div class="features__subrow">
          <p>${features.subtitle}</p>
          <div class="features__divider" aria-hidden="true"></div>
        </div>
      </div>

      <div class="carousel-shell">
        <div class="carousel-track" id="carousel-track" aria-live="polite"></div>
      </div>

      ${features.carousel.showArrows ? `
        <div class="carousel-controls">
          <button class="carousel-arrow" id="prev-btn" aria-label="Previous products">←</button>
          <button class="carousel-arrow" id="next-btn" aria-label="Next products">→</button>
        </div>
      ` : ''}
    </div>
  `;
}

export function createErrorState(message) {
  return `
    <div class="container">
      <div class="error-box fade-in">
        <h2>Something went wrong</h2>
        <p>${message}</p>
        <button class="btn" id="retry-btn" type="button">Retry</button>
      </div>
    </div>
  `;
}

export function createHeroSkeleton() {
  return `
    <div class="container hero__layout">
      <div>
        <div class="skeleton" style="width: 190px; height: 42px; margin-bottom: 18px;"></div>
        <div class="skeleton" style="width: 92%; height: 76px; margin-bottom: 12px;"></div>
        <div class="skeleton" style="width: 75%; height: 76px; margin-bottom: 22px;"></div>
        <div class="skeleton" style="width: 100%; max-width: 560px; height: 96px; margin-bottom: 24px;"></div>
        <div class="skeleton" style="width: 160px; height: 54px;"></div>
      </div>
      <div class="hero__visual">
        <div class="skeleton" style="width: min(100%, 500px); height: 500px; border-radius: 34px;"></div>
      </div>
    </div>
  `;
}

export function createFeaturesSkeleton() {
  const cards = Array.from({ length: 3 }, () => `
    <div class="carousel-slide">
      <div class="card" style="padding: 22px;">
        <div class="skeleton" style="height: 220px; border-radius: 22px; margin-bottom: 18px;"></div>
        <div class="skeleton" style="width: 56px; height: 56px; margin-bottom: 18px;"></div>
        <div class="skeleton" style="width: 60%; height: 30px; margin-bottom: 12px;"></div>
        <div class="skeleton" style="width: 100%; height: 70px;"></div>
      </div>
    </div>
  `).join('');

  return `
    <div class="container">
      <div class="features__head">
        <div class="skeleton" style="width: 460px; max-width: 100%; height: 62px;"></div>
        <div class="features__subrow">
          <div class="skeleton" style="width: 550px; max-width: 100%; height: 28px;"></div>
          <div class="features__divider"></div>
        </div>
      </div>
      <div class="carousel-track">${cards}</div>
    </div>
  `;
}
