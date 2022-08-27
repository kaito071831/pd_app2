import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { NextRouter, useRouter } from "next/router"
import { useState } from "react";

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
        "uid": Cookies.get("uid"),
        "access-token": Cookies.get("access-token"),
        "client": Cookies.get("client"),
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .delete("auth/sign_out")
        .then(() => {
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
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
