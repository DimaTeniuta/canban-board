import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../store/store.types';
import { TStoreDispatch } from '../store/store';

export const useStoreSelector: TypedUseSelectorHook<IStoreState> = useSelector;
export const useStoreDispatch: () => TStoreDispatch = useDispatch;
