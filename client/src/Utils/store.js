import { useMutation, useQuery } from "@tanstack/react-query";
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

export function VetList() {
  const { isLoading, isError, isSuccess, error, data } = useQuery(['vetList'], async () => {
    const { data } = await axios.get("vet/list");
    return data;
  });

  return { isLoading, isError, isSuccess, error, data };
}
