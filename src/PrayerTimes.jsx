import React, { useState, useEffect } from 'react';

function formatClockUSA(time) {
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${padZero(hours)}:${padZero(minutes)} ${meridiem}`;
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function PrayerTimes() {
  const [location, setLocation] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [azanAudio] = useState(new Audio('assets/azan.mp3'));

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported in this browser');
    }
  }, []);

  useEffect(() => {
    if (location) {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const currentDay = new Date().getDate();

      const apiUrl = `https://api.aladhan.com/v1/calendar/${currentYear}/${currentMonth}?latitude=${location.latitude}&longitude=${location.longitude}&method=2`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch prayer times');
          }
          return response.json();
        })
        .then((data) => {
          const todayPrayerTimes = data.data.find(
            (day) => day.date.gregorian.day == currentDay
          );

          if (todayPrayerTimes && todayPrayerTimes.timings) {
            const formattedPrayerTimes = Object.keys(todayPrayerTimes.timings).reduce(
              (formattedTimes, prayerName) => {
                formattedTimes[prayerName] = formatClockUSA(
                  new Date(`${currentYear}-${currentMonth}-${currentDay} ${todayPrayerTimes.timings[prayerName]}`)
                );
                return formattedTimes;
              },
              {}
            );
            setPrayerTimes(formattedPrayerTimes);

            const currentTime = new Date().getTime();
            const prayerTimeMilli = new Date(
              `${currentYear}-${currentMonth}-${currentDay} ${todayPrayerTimes.timings.Fajr}`
            ).getTime();
            
            const timeDiff = prayerTimeMilli - currentTime;
            if (timeDiff > 0 && timeDiff <= 60000) {
              azanAudio.play();
            }
          } else {
            throw new Error('Prayer times not available for the current day');
          }
        })
        .catch((error) => {
          console.error('Error fetching prayer times:', error.message);
        });
    }
  }, [location, azanAudio]);

  return (
    <div className="prayer-container">
      {prayerTimes ? (
        <>
          <div className="fajr"><strong>Fajr:</strong> {prayerTimes.Fajr}</div>
          <div className="dhuhr"><strong>Dhuhr:</strong> {prayerTimes.Dhuhr}</div>
          <div className="asr"><strong>Asr:</strong> {prayerTimes.Asr}</div>
          <div className="maghrib"><strong>Maghrib:</strong> {prayerTimes.Maghrib}</div>
          <div className="isha"><strong>Isha:</strong> {prayerTimes.Isha}</div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PrayerTimes;
