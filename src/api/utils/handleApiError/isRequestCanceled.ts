import axios from 'axios';

export const isRequestCanceled = (error: unknown): boolean => axios.isCancel(error);
