import { HttpException, HttpStatus } from "@nestjs/common";
import { AxiosError } from "axios";

export const handleErrorResponse = (
  error: unknown,
  message: string = "Something went wrong",
): HttpException => {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (response) {
      throw new HttpException(
        response.data as Record<string, unknown>,
        response.status,
      );
    }
  }

  throw new HttpException({ message }, HttpStatus.INTERNAL_SERVER_ERROR);
};
