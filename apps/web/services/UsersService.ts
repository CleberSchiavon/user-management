import { User, UserFetchResponse } from "@repo/types";
import { toast } from "react-toastify";
import { AxiosClient } from "~/client/axiosClient";

export const getUsers = async () => {
    try {
        const { data: userLoginData } = await AxiosClient.get<UserFetchResponse>(
          "/users/",
        );
        toast.success("Busca realizada com sucesso");
        return userLoginData;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
          throw error;
        }
        const errorMessage = "Ocorreu um erro ao realizar a busca de usuários";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
}

export const getUser = async ({ id }: { id: string }) => {
  try {
    const { data: userLoginData } = await AxiosClient.get<User>(
      `/users/${id}`,
    );
    toast.success("Busca realizada com sucesso");
    return userLoginData;
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    const errorMessage = "Ocorreu um erro ao realizar a busca de usuário";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}
