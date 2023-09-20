import { useMutation } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';

export function Login() {
  const { isLoading, isError, isSuccess, error, data, mutate } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post("user/login", payload);
      return data;
    },
  });

  return { isLoading, isError, isSuccess, error, data, mutate };
}

export function Register() {
  const { isLoading, isError, isSuccess, error, data, mutate } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post("user/register", payload);
      return data;
    },
  });

  return { isLoading, isError, isSuccess, error, data, mutate };
}
