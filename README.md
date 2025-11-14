# Vue Calendar Reminders App

A modern, feature-rich calendar application built with Vue 3, Vue Router, and Vite.
Users can browse monthly views, open a specific day, and manage their reminders.
Each reminder includes:

The app displays local weather for each reminder, based on its city, using a cached API call system to minimize requests.

## Technologies Used

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Vite
- OpenWeather API
- LocalStorage for persistent reminders
- TypeScript

## Configuration
Create .env.local and add BASE URL and an OpenWeather API key.

```env
VITE_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_OPENWEATHER_KEY=YOUR_OPENWEATHER_API_KEY
```

Important:
All Vite environment variables must start with VITE_ to be accessible in the frontend.

Restart the dev server after editing .env.local.

## Running the Project
### Install
```bash
npm install
```
### Start development server
```bash
npm run dev
```
The app will be available at:
```
http://localhost:5173
```
### Build for production
```bash
npm run build
```