# React Prayer Times App

This is a simple React application that displays a digital clock, prayer times, and a countdown to the upcoming Ramadan.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Digital Clock**: The app includes a real-time digital clock that updates every second.

2. **Prayer Times**: It uses geolocation to fetch prayer times for the user's location using the Aladhan API. The prayer times include Fajr, Dhuhr, Asr, Maghrib, and Isha.

3. **Azan Notification**: If the user opens the app close to prayer time (within 1 minute), an Azan audio notification is played.

4. **Countdown to Ramadan**: A countdown timer to the next Ramadan is displayed.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/react-prayer-times-app.git
2. Change into directory:
   cd react-prayer-times-app
3. Install the dependencies:
   npm install

## Usage
1. Start the development server
   npm start
2. Open your browser and navigate to http://localhost:3000 to view the app.

## Dependencies
The app uses the following dependencies:

React: A JavaScript library for building user interfaces.
Aladhan API: An API for fetching accurate prayer times based on location.
Azan Audio: A sound file (azan.mp3) for playing the Azan notification.

## Contributing
Feel free to contribute to the project by opening issues or submitting pull requests. Follow the CONTRIBUTING.md guidelines.

## License
This project is licensed under the MIT License.
