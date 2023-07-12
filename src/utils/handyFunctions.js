import { toast } from 'react-toastify';

export const arrayWrapperWithId = (arr) =>
  arr.map((item) => ({ ...item, id: item._id }));

export const reqHandler = (request, setIsLoading) => async () => {
  setIsLoading(true);
  try {
    await request();
  } catch (error) {
    toastError(error);
  } finally {
    setIsLoading(false);
  }
};

export const toastError = (error) => toast.error(error?.message ?? error);
