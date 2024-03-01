import React, { useState, useEffect } from 'react';

function RamadanCounter() {
  const [daysUntilRamadan, setDaysUntilRamadan] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const ramadanDate = new Date('2024-3-10'); 
    const timeDifference = ramadanDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    setDaysUntilRamadan(daysDifference);
  }, []);

  return (
    <div className="days-until-ramadan">
      <h1>{daysUntilRamadan} days until Ramadan!</h1>
    </div>
  );
}

export default RamadanCounter;
