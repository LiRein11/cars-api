import { createSlice } from "@reduxjs/toolkit";
import { fetchCar, fetchCars, postCar, putCar } from "./car.actions";
import { Cars } from "./car.types";

const initialState: Cars = {
  car: {},
  cars: [],
  isLoading: true,
  error: undefined
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload
    })
    builder.addCase(postCar.fulfilled, (state, action) => {
      state.cars.push(action.payload)
    })
    builder.addCase(putCar.fulfilled, (state, action) => {
      state.cars.push(action.payload)
    })
    builder.addCase(fetchCar.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchCar.fulfilled, (state, action) => {
      state.isLoading = false
      state.car = action.payload
    })
    builder.addCase(fetchCar.rejected, (state) => {
      state.isLoading = false
      state.error = 'error'
    })
  },
});

export default carSlice.reducer;