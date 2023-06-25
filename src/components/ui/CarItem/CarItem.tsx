import React, { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import cls from './CarItem.module.scss';
import { useRouter } from 'next/router';
import Slider from '@/components/ui/Slider/Slider';
import { Car } from '@/redux/car/car.types';

const CarItem: FC<{ car: Car }> = ({ car }) => {
  const { push } = useRouter();

  return (
    <div className={cls.itemWrapper}>
      <div className={cls.imgWrapper}>
        <Slider arr={car?.images || []} />
        <div className={cls.abd}>
          <Button
            style={{ marginBottom: '0px' }}
            variant='primary'
            onClick={() => push(`/update/${car.id}`)}>
            Редактировать
          </Button>
          <Button className='btnRemove' variant='primary' onClick={() => push(`/delete/${car.id}`)}>
            Удалить
          </Button>
        </div>
      </div>
      <div className={cls.colBold}>Основные характеристики:</div>
      <Row>
        <Col className={cls.col} md={8}>
          <span>Название машины:</span> {car?.name}
        </Col>
        <Col md={4}>
          <span>Цена:</span> {car?.price}
        </Col>
      </Row>

      <Col className={cls.col} md={12}>
        <span>Описание:</span> {car?.description}
      </Col>
      <Col className={cls.col} md={12}>
        <span>Контакты:</span> {car?.contacts}
      </Col>
      {car.technical_characteristics && (
        <div>
          <div className={cls.colBold}>Технические характеристики:</div>
          <Row>
            <Col className={cls.col} md={4}>
              <span>Пробег:</span> {car?.technical_characteristics.mileage}
            </Col>
            <Col className={cls.col} md={4}>
              <span>Модель:</span> {car?.technical_characteristics.model}
            </Col>
            <Col className={cls.col} md={4}>
              <span>Кузов:</span> {car?.technical_characteristics.body}
            </Col>
          </Row>
          <Row>
            <Col className={cls.col} md={6}>
              <span>Марка:</span> {car?.technical_characteristics.brand}
            </Col>
            <Col className={cls.col} md={6}>
              <span>Год выпуска:</span> {car?.technical_characteristics.productionYear}
            </Col>
          </Row>
        </div>
      )}

      {car?.options?.length !== 0 && (
        <>
          <Col className={cls.colBold}>Опции: </Col>
          {car?.options?.map((option, i) => (
            <Col className={cls.col} md={12} key={i}>
              <span>Опция {i + 1}:</span> {option.option_name}
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default CarItem;
