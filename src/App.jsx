import { toast } from 'react-toastify';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './styles/main.scss';

import Routes from './routes';

function App() {
  toast.configure({
    autoClose: 5000,
    draggable: false,
  });

  return (
    <Routes />
  );
}

export default App;
