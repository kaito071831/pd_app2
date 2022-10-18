import { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router"
import { useState } from "react";
import { removeCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";

export const Logout_button = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMeesage, setErrorMessage] = useState<string>("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .delete("auth/sign_out")
        .then(() => {
          removeCookie("uid");
          removeCookie("client");
          removeCookie("access-token");
          router.push("/");
        })
        .catch((error: any) => {
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
        });
    })();
  }
  return(
    <>
      <button type="submit" onClick={handleSubmit}>ログアウト</button>
      {isError ? (
        <p>{errorMeesage}</p>
      ) : null}
    </>
  )
}
