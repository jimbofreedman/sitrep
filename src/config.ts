const config = {
    apiUrl: process.env.REACT_APP_API_HOST,
    apiToken: process.env.REACT_APP_NAGGINGNELLY_API_TOKEN,
    openWeatherApiToken: process.env.REACT_APP_OPENWEATHERMAP_API_TOKEN,
    sentryDSN: process.env.REACT_APP_SENTRY_DSN,
    google: {
        clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
        redirectUrl: 'http://localhost:3000',
    }
};

console.log("Config", config);

export default config;
