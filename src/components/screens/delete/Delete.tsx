import FormComponent from '@/components/ui/Form/Form';
import { fetchCar } from '@/redux/car/car.actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

interface DeleteProps {
  id: number;
}

export default function Delete({ id }: DeleteProps) {
  const dispatch = useAppDispatch();

  const { car, isLoading, error } = useAppSelector((state) => state.carReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchCar(id));
    }
  }, [id]);

  return (
    <>
      <FormComponent car={car} isLoading={isLoading} error={error} deleteProp />
    </>
  );
}
