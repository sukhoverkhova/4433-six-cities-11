import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute, DEFAULT_CITY} from '../../const';
import App from './app';

import {
  makeFakeOffers,
  fakeOffer,
  makeFakeReviews,
  mockDefaultCityInfo
} from '../../util/mocks';

const mockStore = configureMockStore();

const fakeOffers = makeFakeOffers();
const fakeReviews = makeFakeReviews();
const fakeNearbyOffers = makeFakeOffers();
const fakeFavoriteOffers = makeFakeOffers();
const fakeOfferInfo = fakeOffer;

const store = mockStore({
  USER: {
    authStatus: AuthorizationStatus.Auth
  },
  DATA: {
    offers: [...fakeOffers, {...fakeOfferInfo, id: 1, city: mockDefaultCityInfo}],
    currentOffer: {...fakeOfferInfo, id: 1, city: mockDefaultCityInfo},
    reviews: fakeReviews,
    nearOffers: fakeNearbyOffers,
    favoriteOffers: fakeFavoriteOffers,
  },
  PROCESS: {
    currentCity: DEFAULT_CITY,
    selectedOfferId: 1,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/1 places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/404');

    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
