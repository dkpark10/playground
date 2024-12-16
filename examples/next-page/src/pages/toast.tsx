import { toast, Toaster } from 'react-hot-toast';
import { ToastContainer, toast as toast2 } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function ToastPage() {
  const click = () => {
    // toast.success(<div style={{ border: '1px solid red', width: 560 }}>asdsd</div>, {
    //   duration: Infinity,
    //   position: 'bottom-left',
    // });
    // toast.error('bb', { duration: 3_000, position: 'bottom-center' });
    // toast.success('cc', { duration: 3_000, position: 'bottom-right' });
    // toast.success('dd', { duration: 3_000, position: 'top-center' });
    // toast.success('ee', { duration: 3_000, position: 'top-right' });
    // toast.success('ff', { duration: 3_000, position: 'top-left' });

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
       {
         loading: 'Saving...',
         success: <b>Settings saved! asdasdasdasdsdas</b>,
         error: <b>Could not save.</b>,
       }
     );
  };

  const click2 = () => {
    toast2.success('123', { progress: 1, position: 'bottom-left' });
    toast2.error('123', { progress: 1, position: 'bottom-center' });
    toast2.loading('123', { progress: 1, position: 'bottom-right' });
    toast2.update('123', { progress: 1, position: 'top-center' });
    toast2('123', { progress: 1, position: 'top-right' });
    toast2('123', { progress: 1, position: 'top-left' });
  };

  return (
    <>
      <Toaster />
      <ToastContainer />
      <div>toast page</div>
      <button style={{ width: 400 }} onClick={click}>
        click
      </button>
      <button style={{ width: 400 }} onClick={click2}>
        click2
      </button>
    </>
  );
}
