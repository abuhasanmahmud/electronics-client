import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
export const create = (id) => {
  return async (dispatch, getState) => {
    const currentState = getState().example;
    console.log("current state", currentState);
  };
};

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
