# Weather App

This Weather App is a simple React Native application that fetches weather data for a city from an API and displays it to the user. The app was built using React Native and TypeScript. It includes the following features:

- A single screen where users can enter the name of a city and fetch weather data for the entered city.
- Display of the following information:
  - City, Country
  - Current weather condition and icon
  - Forecast for the next 5 hours
- Error handling for invalid city names and API errors.

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Running the Tests](#running-the-tests)
- [Code Structure](#code-structure)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

## Installation

To get started with the Weather App, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```
   EXPO_PUBLIC_API_KEY=your_api_key
   EXPO_PUBLIC_API_URL=http://api.weatherapi.com/v1/forecast.json
   ```

   Replace `your_api_key` with your actual API key from the weather API service.

## Running the App

To run the app on an emulator or a physical device, use the following command:

```bash
npm start
```

This will start the Metro bundler. Follow the instructions in the terminal to open the app on an Android or iOS emulator, or scan the QR code to open it on your physical device using the Expo Go app.

## Running the Tests

To run the tests, use the following command:

```bash
npm test
```

This will run the test suite using Jest and display the results in the terminal.

## Code Structure

The main components and utility functions are organized as follows:

- **src/screens/home/HomeScreen.tsx**: The main screen of the app where users can enter a city name and view weather data.
- **src/screens/home/components/WeatherCard.tsx**: A component to display the weather information.
- **src/screens/home/utils/weatherUtils.ts**: Utility functions for fetching weather data and validating city names.
- **src/screens/home/utils/weatherUtils.test.ts**: Tests for the utility functions.
- **src/screens/home/HomeScreen.test.tsx**: Tests for the `HomeScreen` component.

## Error Handling

The app includes error handling for various scenarios:

1. **Invalid City Name**: If the user enters an invalid city name (containing numbers or special characters), an error message is displayed: "Please enter a valid city name (letters and spaces only)."

2. **API Errors**: 
   - If the API returns a `400 1006` error (No location found matching parameter 'q'), the app displays: "No location found matching parameter 'q'."
   - For other API errors, a generic error message is displayed: "Failed to fetch weather data."

## Technologies Used

- **React Native**: For building the mobile application.
- **TypeScript**: For type-safe code.
- **Axios**: For making HTTP requests to the weather API.
- **Jest**: For testing the application.

## Example Usage

1. **Enter City Name**: Type the name of the city in the input field and press the "Done" button on your keyboard.
2. **View Weather Data**: If the city name is valid, the app will display the current weather and the forecast for the next 5 hours.
3. **Handle Errors**: If an invalid city name is entered or the API returns an error, an appropriate error message will be displayed.

## Improvements

Unit Tests:

1. Add more comprehensive unit tests to cover edge cases and ensure robustness.
Implement integration tests to verify the interaction between different components.
Error Handling:

2. Improve error handling to cover a wider range of potential API errors.
Display user-friendly error messages and provide options to retry fetching data.
