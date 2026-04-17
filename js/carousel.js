import { createProductCard } from './components.js';

export class Carousel {
  constructor({ track, prevButton, nextButton, products, itemsPerViewConfig }) {
    this.track = track;
    this.prevButton = prevButton;
    this.nextButton = nextButton;
    this.products = products;
    this.itemsPerViewConfig = itemsPerViewConfig;
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.onResize = this.updateLayout.bind(this);
  }

  getItemsPerView() {
    const width = window.innerWidth;

    if (width < 768) return this.itemsPerViewConfig.mobile;
    if (width < 992) return this.itemsPerViewConfig.tablet;
    return this.itemsPerViewConfig.desktop;
  }

  getMaxIndex() {
    return Math.max(0, this.products.length - this.getItemsPerView());
  }

  renderSlides() {
    this.track.innerHTML = this.products
      .map((product) => `<div class="carousel-slide">${createProductCard(product)}</div>`)
      .join('');

    this.slides = [...this.track.children];
    this.updateLayout();
    this.attachEvents();
  }

  updateLayout() {
    const itemsPerView = this.getItemsPerView();
    const basis = 100 / itemsPerView;
    this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());

    this.slides?.forEach((slide) => {
      slide.style.flex = `0 0 ${basis}%`;
    });

    this.updatePosition();
  }

  updatePosition() {
    const itemsPerView = this.getItemsPerView();
    const slideWidthPercent = 100 / itemsPerView;
    this.track.style.transform = `translateX(-${this.currentIndex * slideWidthPercent}%)`;
    this.updateButtons();
  }

  updateButtons() {
    if (!this.prevButton || !this.nextButton) return;
    this.prevButton.disabled = this.currentIndex === 0;
    this.nextButton.disabled = this.currentIndex >= this.getMaxIndex();
  }

  next() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.getMaxIndex());
    this.updatePosition();
  }

  prev() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.updatePosition();
  }

  handleTouchStart = (event) => {
    this.touchStartX = event.changedTouches[0].screenX;
  };

  handleTouchEnd = (event) => {
    this.touchEndX = event.changedTouches[0].screenX;
    const delta = this.touchStartX - this.touchEndX;

    if (Math.abs(delta) < 50) return;

    if (delta > 0) this.next();
    else this.prev();
  };

  attachEvents() {
    this.prevButton?.addEventListener('click', () => this.prev());
    this.nextButton?.addEventListener('click', () => this.next());
    this.track.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.track.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
  }
}
