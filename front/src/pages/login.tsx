import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import axios, { AxiosInstance } from "axios"
import { useState } from "react";
import Cookies from "js-cookie";

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const signData = new FormData(event.currentTarget);
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post("auth/sign_in",{
          email: signData.get("email"),
          password: signData.get("password"),
        })
        .then(response => {
          Cookies.set("uid", response.headers["uid"]);
          Cookies.set("client", response.headers["client"]);
          Cookies.set("access-token", response.headers["access-token"]);
          router.push("/");
        })
        .catch(error => {
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
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
