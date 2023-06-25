
export interface Options {
  option_name: string;
}

export interface Characteristics {
  brand?: string;
  model?: string;
  productionYear?: number | string;
  body?: string;
  mileage?: number | string;
}

export interface Car {
  id?: number;
  images?: string[];
  name?: string;
  description?: string;
  price?: number | string;
  contacts?: string;
  technical_characteristics?: Characteristics;
  options?: Options[];
}

export interface Cars{
  car: Car,
  cars: Car[],
  isLoading: boolean
  error: string | undefined
}
