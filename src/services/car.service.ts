import { Car } from "@/redux/car/car.types"
import axios from "axios"

const API_URL = 'http://localhost:8000'

axios.defaults.baseURL = API_URL

export const CarService = {
  async getAll(){
    return axios.get<Car[]>('/cars')

  },

  async getOne(id:number){
   return axios.get<Car>(`/cars/${id}`)

  },

  async deleteOne(id:number){
    return axios.delete<Car>(`/cars/${id}`)
  },

  async putOne(formData: Car){
    return axios.put<Car>(`/cars/${formData.id}`, formData)
   
  },

  async postOne(formData:Car){
    return await axios.post<Car>(`/cars`, formData)
  }
}