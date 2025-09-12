export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function lazy<T extends Record<string, any>>(
  importFn: () => Promise<T>
) {
  let component: T | null = null;
  let promise: Promise<T> | null = null;

  return {
    load: () => {
      if (component) return Promise.resolve(component);
      if (promise) return promise;
      
      promise = importFn().then(module => {
        component = module;
        return module;
      });
      
      return promise;
    }
  };
}
