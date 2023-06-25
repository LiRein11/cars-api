import Search from '@/components/screens/search/Search';
import { Car } from '@/redux/car/car.types';

import { GetServerSideProps } from 'next';

type SearchPageProps = {
  data: Car[];
};

function SearchPage({ data }: SearchPageProps) {
  return <Search data={data} />;
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async () => {
  const response = await fetch('http://localhost:8000/cars');

  const data = await response.json();

  return {
    props: { data },
  };
};

export default SearchPage;
