import Delete from '@/components/screens/delete/Delete';
import { useRouter } from 'next/router';

export default function DeletePage() {
  const { query } = useRouter();

  return <Delete id={Number(query.id)} />;
}
