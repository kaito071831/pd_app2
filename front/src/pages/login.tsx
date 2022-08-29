import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { useState } from "react";
import { removeCookie, setCookie } from "typescript-cookie";

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const signData = new FormData(event.currentTarget);
    const createAxiosInstance: () => AxiosInstance = () => {
      if (process.env.NODE_ENV === "development"){
        return axios.create({
          baseURL: `/api/v1/`,
          headers: {
            "content-type": "application/json",
          },
        });
      }
      return axios.create({
        baseURL: `${process.env.API_ORIGIN}/api/v1/`,
        headers: {
          "content-type": "application/json",
        },
      });
    }
    const axiosInstance: AxiosInstance = createAxiosInstance();
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post("auth/sign_in", {
          email: signData.get("email"),
          password: signData.get("password"),
        })
        .then((response: AxiosResponse) => {
          setCookie("uid", response.headers["uid"]);
          setCookie("client", response.headers["client"]);
          setCookie("access-token", response.headers["access-token"]);
          router.push("/boards");
        })
        .catch((error: any) => {
          removeCookie("uid");
          removeCookie("client");
          removeCookie("access-token");
          setIsError(true);
          console.log(error.response.data);
          setErrorMessage(error.response.data);
        });
    })();
  }
  return(
    <>
      <div>
        {isError ? (
          <p>{errorMessage}</p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label>メールアドレス</label>
          <input id="email" name="email" title="メールアドレス" autoComplete="email" autoFocus/>
          <label>パスワード</label>
          <input id="password" name="password" title="パスワード" type="password" autoComplete="current-password"/>
          <button type="submit" title="ログイン">ログイン</button>
        </form>
      </div>
    </>
  )
}

export default Login;
