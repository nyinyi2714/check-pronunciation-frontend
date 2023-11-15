import { useState, useEffect, useRef } from "react";
import "./LoadingAnimation.css";

function LoadingAnimation(isLoading) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingSpeed, setLoadingSpeed] = useState(1);

  const loadingPage = useRef();
  const loadingBar = useRef();

  const hideLoadingPage = () => {
    loadingPage.current.classList.add("slide-up");
  };

  useEffect(() => {
    if(!isLoading) setLoadingSpeed(20);
  }, [isLoading]);

  useEffect(() => {
    // Start a timer to increase loadingProgress gradually
    const timer = setInterval(() => {
      if (loadingProgress < 100) {
        setLoadingProgress((prevProgress) => prevProgress + loadingSpeed);
      } else {
        clearInterval(timer);
      }
    }, 100); // Change the interval to 100 milliseconds

    // Clear the timer when the component unmounts or loadingProgress reaches 100
    return () => clearInterval(timer);
  }, [loadingProgress]);

  return(
    <div 
      className="loading-animation" 
      ref={loadingPage}
    >
      <div className="loading-animation--content">
        <img src="/images/main-logo.png" alt="main-logo" />
        <div className="loading-bar" >
          <span 
            className="bar" 
            ref={loadingBar} 
            onTransitionEnd={hideLoadingPage}
            style={{
              width:` ${loadingProgress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingAnimation;