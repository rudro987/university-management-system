const handleAsync = (fn: Function) => async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (err: any) {
      throw new Error(err.message || 'An unexpected error occurred.');
    }
  };

  export default handleAsync;