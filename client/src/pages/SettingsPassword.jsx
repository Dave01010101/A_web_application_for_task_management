import React, { useState, useEffect } from 'react';

const SettingsPassword = () => {
  // Stan do przechowywania informacji o załadowaniu ustawień
  const [isContentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania zawartości
    const loadContent = async () => {
      try {
        const contentPath = '/settings-password.html'; // Zmień ścieżkę odpowiednio
        const response = await fetch(contentPath);
        const html = await response.text();

        // Ustaw stan, że zawartość została załadowana
        setContentLoaded(true);

        // Wstrzyknij zawartość do diva o id "settings-password-container"
        const container = document.getElementById('settings-password-container');
        if (container) {
          container.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading content:', error);
      }
    };

    // Załaduj zawartość tylko jeśli nie została jeszcze załadowana
    if (!isContentLoaded) {
      loadContent();
    }
  }, [isContentLoaded]);

  return (
    <div>
      <h2>SettingsPassword Component</h2>
      <div id="settings-password-container"></div>
    </div>
  );
};

export default SettingsPassword;
