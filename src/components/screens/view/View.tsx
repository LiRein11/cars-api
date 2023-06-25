import CarItem from '@/components/ui/CarItem/CarItem';
import { Car } from '@/redux/car/car.types';

type Props = {
  data: Car[];
};

const View = ({ data }: Props) => {
  return (
    <div>
      <h1>Просмотр машин</h1>
      <div className='carsWrapper'>
        {data?.map((car: Car) => (
          <CarItem key={car.id} car={car}></CarItem>
        ))}
      </div>
    </div>
  );
};

export default View;
