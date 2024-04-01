import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { TAppDispatch, TState } from '../types/state';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
