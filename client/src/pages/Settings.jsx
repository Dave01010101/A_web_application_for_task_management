import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const { settingsId } = useParams();
  const location = useLocation();

  // Sprawdź, czy ścieżka to /settings
  const isSettingsPage = location.pathname === '/settings';

  // Stan do przechowywania informacji o załadowaniu ustawień
  const [areSettingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania ustawień
    const loadSettings = async () => {
      try {
        let contentPath = '';

        // Ustal odpowiednią ścieżkę do pliku HTML w zależności od aktualnej strony
        if (settingsId === 'info') {
          contentPath = '/settings-info.html'; // Zmień ścieżkę odpowiednio
        } else if (settingsId === 'password') {
          contentPath = '/settings-password.html'; // Zmień ścieżkę odpowiednio
        } else {
          // Dodaj ścieżkę dla ogólnej zawartości ustawień
          contentPath = '/settings.html'; // Zmień ścieżkę odpowiednio
        }

        const response = await fetch(contentPath);
        const html = await response.text();

        // Ustaw stan, że ustawienia zostały załadowane
        setSettingsLoaded(true);

        // Wstrzyknij zawartość ustawień do diva o id "settings-container"
        const settingsContainer = document.getElementById('settings-container');
        if (settingsContainer) {
          settingsContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    // Załaduj ustawienia tylko jeśli nie zostały jeszcze załadowane
    if (!areSettingsLoaded) {
      loadSettings();
    }
  }, [areSettingsLoaded, settingsId]);

  const handleGoToSettings = (targetSettingsId) => {
    navigate(`/settings/${targetSettingsId}`);
  };

  // Jeśli to nie jest strona ustawień, zwróć null (nic nie renderuj)
  if (!isSettingsPage) {
    return null;
  }

  return (
    <div>
      <h2>Settings Component</h2>
      {/* Dodaj tutaj zawartość komponentu ustawień */}
      <button onClick={() => handleGoToSettings('info')}>Go to Settings Info</button>
      <button onClick={() => handleGoToSettings('password')}>Go to Settings Password</button>
      <div id="settings-container"></div>
      <Outlet />
    </div>
  );
};

export default Settings;
