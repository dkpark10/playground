import { toast, Toaster } from 'react-hot-toast';
import { ToastContainer, toast as toast2 } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function ToastPage() {
  const click = () => {
    toast.success('123', { duration: 1_000, position: 'bottom-left' });
    toast.success('123', { duration: 1_000, position: 'bottom-center' });
    toast.success('123', { duration: 1_000, position: 'bottom-right' });
    toast.success('123', { duration: 1_000, position: 'top-center' });
    toast.success('123', { duration: 1_000, position: 'top-right' });
    toast.success('123', { duration: 1_000, position: 'top-left' });
  };

  const click2 = () => {
    toast2('123', { progress: 1, position: 'bottom-left' });
    toast2('123', { progress: 1, position: 'bottom-center' });
    toast2('123', { progress: 1, position: 'bottom-right' });
    toast2('123', { progress: 1, position: 'top-center' });
    toast2('123', { progress: 1, position: 'top-right' });
    toast2('123', { progress: 1, position: 'top-left' });
  };

  return (
    <>
      <Toaster />
      <ToastContainer />
      <div>toast page</div>
      <button onClick={click2}>click2</button>
      <button onClick={click}>click</button>
    </>
  );
}
