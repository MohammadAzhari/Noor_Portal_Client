import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from './Layout';
import storage from './localstorage';
import LoginPage from './pages/LoginPage';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    setIsAuthenticated(storage.isThereToken());
  }, []);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={5}
      />
      {isAuthenticated ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
