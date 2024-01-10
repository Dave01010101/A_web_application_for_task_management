import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Archive = () => {
  const location = useLocation();

  // Sprawdź, czy ścieżka to /archive
  const isArchivePage = location.pathname === '/archive';

  // Stan do przechowywania informacji o załadowaniu archiwum
  const [isArchiveLoaded, setArchiveLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania archiwum
    const loadArchive = async () => {
      try {
        const response = await fetch('/archive.html'); // Zmień ścieżkę odpowiednio
        const html = await response.text();

        // Ustaw stan, że archiwum zostało załadowane
        setArchiveLoaded(true);

        // Wstrzyknij zawartość archiwum do diva o id "archive-container"
        const archiveContainer = document.getElementById('archive-container');
        if (archiveContainer) {
          archiveContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading archive:', error);
      }
    };

    // Załaduj archiwum tylko jeśli nie zostało jeszcze załadowane
    if (!isArchiveLoaded) {
      loadArchive();
    }
  }, [isArchiveLoaded]);

  // Jeśli to nie jest strona archiwum, zwróć null (nic nie renderuj)
  if (!isArchivePage) {
    return null;
  }

  return (
    <div>
      <h2>You are in the Archive</h2>
      <div id="archive-container"></div>
      <Outlet />
    </div>
  );
};

export default Archive;
