import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: {
      reducer(_, action) {
        return action.payload;
      },
      prepare: value => {
        return {
          payload: value,
        };
      },
    },
  },
});

export const { setFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
