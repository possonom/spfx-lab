/**
 * Date utility functions for consistent date handling across the application
 */

export const DateUtils = {
  /**
   * Format date for display in SharePoint lists
   */
  formatDisplayDate: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  /**
   * Format date and time for detailed display
   */
  formatDateTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return DateUtils.formatDisplayDate(dateObj);
  },

  /**
   * Check if date is today
   */
  isToday: (date: Date | string): boolean => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return dateObj.toDateString() === today.toDateString();
  },

  /**
   * Get start of day
   */
  getStartOfDay: (date: Date | string): Date => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const startOfDay = new Date(dateObj);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  },

  /**
   * Get end of day
   */
  getEndOfDay: (date: Date | string): Date => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const endOfDay = new Date(dateObj);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }
};
