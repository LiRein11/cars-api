import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import cls from './Form.module.scss';
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
  SubmitErrorHandler,
} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {} from '@/redux/car/car.slice';
import { useRouter } from 'next/router';
import { Car } from '@/redux/car/car.types';
import { fetchCar, fetchCars, postCar, putCar, removeCar } from '@/redux/car/car.actions';

interface FormProps {
  deleteProp?: boolean;
  car?: Car;
  isLoading?: boolean;
  error?: string;
}

const FormComponent = ({ car, isLoading, error, deleteProp }: FormProps) => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Car>();

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  console.log(fields);

  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  const createCar: SubmitHandler<Car> = (data) => {
    const updatedData = { ...data, id: car?.id };
    if (
      updatedData.technical_characteristics &&
      Object.values(updatedData.technical_characteristics).every((val) => !val || val === '')
    ) {
      delete updatedData.technical_characteristics;
    }
    car ? dispatch(putCar(updatedData)) : dispatch(postCar(updatedData));
    replace('/view');
  };

  const errorHandler: SubmitErrorHandler<Car> = (data) => {
    console.log(data);
  };

  const onRemoveCar = (carId: number) => {
    const res = confirm('Вы действительно хотите удалить машину?');
    if (res === true) {
      dispatch(removeCar(carId));
      dispatch(fetchCars());
      alert('Машина удалена');
      replace('/view');
    }
  };

  const onRemoveImage = (index: number) => {
    const images = getValues('images');
    if (images?.length === 1) {
      return;
    }
    const newImages = [...(images || [])];
    newImages.splice(index, 1);
    setValue('images', newImages);
  };

  const optionsArray = car?.options?.length
    ? car.options.map((option) => ({ option_name: option.option_name }))
    : [...Array(fields.length)].map(() => ({ option_name: '' }));

  function isValidUrl(url: string) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  }

  useEffect(() => {
    setChecked(false);
    if (isSubmitSuccessful && !car) {
      reset();
    }

    const fetchData = async (carId: number) => {
      await dispatch(fetchCar(carId));
    };

    if (car?.technical_characteristics) {
      setChecked(true);
    }

    const optionsArray = car?.options?.length
      ? car.options.map((option) => ({ option_name: option.option_name }))
      : [];
    setValue('options', optionsArray);
  }, [isSubmitSuccessful, reset, setValue, car?.options]);

  if (error) {
    <h2>Произошла ошибка</h2>;
  }

  return (
    <Form onSubmit={handleSubmit(createCar, errorHandler)}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={cls.wrapper}>
            <Form.Group className='mb-3' controlId='formName'>
              <Form.Label>Название*</Form.Label>
              <Controller
                control={control}
                defaultValue={car?.name}
                name='name'
                render={({ field: { onChange, value } }) => (
                  <Form.Control
                    value={value}
                    placeholder='Введите название машины'
                    {...register('name', { required: true })}
                    onChange={onChange}
                  />
                )}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formDescription'>
              <Form.Label>Описание*</Form.Label>
              <Controller
                control={control}
                name='description'
                defaultValue={car?.description}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    value={value}
                    placeholder='Введите описание машины'
                    {...register('description', { required: true })}
                    onChange={onChange}
                  />
                )}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formPrice'>
              <Form.Label>Цена*</Form.Label>
              <Controller
                control={control}
                name='price'
                defaultValue={car?.price}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    value={value}
                    placeholder='Введите цену'
                    {...register('price', { required: true })}
                    onChange={onChange}
                  />
                )}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formContacts'>
              <Form.Label>Контакты*</Form.Label>
              <Controller
                control={control}
                name='contacts'
                defaultValue={car?.contacts}
                render={({ field: { onChange, value, ref } }) => (
                  <Form.Control
                    value={value}
                    placeholder='Введите контакты'
                    {...register('contacts', { required: true })}
                    onChange={onChange}
                  />
                )}
              />
            </Form.Group>
          </div>

          <Form.Group className='mb-3' controlId='formImages'>
            <Form.Label>Фото*</Form.Label>
            <Controller
              control={control}
              name='images'
              defaultValue={car?.images || ['']}
              render={({ field: { onChange, value } }) => (
                <>
                  {value?.map((url, index) => (
                    <div key={index}>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Вставьте URL изображение'
                        value={url}
                        required={true}
                        onChange={(e) => {
                          const newUrl = e.target.value;
                          if (isValidUrl(newUrl)) {
                            const newImages = [...value];
                            newImages[index] = newUrl;
                            onChange(newImages);
                          }
                        }}
                      />
                      {value.length !== 1 && (
                        <Button onClick={() => onRemoveImage(index)}>Удалить изображение</Button>
                      )}
                    </div>
                  ))}
                  {value?.length === 1 && (
                    <Button onClick={() => onChange([...value, ''])}>Добавить изображение</Button>
                  )}
                </>
              )}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formCharacteristic'>
            <Form.Check
              type='checkbox'
              label='Добавить технические характеристики'
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </Form.Group>

          {checked && (
            <div className={cls.technicalWrapper}>
              <div className={cls.wrapper}>
                <Form.Group className='mb-3' controlId='formBrand'>
                  <Form.Label>Марка*</Form.Label>
                  <Controller
                    control={control}
                    name='technical_characteristics.brand'
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        defaultValue={car?.technical_characteristics?.brand}
                        value={value}
                        placeholder='Укажите марку машины'
                        {...register('technical_characteristics.brand', { required: true })}
                        onChange={onChange}
                      />
                    )}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formModel'>
                  <Form.Label>Модель*</Form.Label>
                  <Controller
                    control={control}
                    name='technical_characteristics.model'
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        defaultValue={car?.technical_characteristics?.model}
                        value={value}
                        placeholder='Укажите модель машины'
                        {...register('technical_characteristics.model', { required: true })}
                        onChange={onChange}
                      />
                    )}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formProductionYear'>
                  <Form.Label>Год выпуска*</Form.Label>
                  <Controller
                    control={control}
                    name='technical_characteristics.productionYear'
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        defaultValue={car?.technical_characteristics?.productionYear}
                        value={value}
                        placeholder='Год выпуска'
                        {...register('technical_characteristics.productionYear', {
                          required: true,
                        })}
                        onChange={onChange}
                      />
                    )}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBody'>
                  <Form.Label>Кузов*</Form.Label>
                  <Controller
                    control={control}
                    name='technical_characteristics.body'
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        defaultValue={car?.technical_characteristics?.body}
                        value={value}
                        placeholder='Кузов'
                        {...register('technical_characteristics.body', { required: true })}
                        onChange={onChange}
                      />
                    )}
                  />
                </Form.Group>
              </div>
              <Form.Group className='mb-3' controlId='formMileage'>
                <Form.Label>Пробег*</Form.Label>
                <Controller
                  control={control}
                  name='technical_characteristics.mileage'
                  render={({ field: { onChange, value, ref } }) => (
                    <Form.Control
                      defaultValue={car?.technical_characteristics?.mileage}
                      value={value}
                      placeholder='Пробег'
                      {...register('technical_characteristics.mileage', { required: true })}
                      onChange={onChange}
                    />
                  )}
                />
              </Form.Group>
            </div>
          )}

          <Button className='btnOrig' variant='primary' onClick={() => append({ option_name: '' })}>
            Добавить опцию
          </Button>
          {fields?.map((option, index) => (
            <>
              <Form.Group className='mb-3' controlId='formOption' key={option.id}>
                <Form.Label>Добавьте опцию</Form.Label>
                <div className={cls.wrapperFlex}>
                  <Controller
                    control={control}
                    name={`options.${index}.option_name`}
                    defaultValue={car?.options?.[index]?.option_name || ''}
                    render={({ field: { onChange, value, ref } }) => (
                      <Form.Control
                        placeholder='Опция'
                        value={value}
                        {...register(`options.${index}.option_name`, { required: true })}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Button variant='outline-danger' onClick={() => remove(index)}>
                    Удалить
                  </Button>
                </div>
              </Form.Group>
            </>
          ))}

          {car && deleteProp ? (
            <Button
              className='btnRemove'
              variant='primary'
              onClick={() => onRemoveCar(car?.id || 0)}>
              Удалить машину
            </Button>
          ) : car ? (
            <Button className='btnOrig' variant='primary' type='submit'>
              Обновить
            </Button>
          ) : (
            <Button className='btnOrig' variant='primary' type='submit'>
              Создать
            </Button>
          )}
        </>
      )}
    </Form>
  );
};

export default FormComponent;
