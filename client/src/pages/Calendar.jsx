import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Calendar = () => {
  const location = useLocation();

  // Sprawdź, czy ścieżka to /calendar
  const isCalendarPage = location.pathname === '/calendar';

  // Stan do przechowywania informacji o załadowaniu kalendarza
  const [isCalendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    // Funkcja do obsługi załadowania kalendarza
    const loadCalendar = async () => {
      try {
        const response = await fetch('/calendar.html'); // Zmień ścieżkę odpowiednio
        const html = await response.text();

        // Ustaw stan, że kalendarz został załadowany
        setCalendarLoaded(true);

        // Wstrzyknij zawartość kalendarza do diva o id "calendar-container"
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
          calendarContainer.innerHTML = html;
        }
      } catch (error) {
        console.error('Error loading calendar:', error);
      }
    };

    // Załaduj kalendarz tylko jeśli nie został jeszcze załadowany
    if (!isCalendarLoaded) {
      loadCalendar();
    }
  }, [isCalendarLoaded]);

  // Jeśli to nie jest strona kalendarza, zwróć null (nic nie renderuj)
  if (!isCalendarPage) {
    return null;
  }

  return (
    <div>
      <div id="calendar-container"></div>
      <Outlet />
    </div>
  );
};

export default Calendar;
