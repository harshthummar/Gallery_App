import React, { useEffect, useState } from 'react';

export default function Home(){
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      <div className="background-image" />
      {showWelcome && (
        <div className="welcome-message">
          <h1>Welcome to Our Gallery App</h1>
        </div>
      )}
    </div>
  );
};


