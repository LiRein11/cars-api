import View from '@/components/screens/view/View';
import { Car } from '@/redux/car/car.types';

import { GetServerSideProps } from 'next';

type ViewPageProps = {
  data: Car[];
};

function ViewPage({ data }: ViewPageProps) {
  return <View data={data} />;
}

export const getServerSideProps: GetServerSideProps<ViewPageProps> = async () => {
  const response = await fetch('http://localhost:8000/cars');

  const data = await response.json();

  return {
    props: { data },
  };
};

export default ViewPage;
