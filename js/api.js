const API_BASE = import.meta.env.VITE_CONTENT_URL || '/data/content.json';

const simulateDelay = () => 1000 + Math.floor(Math.random() * 500);

async function requestContent() {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error(`Failed to fetch content: ${response.status}`);
  }

  return response.json();
}

function delayedResolver(selector) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const content = await requestContent();
        resolve(selector(content));
      } catch (error) {
        reject(error);
      }
    }, simulateDelay());
  });
}

export const api = {
  getNavigation() {
    return delayedResolver((content) => content.navigation);
  },
  getHeroContent() {
    return delayedResolver((content) => content.hero);
  },
  getFeaturesContent() {
    return delayedResolver((content) => content.featuresSection);
  }
};
