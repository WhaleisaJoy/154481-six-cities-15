import { NameSpace } from '../../../const';
import { TCityName } from '../../types/cities';
import { TState } from '../../types/state';

export const getActiveCity = (state: TState): TCityName => state[NameSpace.Interface].activeCity;
