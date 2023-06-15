import {configureStore} from '@reduxjs/toolkit';
import locationReducer from '../reducer/locationSlide';

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
