import { createAsyncThunk } from "@reduxjs/toolkit";
import { CarService } from "../../services/car.service";
import { Car } from "./car.types";

export const fetchCars = createAsyncThunk<Car[]>(
  'cars/fetchCars',
  async () => {
    try{
      const {data} = await CarService.getAll()
      
      return data
    }
    catch(error){
      console.error(error);
      throw new Error('Failed to fetch cars');
    }
  }
)

export const fetchCar = createAsyncThunk<Car, number>(
  'cars/fetchCar',
  async (id) => {
    try{
      const {data} = await CarService.getOne(id)
      console.log(data)
      return data
    } catch(error){
      console.error(error);
      throw new Error('Failed to fetch car');
    }
  }
)

export const postCar = createAsyncThunk<Car, Car>(
  'cars/postCar',
  async (formData) => {
    try{
      const {data} = await CarService.postOne(formData)
      console.log(data)
      return data
    } catch(error){
      console.error(error);
      throw new Error('Failed to fetch car');
    }
  }
)

export const removeCar = createAsyncThunk<void, number>(
  'cars/removeCar',
  async (carId, thunkApi) => {
    try{
      await CarService.deleteOne(carId)

    } catch(error){
      console.error(error);
      throw new Error('Failed to fetch car');
    }
  }
)

export const putCar = createAsyncThunk<Car, Car>(
  'cars/putCar',
  async (formData, thunkApi) => {
    try{
      const {data} = await CarService.putOne(formData)
      console.log(data)
      
      thunkApi.dispatch(fetchCars())
      return data
    } catch(error){
      console.error(error);
      throw new Error('Failed to fetch car');
    }
  }
)