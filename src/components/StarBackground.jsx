import { useEffect, useState } from "react";


export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    generateStars();
    generateMeteors();
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });


    const handleResize = () => {
      generateStars();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 6;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 0.1,
        animationDuration: Math.random() * 2 + 3,
      });
    }

    setMeteors(newMeteors);
  };


  const generateClouds = () => {
    const numberOfClouds = 8;
    return Array.from({ length: numberOfClouds }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 80 + 60,
      speed: Math.random() * 20 + 20,
    }));
  };

return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {isDarkMode ? (
        <>
          {stars.map((star) => (
            <div
              key={star.id}
              className="star animate-pulse-subtle"
              style={{
                width: star.size + "px",
                height: star.size + "px",
                left: star.x + "%",
                top: star.y + "%",
                opacity: star.opacity,
                animationDuration: star.animationDuration + "s",
              }}
            />
          ))}
          {meteors.map((meteor) => (
            <div
              key={meteor.id}
              className="meteor animate-meteor"
              style={{
                width: meteor.size * 50 + "px",
                height: meteor.size * 2 + "px",
                left: meteor.x + "%",
                top: meteor.y + "%",
                animationDelay: meteor.delay + "s",
                animationDuration: meteor.animationDuration + "s",
              }}
            />
          ))}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-sky-300" />
          {generateClouds().map((cloud) => (
            <div
              key={cloud.id}
              className="cloud"
              style={{
                left: cloud.x + "%",
                top: cloud.y + "%",
                width: cloud.size + "px",
                height: cloud.size * 0.6 + "px",
                animation: `moveClouds ${cloud.speed}s linear infinite`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};