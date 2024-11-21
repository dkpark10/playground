import { Modal } from './modal';

export default async function PhotoModal({ params }: { params: { id: string } }) {
  const photoId = params.id;
  return <Modal>{photoId}</Modal>;
}
