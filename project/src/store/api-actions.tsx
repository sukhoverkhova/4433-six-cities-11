import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {Offer} from '../types/offer';
import {setError, redirectToRoute, setUserData} from './action';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, TIMEOUT_SHOW_ERROR, AppRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Review, ReviewData} from '../types/review';

// export const clearErrorAction = createAsyncThunk(
//   'game/clearError',
//   () => {
//     setTimeout(
//       () => store.dispatch(setError(null)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   },
// );

export const fetchOfferAction = createAsyncThunk<Offer[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchNearOfferAction = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearOfferAction',
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferInfo = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadOffer',
  async (id, {dispatch, extra: api}) => {
    const path = `${APIRoute.Offers}/${id}`;
    const {data} = await api.get<Offer>(path);
    dispatch(redirectToRoute(AppRoute.NotFound));
    return data;
  },
);

export const fetchReviewAction = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadReviews',
  async (id, {dispatch, extra: api}) => {
    const path = `${APIRoute.Reviews}/${id}`;
    const {data} = await api.get<Review[]>(path);
    // dispatch(setError('Can not find reviews'));
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Review[], ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review[]>(`${APIRoute.Reviews}/${id}`, {comment, rating});
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    await api.get<UserData>(APIRoute.Login);
    // dispatch(setUserData(data));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
