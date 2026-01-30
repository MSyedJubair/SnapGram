import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form" 
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SigninValidation } from "@/lib/Validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";



const SigninForm = () => {
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading} = useUserContext()

  const {mutateAsync: signInAccount, isPending: isUserLogginin} = useSignInAccount()


  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SigninValidation>) {

    const session = await signInAccount({
      email: data.email, 
      password:data.password
    })

    if (!session) {
      toast('Failed to Login')
      return
    }

    // wait for Appwrite session to fully register bcz its slow 😃
    await new Promise((res) => setTimeout(res, 300))

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn){
      form.reset()
      navigate('/')
    } else {
      toast('Failed to authenticate user')
    }
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">

      {/* // Header */}
      <div className="flex flex-col justify-center items-center">
        <img src="./assets/images/logo.svg" alt="" />

        <h1 className="text-2xl text-gray-200 mt-2">Welcome Back! Login to your account</h1>
        <p className="text-sm text-gray-500 my-4 ">To use Snapgram please enter your account details</p>
      </div>

      {/* // Main form */}
      <Card className="w-full sm:max-w-md bg-indigo-950/15">
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="tony_stark"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="tonystark@gmail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                      type="password"
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
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isUserLogginin || isUserLoading}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              form="form-rhf-demo"
              disabled={isUserLogginin || isUserLoading}
            >
              <Spinner/>
              {isUserLogginin ? (
                "Logining Account..."
              ) : isUserLoading ? (
                "Verifying..."
              ) : (
                "Sign In"
              )}
            </Button>
          </Field>
        </CardFooter>
      </Card>

      {/* // Footer */}
      <div className="text-gray-400 mt-4">
        Don't have an account? {<Link to={'/sign-up'}><span className="text-blue-400">Create one!</span></Link>}
      </div>
    </div>
  );
};

export default SigninForm;
