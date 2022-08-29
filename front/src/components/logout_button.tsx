import axios, { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router"
import { useState } from "react";
import { getCookie, removeCookie } from "typescript-cookie";

export const Logout_button = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMeesage, setErrorMessage] = useState<string>("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
        uid: getCookie("uid"),
        "access-token": getCookie("access-token"),
        client: getCookie("client"),
      },
    });
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
        .catch(error => {
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
