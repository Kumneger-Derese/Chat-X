import type {
  DeleteAccRes,
  UserLogin,
  UserRegister,
  UserResponse,
} from '@/types';
import { Axios } from '@/utils/axios';

//user register api
const registerUser = async (body: UserRegister): Promise<UserResponse> => {
  const { data } = await Axios.post('/auth/register', body);
  return data;
};

//user login api
const loginUser = async (body: UserLogin): Promise<UserResponse> => {
  const { data } = await Axios.post('/auth/login', body);
  return data;
};

//user update api
const updateUser = async (body: UserRegister): Promise<UserResponse> => {
  const { data } = await Axios.put('/users/profile', body);
  return data;
};

//user update api
const getUser = async (): Promise<UserResponse> => {
  const { data } = await Axios.get('/users/profile');
  return data;
};

//user delete account api
const deleteAcount = async (id: string): Promise<DeleteAccRes> => {
  const { data } = await Axios.delete(`/users/delete-account/${id}`);
  return data;
};

export { registerUser, loginUser, updateUser, getUser, deleteAcount };
