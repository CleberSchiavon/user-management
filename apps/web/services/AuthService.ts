import { ApiResponse, AxiosClient, isAxiosError } from "~/client/axiosClient";
import { CreateUser } from "components/Forms/schemas/CreateUser";
import { LoginUser as LoginUserType } from "components/Forms/schemas/LoginUser";
import { toast } from "react-toastify";
import { UserLoginReturn } from "@repo/types";

export const loginUser = async ({
  data,
}: {
  data: LoginUserType;
}): Promise<UserLoginReturn> => {
  try {
    const { data: userLoginData } = await AxiosClient.post<UserLoginReturn>(
      "/auth/login",
      data,
    );
    toast.success("Login realizado com sucesso");
    return userLoginData;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Ocorreu um erro ao logar o usuário";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const registerUser = async ({ data }: { data: CreateUser }) => {
  try {
    const { data: responseData } = await AxiosClient.post("/auth/signup", data);
    toast.success("Cadastro realizado com sucesso");
    return responseData;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Ocorreu um erro ao registrar o usuário";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const verifyToken = async ({ token }: { token: string }) => {
  try {
    const { data: responseData } = await AxiosClient.post(
      "/auth/verify-token",
      {
        token: token,
      },
    );

    return responseData;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage =
        (error.response?.data as ApiResponse<unknown>)?.message ||
        "Token inválido, tente novamente";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  toast.success("Logout realizado com sucesso");
};
