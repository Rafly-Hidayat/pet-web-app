import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

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
  const { isLoading, isError, isSuccess, error, data } = useQuery(["vetList"], async () => {
    const { data } = await axios.get("vet/list");
    return data;
  });

  return { isLoading, isError, isSuccess, error, data };
}

export function GetPicture(id) {
  const { isLoading, isError, isSuccess, error, data, refetch } = useQuery({
    queryKey: ["userPicture", id],
    queryFn: async () => {
      console.log(id);
      const { data } = await axios.get(`user/picture/${id}`, {
        responseType: "blob"
      });
      return data;
    }
  });

  return { isLoading, isError, isSuccess, error, data, refetch };
}

export function CreateSchedule() {
  const { isLoading, isError, isSuccess, error, data, mutate } = useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post("schedule/create", payload);
      return data;
    },
  });

  return { isLoading, isError, isSuccess, error, data, mutate };
}

export function UserScheduleList(id) {
  const { isLoading, isError, isSuccess, error, data } = useQuery(["userScheduleList"], async () => {
    const { data } = await axios.get(`schedule/list/active/user/${id}`);
    return data;
  });

  return { isLoading, isError, isSuccess, error, data };
}

export function GetDataChat(payload) {
  const { isLoading, isError, isSuccess, error, data } = useQuery(["GetDataChat"], async () => {
    const { data } = await axios.get(`chat/get/${payload.userId}/${payload.vetId}`);
    return data;
  });

  return { isLoading, isError, isSuccess, error, data };
}

export function GetRoomIdChat() {
  const { isLoading, isError, isSuccess, error, data } = useQuery(["GetRoomIdChat"], async () => {
    const { data } = await axios.get("chat/room-id");
    return data;
  });

  return { isLoading, isError, isSuccess, error, data };
}