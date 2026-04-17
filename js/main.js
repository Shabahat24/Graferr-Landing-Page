import { api } from './api.js';
import {
  createErrorState,
  createFeaturesSection,
  createFeaturesSkeleton,
  createHeader,
  createHero,
  createHeroSkeleton
} from './components.js';
import { Carousel } from './carousel.js';

const headerRoot = document.getElementById('site-header');
const heroRoot = document.getElementById('hero-section');
const featuresRoot = document.getElementById('features-section');

let carouselInstance = null;

function renderLoadingState() {
  heroRoot.innerHTML = createHeroSkeleton();
  featuresRoot.innerHTML = createFeaturesSkeleton();
}

function renderError(error) {
  heroRoot.innerHTML = '';
  featuresRoot.innerHTML = createErrorState(error.message || 'Unable to load page content.');

  document.getElementById('retry-btn')?.addEventListener('click', init);
}

async function init() {
  renderLoadingState();

  try {
    const [navigation, hero, features] = await Promise.all([
      api.getNavigation(),
      api.getHeroContent(),
      api.getFeaturesContent()
    ]);

    headerRoot.innerHTML = createHeader(navigation);
    heroRoot.innerHTML = createHero(hero);
    featuresRoot.innerHTML = createFeaturesSection(features);

    if (carouselInstance) carouselInstance.destroy();

    carouselInstance = new Carousel({
      track: document.getElementById('carousel-track'),
      prevButton: document.getElementById('prev-btn'),
      nextButton: document.getElementById('next-btn'),
      products: features.products,
      itemsPerViewConfig: features.carousel.itemsPerView
    });

    carouselInstance.renderSlides();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
}

init();
