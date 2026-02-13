import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { SignupValidation } from "@/lib/Validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateUserAccount,
  useSignInAccount,
  useSignInWithGoogle,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

const SignupForm = () => {
  const { mutateAsync: CreateUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInWithGoogle, isPending: isUserLoggininUsingGoogle } = useSignInWithGoogle();
  const { isLoading: isUserLoading, checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const [ googleSignBtn, setGoogleSignBtn ] = useState(false)

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignupValidation>) {
    const newUser = await CreateUserAccount(data);

    if (!newUser) {
      toast("Failed to create account");
      return;
    }

    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });

    if (!session) {
      toast("Failed to sign in");
      return;
    }

    await new Promise((res) => setTimeout(res, 300));
    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast("Failed to authenticate user");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-950 to-black px-4 min-w-full">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="./assets/images/logo.svg"
              alt="logo"
              width={100}
              className="mb-4"
            />
            <h1 className="text-2xl font-semibold text-white">
              Create Account
            </h1>
            <p className="text-sm text-gray-400 mt-2 text-center">
              Join Snapgram and start sharing moments
            </p>
          </div>

          <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Tony Stark"
                      autoComplete="off"
                      className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="tony_stark"
                      autoComplete="off"
                      className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="tonystark@gmail.com"
                      autoComplete="off"
                      className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="bg-white/5 border-white/10 focus:ring-2 focus:ring-indigo-500"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 p-8 pt-0">
          <div className="flex w-full gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isCreatingUser || isUserLoading}
              className="w-1/3 border-white/20 text-gray-300 hover:bg-white/10"
            >
              Reset
            </Button>

            <Button
              type="submit"
              form="signup-form"
              disabled={isCreatingUser || isUserLoading}
              className="w-2/3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
            >
              {isCreatingUser ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Creating...
                </div>
              ) : isUserLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Verifying...
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          <div className="text-sm text-gray-400 text-center pt-4 border-t border-white/10">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Login
            </Link>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => {signInWithGoogle(); setGoogleSignBtn(true);}}
            disabled={googleSignBtn || isUserLoading}
            className="w-full border-white/20 text-gray-300 hover:bg-white/10"
          >
            {googleSignBtn ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Creating Account...
              </div>
            ) : isUserLoading ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Verifying...
              </div>
            ) : (
              <>
                <img
                  src="../assets/icons/google.svg"
                  width={20}
                  height={20}
                  alt="google"
                  className="invert"
                />
                Sign Up with Google
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
