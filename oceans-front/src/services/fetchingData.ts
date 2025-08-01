import { type BaseSchema, safeParse } from "valibot";
import { isAxiosError } from "axios";
import { axiosInstance } from "../configs/axios";

export type GetPublicRequest = {
  url: string;
  token?: string;
  schema: BaseSchema<any, any, any>;
};

export const getPublicRequest = async <T>({
  url,
  token,
  schema,
}: GetPublicRequest): Promise<T> => {
  try {
    const { data: requestData } = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    });

    const parsedData = safeParse(schema, requestData);

    if (parsedData.success) return parsedData.output;
    else {
      throw new Error(
        `Validation error: ${parsedData.issues
          .map((issue) => issue.message)
          .join(", ")}`
      );
    }
  } catch (error) {
    if (isAxiosError(error)) throw new Error(`Axios error: ${error.message}`);
    else
      throw new Error(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
  }
};

export type PostPublicRequestProps = {
  url: string;
  schema: BaseSchema<any, any, any>;
  body: object;
};

export const postPublicRequest = async <T>({
  url,
  schema,
  body,
}: PostPublicRequestProps): Promise<T> => {
  try {
    const parsedData = safeParse(schema, body);

    const { data: requestData } = await axiosInstance.post(
      url,
      parsedData.output,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return requestData.data ? requestData.data : requestData;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      throw new Error(
        `Unexpected error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
};
