export const resizeThrottler = (fn, time = 66) => {
  let resizeTimeout = null;
  return () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        fn();
      }, time);
    }
  };
};
