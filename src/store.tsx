import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  screenWidth: window.innerWidth,
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreenWidth: (state, action) => {
      state.screenWidth = action.payload;
    },
  },
});

export const { setScreenWidth } = screenSlice.actions;

export const store = configureStore({
  reducer: screenSlice.reducer,
});
