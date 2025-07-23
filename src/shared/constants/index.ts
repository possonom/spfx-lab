// Application constants
export const APP_CONSTANTS = {
  // SharePoint Lists
  LISTS: {
    PROJECTS: 'Projects',
    TASKS: 'Tasks',
    DOCUMENTS: 'Documents'
  },
  
  // API Configuration
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    BATCH_SIZE: 100
  },
  
  // UI Constants
  UI: {
    PAGE_SIZE: 20,
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 200
  },
  
  // Local Storage Keys
  STORAGE_KEYS: {
    USER_PREFERENCES: 'spfx_user_preferences',
    CACHE_PREFIX: 'spfx_cache_'
  }
} as const;

// Theme constants
export const THEME_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1200
  },
  
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32
  }
} as const;
