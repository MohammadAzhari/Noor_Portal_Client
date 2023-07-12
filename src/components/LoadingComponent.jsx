import { CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
      }}
    >
      <CircularProgress color='primary' />
    </div>
  );
};

export default LoadingComponent;
