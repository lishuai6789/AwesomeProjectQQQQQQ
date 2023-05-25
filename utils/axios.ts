import { useNavigation } from "@react-navigation/native";
import axios , {AxiosResponse, AxiosError}from "axios";
import { useMemo } from "react";

export const useAxios = () => {
  const navigation = useNavigation();
  const myAxios = useMemo(() => {
    const myAxios = axios.create({
      baseURL: "http://localhost:8080",
    });
    myAxios.interceptors.response.use((config: AxiosResponse) => {
      return config;
    }, (err: AxiosError) => {
      if (err.status) {
        if (err.status === 401) {
          navigation.navigate('Login');
        }
      }
    });
    return axios;
  }, []);
  return myAxios;
};
