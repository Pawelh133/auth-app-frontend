import { toast } from 'react-toastify';

const interceptError = (err) => {
  if (Array.isArray(err?.response?.data?.message)) {
    toast.error(err.response.data.message[0]);
  } else if (err?.response?.data?.message) {
    toast.error(err.response.data.message);
  }
}

export default interceptError;