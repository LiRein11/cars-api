import Slider from '@/components/ui/Slider/Slider';

const arrCars = [
  '/../public/cars/car2.jpg',
  '/../public/cars/car3.jpeg',
  '/../public/cars/car4.jpg',
  '/../public/cars/car1.jpg',
];

const sizeArr = {
  width: 1200,
  height: 700,
};

const Home = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Машины</h1>
      <Slider arr={arrCars} size={sizeArr} />
    </>
  );
};

export default Home;
