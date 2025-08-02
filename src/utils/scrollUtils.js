// Throttle function for scroll performance optimization
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Debounce function for search and other input events
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimized scroll handler
export const createOptimizedScrollHandler = (callback, throttleMs = 16) => {
  return throttle(callback, throttleMs);
};

// Intersection observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px',
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Request animation frame wrapper for smooth animations
export const requestAnimationFrameWrapper = (callback) => {
  return () => {
    requestAnimationFrame(callback);
  };
}; 