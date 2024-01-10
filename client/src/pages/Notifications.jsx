import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Notifications = () => {
  const location = useLocation();

  // Sprawdź, czy ścieżka to /notifications
  const isNotificationsPage = location.pathname === '/notifications';

  // Stan do przechowywania informacji o załadowaniu powiadomień
  const [areNotificationsLoaded, setNotificationsLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania powiadomień
    const loadNotifications = async () => {
      try {
        const response = await fetch('/notifications.html'); // Zmień ścieżkę odpowiednio
        const html = await response.text();

        // Ustaw stan, że powiadomienia zostały załadowane
        setNotificationsLoaded(true);

        // Wstrzyknij zawartość powiadomień do diva o id "notifications-container"
        const notificationsContainer = document.getElementById('notifications-container');
        if (notificationsContainer) {
          notificationsContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    // Załaduj powiadomienia tylko jeśli nie zostały jeszcze załadowane
    if (!areNotificationsLoaded) {
      loadNotifications();
    }
  }, [areNotificationsLoaded]);

  // Jeśli to nie jest strona powiadomień, zwróć null (nic nie renderuj)
  if (!isNotificationsPage) {
    return null;
  }

  return (
    <div>
      <div id="notifications-container"></div>
      <Outlet />
    </div>
  );
};

export default Notifications;
