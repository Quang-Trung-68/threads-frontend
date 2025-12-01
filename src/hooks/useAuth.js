import { useGetCurrentUserQuery } from "@/services/auth";
import Cookies from "js-cookie";

const useAuth = () => {
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetCurrentUserQuery();
  Cookies.set("userInfo", JSON.stringify(user || {}));
  return { user, isLoading, isError, isSuccess, isFetching };
};

export default useAuth;
