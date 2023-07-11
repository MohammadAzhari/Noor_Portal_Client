import { toast } from 'react-toastify';

export const arrayWrapperWithId = (arr) =>
  arr.map((item, i) => ({ ...item, id: i }));

export const reqHandler = (request, setIsLoading) => async () => {
  setIsLoading(true);
  try {
    await request();
  } catch (error) {
    toast.error(error);
  } finally {
    setIsLoading(false);
  }
};
