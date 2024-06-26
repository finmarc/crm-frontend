import DarkModeSwitcher from "../../components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "../../assets/images/logo_fin.png";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

function Login() {
  useEffect(() => {
    dom("body")
      .removeClass("main")
      .removeClass("error-page")
      .addClass("login theme-1");
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await signIn(data);
  };

  return (
    <>
      <div>
        {/* <DarkModeSwitcher /> */}
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            <div className="hidden xl:flex flex-col min-h-screen">
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
              </div>
            </div>
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
              >
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Acessar sistema
                </h2>
                <div className="intro-x mt-8">
                  <input
                    type="text"
                    id="email"
                    {...register("email")}
                    required
                    className="intro-x login__input form-control py-3 px-4 block"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    required
                    className="intro-x login__input form-control py-3 px-4 block mt-4"
                    placeholder="Password"
                  />
                </div>
                <div className="intro-x mt-5 xl:mt-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-4 w-full xl:w-90 xl:mr-3 align-top"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
