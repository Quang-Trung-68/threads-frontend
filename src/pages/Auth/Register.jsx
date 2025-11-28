import { registerSchema } from "@/schemas";
import { useRegisterMutation } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// dt1234@gmail.com 12345678
//
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const [registerApi, { isError, isLoading }] = useRegisterMutation();

  const onSubmit = async (credentials) => {
    try {
      const response = await registerApi(credentials);
      Cookies.set("access_token", response.data.access_token);
      Cookies.set("refresh_token", response.data.refresh_token);
      toast.success("Register successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error to register, please try again");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white p-4">
      {/* Decorative Threads logos */}
      <div className="absolute top-8 left-8 flex h-32 w-32 -rotate-12 transform items-center justify-center rounded-full border-8 border-black">
        <span className="rotate-12 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      <div className="absolute top-4 right-8 flex h-40 w-40 rotate-12 transform items-center justify-center rounded-full border-8 border-black">
        <span className="-rotate-12 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      <div className="absolute bottom-8 left-12 flex h-36 w-36 rotate-45 transform items-center justify-center rounded-full border-8 border-black">
        <span className="-rotate-45 transform text-xs font-bold tracking-wider">
          THREADS
        </span>
      </div>

      {/* Main register container */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-8 text-2xl font-semibold">Đăng ký tài khoản</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <div className="text-left">
              <input
                type="text"
                placeholder="ExampleF8"
                {...register("firstName")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.firstName && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="text-left">
              <input
                type="text"
                placeholder="Last ExampleF8"
                {...register("lastName")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.lastName && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <input
                type="email"
                placeholder="ExampleF8@fullstack.edu.vn"
                {...register("email")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.email && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="text-left">
              <input
                type="password"
                placeholder="123456"
                {...register("password")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.password && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="text-left">
              <input
                type="password"
                placeholder="123456"
                {...register("password_confirmation")}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-gray-300 focus:outline-none"
              />
              {errors.password_confirmation && (
                <span className="mt-1 block text-sm text-red-500">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 w-full cursor-pointer rounded-xl bg-black py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Đăng ký
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="cursor-pointer text-sm font-medium">
                  Continue with Instagram
                </div>
                <div className="text-sm text-gray-600">dqt_2309</div>
              </div>
            </div>
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="mt-6">
            <button className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              <span className="cursor-pointer font-medium">
                Already have an account? Log in
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 space-x-3 text-center text-xs text-gray-500">
          <span>© 2025</span>
          <a href="#" className="hover:underline">
            Threads Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookies Policy
          </a>
          <a href="#" className="hover:underline">
            Report a problem
          </a>
        </div>
      </div>

      {/* QR Code section */}
      <div className="absolute right-8 bottom-8 hidden text-center lg:block">
        <div className="mb-2 text-sm text-gray-600">Scan to get the app</div>
        <div className="h-32 w-32 border-2 border-black bg-white p-2">
          <div className="flex h-full w-full items-center justify-center bg-black">
            <div className="grid grid-cols-8 gap-0.5 p-2">
              {[...Array(64)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 ${Math.random() > 0.5 ? "bg-white" : "bg-black"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
