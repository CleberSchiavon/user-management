import React from "react";
import {redirect} from 'next/navigation';
import { useForm } from "react-hook-form";
import LoginUserSchema, { LoginUser } from "../Forms/schemas/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCardType } from "app/page";
import { Button, Input } from "~/components/index";
import { Card, CardFooter, CardHeader } from "../Card";
import { loginUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";


interface ILoginCard {
  setAuthCard: React.Dispatch<React.SetStateAction<AuthCardType>>;
}

export default function LoginCard({ setAuthCard }: ILoginCard) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserSchema),
  });

  const router = useRouter()
  const onSubmit = async (data: LoginUser) => {
    setLoading(true);
    setLoginError(null);
    try {
      const { access_token } = await loginUser({ data });
      localStorage.setItem("token", access_token);
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      }
    	}
      finally {
        setLoading(false);
      }
  };
  return (
      <Card className="p-16 w-4/12">
        <CardHeader className="flex flex-col gap-3 justify-center items-center content-center">
          <h1 className="font-bold text-lg text-black">Área de Login</h1>
          <p className="text-red-500 font-semibold">{loginError}</p>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Seu email"
            errorMessage={errors.email?.message}
            required
            {...register("email")}
          />
          <Input
            type={"password"}
            label="Senha"
            placeholder="Sua senha"
            errorMessage={errors.password?.message}
            required
            {...register("password")}
          />
          <Button disabled={loading} type="submit">
            Entrar
          </Button>
        </form>
        <CardFooter>
          <div className="flex flex-col gap-2 content-center w-full items-center pt-12 text-center">
            <p className="font-normal text-sm text-black">
              Não tem uma conta?&nbsp;
            </p>
            <a
              className="font-semibold text-primary cursor-pointer hover:text-primary-800"
              onClick={() => setAuthCard("register")}
            >
              Cadastre-se agora!
            </a>
          </div>
        </CardFooter>
      </Card>
  );
}
