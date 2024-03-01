import React from 'react';
import DigitalClock from './components/DigitalClock.jsx';
import PrayerTimes from './components/PrayerTimes.jsx';
import RamadanCounter from './components/RamadanCounter.jsx';

function App() {
  return (
     <div>
        <DigitalClock />
        <PrayerTimes />
        <RamadanCounter />
      </div>
  );
}

export default App;

//    How to make a top bar
 // <TopBar />
 // <div style={{ paddingTop: 50 }}