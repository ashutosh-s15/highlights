import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastStyles from './Toast.module.css';

const Toast = () => {
  return (
    <ToastContainer
      toastClassName={toastStyles.toast_wrapper}
      position="top-center"
      autoClose={3000}
      icon={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default Toast;
