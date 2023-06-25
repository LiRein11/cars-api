import { CarFilter, Filter } from '@/components/ui/Filter/Filter';
import CarItem from '@/components/ui/CarItem/CarItem';
import { Car } from '@/redux/car/car.types';
import { useState } from 'react';

type SearchProps = {
  data: Car[];
};

const Search = ({ data }: SearchProps) => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const handleFilterChange = (filter: Filter) => {
    // Функция для фильтрации списка машин на основе заданных параметров
    const filterCars = (cars: Car[], filter: Filter) => {
      return cars.filter((car) => {
        let pass = true;

        if (filter.brand && car.technical_characteristics?.brand !== filter.brand) {
          pass = false;
        }

        if (filter.model && car.technical_characteristics?.model !== filter.model) {
          pass = false;
        }

        if (
          filter.productionYear &&
          car.technical_characteristics?.productionYear !== filter.productionYear
        ) {
          pass = false;
        }

        if (filter.body && car.technical_characteristics?.body !== filter.body) {
          pass = false;
        }

        if (
          filter.minMileage &&
          Number(car.technical_characteristics?.mileage) < Number(filter.minMileage)
        ) {
          pass = false;
        }

        if (
          filter.maxMileage &&
          Number(car.technical_characteristics?.mileage) > Number(filter.maxMileage)
        ) {
          pass = false;
        }

        if (filter.minPrice && Number(car?.price) < Number(filter.minPrice)) {
          pass = false;
        }

        if (filter.maxPrice && Number(car?.price) > Number(filter.maxPrice)) {
          pass = false;
        }
        return pass;
      });
    };

    const filteredCars = filterCars(data, filter);
    setFilteredCars(filteredCars);
  };

  return (
    <div>
      <h1>Поиск машин</h1>

      <CarFilter onFilterChange={handleFilterChange} />

      <div className='carsWrapper'>
        {filteredCars?.map((car: Car) => (
          <CarItem key={car.id} car={car}></CarItem>
        ))}
      </div>
    </div>
  );
};

export default Search;
