import React from "react";
import { useForm } from "react-hook-form";
import LoginUserSchema, { LoginUser } from "../Forms/schemas/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCardType } from "app/page";
import { Button, Input } from "~/components/index";
import { Card, CardFooter, CardHeader } from "../Card";
import { loginUser } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { authStore } from "@/store/AuthStore";

interface ILoginCard {
  setAuthCard: React.Dispatch<React.SetStateAction<AuthCardType>>;
}

export default function LoginCard({ setAuthCard }: ILoginCard) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setUser } = authStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserSchema),
  });

  const router = useRouter();
  const onSubmit = async (data: LoginUser) => {
    setLoading(true);
    try {
      const userData = await loginUser({ data });
      localStorage.setItem("token", userData.access_token);
      setUser(userData);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 justify-center items-center content-center">
        <h1 className="font-bold text-lg text-black">Área de Login</h1>
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
