import { useGetMeQuery } from "@/services/auth";

const useAuth = () => {
  const { data: user, isLoading, isError, isSuccess } = useGetMeQuery();
  return { user, isLoading, isError, isSuccess };
};

export default useAuth;
