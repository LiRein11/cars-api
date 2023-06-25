import Update from '@/components/screens/update/Update';
import { useRouter } from 'next/router';

export default function UpdatePage() {
  const { query } = useRouter();

  return <Update id={Number(query.id)} />;
}
