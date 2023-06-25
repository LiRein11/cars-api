import FormComponent from '@/components/ui/Form/Form';
import { fetchCar } from '@/redux/car/car.actions';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

interface UpdateProps {
  id?: number;
}

export default function Update({ id }: UpdateProps) {
  const dispatch = useAppDispatch();

  const { car, isLoading, error } = useAppSelector((state) => state.carReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchCar(id));
    }
  }, [id]);

  return (
    <>
      <FormComponent isLoading={isLoading} car={car} error={error} />
    </>
  );
}
