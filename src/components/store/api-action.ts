import { AxiosInstance } from 'axios';
import { TAppDispatch, TState } from '../types/state';
import { TGeneralOffer } from '../types/offers';
import { loadOffers, setOffersDataLoadingStatus } from './data-reducer/data-reducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../../const';
import { requireAuthorizationStatus } from './user-reducer/user-reducer';
import { TAuthData } from '../types/auth-data';
import { TUserData } from '../types/usert-data';
import { dropToken, saveToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<TGeneralOffer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk <void, TAuthData, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<TUserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk < void, undefined, {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
  }
);


