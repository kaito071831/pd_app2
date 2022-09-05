import axios, { AxiosInstance } from "axios";
import { NextPage } from "next";
import { useState } from "react";

const Sign_up: NextPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  // 新規ユーザー作成
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const signData: FormData = new FormData(event.currentTarget);
    const email: FormDataEntryValue = signData.get("email");
    const password: FormDataEntryValue = signData.get("password");
    const password_confirmation: FormDataEntryValue = signData.get("password_confirmation");
    const createAxiosInstance: () => AxiosInstance = () => {
      if (process.env.NODE_ENV !== "production"){
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
      if (password != password_confirmation){
        setIsError(true);
        setErrorMessage('"パスワード"と"パスワード(確認用)"が一致しません。もう一度ご確認ください。');
        return
      }
      return await axiosInstance
        .post("auth", {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          confirm_success_url: `http://localhost:8000/sign_in`,
        })
        .then(() => {
          setIsSendEmail(true);
          setEmailMessage("認証メールを送信しました。メールに記載のURLからアカウントを有効化させてください。");
        })
        .catch((error: any) => {
          setIsError(true);
          console.log(error.response.data);
          setErrorMessage(error.response.data);
          setIsSendEmail(false);
          setEmailMessage("");
        });
    })();
  }
  return(
    <>
      <div>
        {isError ? (
          <p>{errorMessage}</p>
        ) : null}
        {isSendEmail ? (
          <p>{emailMessage}</p>
        ) : null}
        <form onSubmit={handleSubmit}>
          <label>メールアドレス</label>
          <input name="email" title="メールアドレス" autoComplete="email" autoFocus/>
          <label>パスワード</label>
          <input name="password" title="パスワード" type="password" autoComplete="current-password"/>
          <label>パスワード(確認用)</label>
          <input name="password_confirmation" title="パスワード(確認用)" type="password" autoComplete="current-password"/>
          <button type="submit" title="サインアップ">サインアップ</button>
        </form>
      </div>
    </>
  )
}

export default Sign_up;
