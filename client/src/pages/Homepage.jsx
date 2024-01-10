import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Homepage = () => {
  const location = useLocation();

  // Sprawdź, czy ścieżka to /
  const isHomepage = location.pathname === '/homepage';

  // Stan do przechowywania informacji o załadowaniu strony głównej
  const [isHomepageLoaded, setHomepageLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania strony głównej
    const loadHomepage = async () => {
      try {
        const response = await fetch('/homepage.html'); // Zmień ścieżkę odpowiednio
        const html = await response.text();

        // Ustaw stan, że strona główna została załadowana
        setHomepageLoaded(true);

        // Wstrzyknij zawartość strony głównej do diva o id "homepage-container"
        const homepageContainer = document.getElementById('homepage-container');
        if (homepageContainer) {
          homepageContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading homepage:', error);
      }
    };

    // Załaduj strony głównej tylko jeśli nie została jeszcze załadowana
    if (!isHomepageLoaded) {
      loadHomepage();
    }
  }, [isHomepageLoaded]);

  // Jeśli to nie jest strona główna, zwróć null (nic nie renderuj)
  if (!isHomepage) {
    return null;
  }

  return (
    <div>
      
      <div id="homepage-container"></div>
      <Outlet />
    </div>
  );
};

export default Homepage;
