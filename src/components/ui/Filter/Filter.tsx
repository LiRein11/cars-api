import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import cls from './Filter.module.scss';
import { Car, Characteristics } from '@/redux/car/car.types';

export interface Filter extends Characteristics {
  minMileage: string | number;
  maxMileage: string | number;
  minPrice: string | number;
  maxPrice: string | number;
}

export interface CarFilterProps {
  onFilterChange: (filter: Filter) => void;
}

export const CarFilter = ({ onFilterChange }: CarFilterProps) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [body, setBody] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    const filter = {
      brand: brand,
      model: model,
      productionYear: productionYear,
      body: body,
      minMileage: minMileage && parseInt(minMileage),
      maxMileage: maxMileage && parseInt(maxMileage),
      minPrice: minPrice && parseInt(minPrice),
      maxPrice: maxPrice && parseInt(maxPrice),
    };
    onFilterChange(filter);
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Марка:</span>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand((prev) => e.target.value)}
              placeholder='Введите марку машины'
            />
          </Form.Label>
        </Col>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Модель:</span>
            <Form.Control
              value={model}
              onChange={(e) => setModel((prev) => e.target.value)}
              placeholder='Введите модель машины'
            />
          </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Год выпуска:</span>
            <Form.Control
              value={productionYear}
              onChange={(e) => setProductionYear((prev) => e.target.value)}
              placeholder='Введите год выпуска'
            />
          </Form.Label>
        </Col>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Тип кузова:</span>
            <Form.Control
              value={body}
              onChange={(e) => setBody((prev) => e.target.value)}
              placeholder='Введите тип кузова'
            />
          </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Пробег от:</span>
            <Form.Control
              value={minMileage}
              onChange={(e) => setMinMileage((prev) => e.target.value)}
              placeholder='Введите пробег от'
            />
          </Form.Label>
        </Col>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>До:</span>
            <Form.Control
              value={maxMileage}
              onChange={(e) => setMaxMileage((prev) => e.target.value)}
              placeholder='Введите пробег до'
            />
          </Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Цена от:</span>
            <Form.Control
              value={minPrice}
              onChange={(e) => setMinPrice((prev) => e.target.value)}
              placeholder='Введите цену от'
            />
          </Form.Label>
        </Col>
        <Col md={6}>
          <Form.Label className={cls.wrapperInput}>
            <span>Цена до:</span>
            <Form.Control
              value={maxPrice}
              onChange={(e) => setMaxPrice((prev) => e.target.value)}
              placeholder='Введите цену до'
            />
          </Form.Label>
        </Col>
      </Row>

      <Button className='btnOrig' variant='primary' onClick={handleFilterChange}>
        Отфильтровать
      </Button>
    </div>
  );
};
