import React from "react";

const withMedia = (Component: any) => (props: any) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  const toggleMedia = debounce(() => {
    setWidth(window.innerWidth);
  }, 250);

  React.useEffect(() => {
    // Add event listener on mount
    window.addEventListener("resize", toggleMedia);
    // Trigger once on initial load
    toggleMedia();

    // Cleanup on unmount
    return () => window.removeEventListener("resize", toggleMedia);
  }, []);

  return <Component {...props} media={width} />;
};

export default withMedia;

export const isMobile = () => {
  if (typeof document !== `undefined`) {
    return "ontouchstart" in document.documentElement === true;
  }
  return false;
};

export const debounce = (
  func: () => any,
  wait: number,
  immediate?: boolean
) => {
  let timeout: any;

  const executedFunction = function(this: any) {
    let context = this;
    let args: any = arguments;

    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };

  executedFunction.clear = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return executedFunction;
};
