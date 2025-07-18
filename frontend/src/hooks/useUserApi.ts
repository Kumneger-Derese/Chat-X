import toast from 'react-hot-toast';
import {
  deleteAcount,
  getUser,
  loginUser,
  registerUser,
  updateUser,
} from '@/api/userAPi';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UserResponse } from '@/types';

// Custom hook for user registration
// It uses the registerUser API function and updates the auth store with the user credentials
// On success, it shows a success toast message

const useRegisterUser = () => {
  const { setCredentials } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('User registered.');
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error?.response?.data.message);
    },
  });
};

// This hook is used to login a user
// It uses the loginUser API function and updates the auth store with the user credentials
const useLoginUser = () => {
  const { setCredentials } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log({ data });
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User logged in.');
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });
};

// This hook is used to update user information
// It uses the updateUser API function and updates the auth store with the new user credentials
const useUpdateUser = () => {
  const { setCredentials } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      setCredentials(data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('User data updated.');
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error?.response?.data.message);
    },
  });
};

const useDeleteAcount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAcount,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.log('useDeleteAcount: ', { error });
      toast.error(error.response?.data?.message);
    },
  });
};

// This hook is used to get user information
const useGetUser = () => {
  const { userInfo } = useAuthStore();
  const id = userInfo?._id;

  return useQuery<UserResponse, Error>({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!id,
  });
};

export {
  useRegisterUser,
  useLoginUser,
  useUpdateUser,
  useGetUser,
  useDeleteAcount,
};
