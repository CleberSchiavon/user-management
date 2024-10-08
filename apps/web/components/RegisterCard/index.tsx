import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCardType } from "app/page";
import { Button, Input } from "~/components/index";
import { Card, CardFooter, CardHeader } from "../Card";
import { useRouter } from "next/navigation";
import CreateUserSchema, { CreateUser } from "../Forms/schemas/CreateUser";
import { loginUser, registerUser } from "@/services/AuthService";
import { toast } from "react-toastify";

interface IRegisterCard {
  setAuthCard: React.Dispatch<React.SetStateAction<AuthCardType>>;
}

export default function RegisterCard({ setAuthCard }: IRegisterCard) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    mode: "onBlur",
    resolver: zodResolver(CreateUserSchema),
  });

  const router = useRouter();
  const onSubmit = async (data: CreateUser) => {
    setLoading(true);
    try {
      await registerUser({ data }).then(() =>
        toast.success("Usuário registrado com sucesso, entrando....")
      );
      const { access_token } = await loginUser({
        data: { email: data.email, password: data.password },
      });
      localStorage.setItem("token", access_token);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="p-16">
      <CardHeader className="flex flex-col gap-3 justify-center items-center content-center">
        <h1 className="font-bold text-lg text-black">Área de Cadastro</h1>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="text"
          label="Nome de usuário"
          placeholder="Seu nome de usuário"
          errorMessage={errors.username?.message}
          required
          {...register("username")}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Seu email"
          errorMessage={errors.email?.message}
          required
          {...register("email")}
        />
        <Input
          type="text"
          label="Número de telefone"
          placeholder="Seu número de telefone"
          errorMessage={errors.phoneNumber?.message}
          required
          {...register("phoneNumber")}
        />
        <Input
          type={"password"}
          label="Senha"
          placeholder="Sua senha"
          errorMessage={errors.password?.message}
          required
          {...register("password")}
        />
        <Input
          type={"password"}
          label="Confirmação de senha"
          placeholder="Sua senha"
          errorMessage={errors.confirmPassword?.message}
          required
          {...register("confirmPassword")}
        />
        <Button disabled={loading} type="submit">
          Registrar
        </Button>
      </form>
      <CardFooter>
        <div className="flex flex-col gap-2 content-center w-full items-center pt-12 text-center">
          <p className="font-normal text-sm text-black">
            Já tem uma conta?&nbsp;
          </p>
          <a
            className="font-semibold text-primary cursor-pointer hover:text-primary-800"
            onClick={() => setAuthCard("login")}
          >
            Faça seu login!
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
