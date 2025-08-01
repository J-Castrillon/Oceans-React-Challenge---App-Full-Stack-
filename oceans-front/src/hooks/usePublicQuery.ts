import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getPublicRequest } from "../services/fetchingData";
import type { BaseSchema } from "valibot";

type UsePublicQueryProps = {
  key: any;
  url: string;
  schema: BaseSchema<any, any, any>;
  token?: string;
  options?: Partial<UseQueryOptions<any, any>>;
};

export const usePublicQuery = <T>({
  key,
  url,
  schema,
  token, 
  options = {},
}: UsePublicQueryProps) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () =>
      await getPublicRequest<T>({
        url,
        schema,
        token,
      }),
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
    retry: 3,
    structuralSharing: false,
    ...options,
  });
};
