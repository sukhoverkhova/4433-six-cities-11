import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers, offersGrouppedByCity} from './mocks/offers';

const Setting = {
  CitiesCount: 5,
} as const;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      citiesCount = {Setting.CitiesCount}
      offers = {offers}
      offersGrouppedByCity = {offersGrouppedByCity}
    />
  </React.StrictMode>,
);
