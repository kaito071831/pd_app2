import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import axios, { AxiosInstance, AxiosResponse } from "axios"
import { useState } from "react";
import { removeCookie, setCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";

const Sign_in: NextPage = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const signData: FormData = new FormData(event.currentTarget);
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
          setErrorMessage(error.response.data.errors);
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
          <input name="email" title="メールアドレス" autoComplete="email" autoFocus/>
          <label>パスワード</label>
          <input name="password" title="パスワード" type="password" autoComplete="current-password"/>
          <button type="submit" title="ログイン">ログイン</button>
        </form>
      </div>
    </>
  )
}

export default Sign_in;
