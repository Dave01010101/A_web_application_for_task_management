import React, { useState, useEffect } from 'react';

const SettingsInfo = () => {
  // Stan do przechowywania informacji o załadowaniu ustawień
  const [isContentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania zawartości
    const loadContent = async () => {
      try {
        const contentPath = '/settings-info.html'; // Zmień ścieżkę odpowiednio
        const response = await fetch(contentPath);
        const html = await response.text();

        // Ustaw stan, że zawartość została załadowana
        setContentLoaded(true);

        // Wstrzyknij zawartość do diva o id "settings-info-container"
        const container = document.getElementById('settings-info-container');
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
      <h2>SettingsInfo Component</h2>
      <div id="settings-info-container"></div>
    </div>
  );
};

export default SettingsInfo;
