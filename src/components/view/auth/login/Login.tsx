import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/auth.services";
import { toast } from "sonner";
import { setUserData } from "@/store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// ✅ Schema lebih jelas
const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(16, "Username maksimal 16 karakter"),
  password: z.string().min(1, "Password minimal 8 karakter"),
});

type ILoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    reValidateMode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ILoginFormValues) => authServices.login(data),
    onSuccess: (data) => {
      form.reset();
      // @ts-ignore
      toast.success(data?.message || "Login berhasil!");

      const userData = {
        id: data.data.id,
        token: data.data.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUserData(userData));
      navigate("/admin/data-kelompok-masyarakat");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Login gagal, silakan coba lagi.");
    },
  });

  const handleLogin = (values: ILoginFormValues) => {
    mutate(values);
  };

  return (
    <div className="relative h-screen w-full">
      <img
        src="/img/bg.png"
        alt="Latar belakang desa"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="w-full max-w-md"
          >
            <Card className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl py-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-[#0F828C]">
                  E-Lingkus Desa Sukaresmi
                </CardTitle>
                <CardTitle className="text-xl font-semibold tracking-tight pt-4">
                  SIGN IN
                </CardTitle>
                <CardDescription className="pt-1">
                  Untuk mengakses, silakan login terlebih dahulu.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username / Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Username / Email"
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            placeholder="Password"
                            className="h-12 pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col gap-5">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 bg-[#0F828C] hover:bg-[#0c6a74] text-base"
                >
                  {isPending ? "Loading..." : "Login"}
                </Button>

                <Link
                  to="/"
                  className="block text-center mt-4 text-sm text-blue-500 hover:text-blue-600 underline"
                >
                  Back To Homepage
                </Link>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
