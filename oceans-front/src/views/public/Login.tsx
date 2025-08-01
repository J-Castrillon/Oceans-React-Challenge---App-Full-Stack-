import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEnvelope,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { useMutation } from "@tanstack/react-query";
import { postPublicRequest } from "../../services/fetchingData";
import { toast } from "react-toastify";
import { LoginSchema } from "../../schemas/loginSchemas";
import { useSiteStore } from "../../store/siteStore";
import { useSessionStore } from "../../store/sessionStore";
import { useNavigate } from "react-router-dom";
import type { LoginType, ResponseLoginType } from "../../types/loginTypes";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginType>();

  const { logoType } = useSiteStore();
  const { setToken } = useSessionStore();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: postPublicRequest<ResponseLoginType>,
    onSuccess: (data: ResponseLoginType) => {
      setToken(data.token);
      reset();
      navigate("/auth/dashboard");
    },
    onError: () => {
      console.log("Error en el inicio de sesión");
      toast.error("Credenciales incorrectas", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-500"
          />
        ),
        autoClose: 1000,
        draggable: true,
        progress: undefined,
        hideProgressBar: true,
        className: "border-l-5 border-red-500 bg-white text-black shadow-md",
      });
    },
  });

  const onSubmitLogin = (data: LoginType) => {
    mutateAsync({
      url: "/auth",
      schema: LoginSchema,
      body: data,
    });
  };

  return (
    <section className="w-full h-full flex justify-center flex-col md:w-8/12 lg:w-6/12 md:h-auto md:border border-gray-300 rounded-xl p-6 bg-gray-100">
      <header className="flex flex-col gap-2" id="login-header">
        <h1 className="flex flex-col items-start justify-center">
          <img
            src={logoType}
            alt="Logotipo de Brasa & Corte"
            className="max-h-[40px] w-auto"
          />
          <span className="text-black text-xl font-bold mt-2">
            Inicia Sesión
          </span>
        </h1>
        <h2 className="text-sm text-gray-700">
          {"Super administrador o usuario de gestión"}
        </h2>
      </header>
      <main className="mt-2" id="login-main">
        <form
          onSubmit={handleSubmit(onSubmitLogin)}
          id="login-form"
          className="mx-auto w-full"
        >
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-500 text-sm">
                Documento{" "}
                {errors.document && <span className="text-red-500">*</span>}
              </label>
              <div
                className={`flex items-center gap-2 w-full p-3 border-1 rounded-xl border-gray-300`}
              >
                <FontAwesomeIcon icon={faIdCard} className="text-gray-400" />
                <input
                  type="text"
                  className="w-full outline-none text-gray-500 placeholder-gray-500"
                  inputMode="numeric"
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                    ];
                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  pattern="[0-9]*"
                  {...register("document", {
                    required: "El documento es requerido",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "El documento debe ser numérico",
                    },
                  })}
                  placeholder={
                    errors.document
                      ? errors.document.message
                      : "Ingrese su documento"
                  }
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-500 text-sm">
                Contraseña{" "}
                {errors.password && <span className="text-red-500">*</span>}
              </label>
              <div
                className={`flex items-center gap-2 w-full p-3 border-1 rounded-xl border-gray-300`}
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                <input
                  type="password"
                  className="w-full outline-none text-gray-500 placeholder-gray-500"
                  {...register("password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 3,
                      message: "La contraseña debe tener al menos 3 caracteres",
                    },
                  })}
                  placeholder={
                    errors.password
                      ? errors.password.message
                      : "Ingrese su contraseña"
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-[#151515] text-white font-semibold py-3 px-4 text-lg rounded-xl hover:cursor-pointer transition-colors duration-300"
          >
            Ingresar
          </button>

          <hr className="text-gray-300 border-gray-300" />
          <button
            type="submit"
            className=" flex gap-2 mt-5 justify-center items-center w-full bg-slate-300 hover:bg-slate-400 py-3 px-4 text-md rounded-xl hover:cursor-pointer transition-colors duration-300"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            <span>Continuar con Google</span>
          </button>
        </form>
      </main>
      <footer className="mt-3 text-start" id="login-footer">
        <p className=" underline hover:cursor-pointer text-gray-500">
          Términos y condiciones
        </p>
      </footer>
    </section>
  );
};
