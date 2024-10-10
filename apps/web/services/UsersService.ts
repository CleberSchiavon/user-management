import { User, UserFetchResponse } from "@repo/types";
import { toast } from "react-toastify";
import { ApiResponse, AxiosClient, isAxiosError } from "~/client/axiosClient";

export type UpdateUser = Omit<User, 'createdAt' | 'updatedAt' | 'id'>

export const getUsers = async (page = 1, take = 10) => {
    try {
        const { data: userLoginData } = await AxiosClient.get<UserFetchResponse>(
            `/users/?page=${page}&take=${take}`
        );
        toast.success("Busca realizada com sucesso", {
            autoClose: 2000,
            closeOnClick: true,
        });
        return userLoginData;
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          (error.response?.data as ApiResponse<unknown>)?.message ||
          "Ocorreu um erro ao buscar os usuários";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
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
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Ocorreu um erro ao buscar o usuário";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export const deleteUser = async ({ id }: { id: number }) => {
  try {
    const { data: userLoginData } = await AxiosClient.delete<User>(
      `/users/${id}`,
    );
    toast.success("Usuário deletado com sucesso");
    return userLoginData;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Ocorreu um erro ao deletar o usuário";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}

export const updateUser = async ({ id, user }: { id: number, user: Partial<UpdateUser> }) => {
  try {
    const { data: userLoginData } = await AxiosClient.put<User>(
      `/users/${id}`,
      user
    );
    toast.success("Usuário atualizado com sucesso");
    return userLoginData;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Ocorreu um erro ao atualizar o usuário";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}