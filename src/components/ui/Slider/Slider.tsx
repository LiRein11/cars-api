import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

interface SliderProps {
  arr: string[];
  size?: {
    width: number;
    height: number;
  };
}

function Slider({ arr, size }: SliderProps) {
  return (
    <Carousel>
      {arr?.map((img, i) => (
        <Carousel.Item key={img}>
          <Image src={img} alt={'car'} width={size?.width || 400} height={size?.height || 300} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
