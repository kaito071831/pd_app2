import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from "@mui/material";
import axios, { AxiosInstance } from "axios";
import { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/header";

interface State {
  password: string;
  showPassword: boolean;
}

const Sign_up: NextPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSendEmail, setIsSendEmail] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });
  const [confirmValues, setConfirmValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const confirmHandleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };
  
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const confirmHandleClickShowPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
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
      <Header/>
      <Container>
        <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error" onClose={() => { setIsError(false) }}>{errorMessage}</Alert>
        </Snackbar>
        <Snackbar open={isSendEmail} autoHideDuration={60}>
          <Alert severity="info" onClose={() => { setIsSendEmail(false) }}>{emailMessage}</Alert>
        </Snackbar>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <TextField name="email" type="email" size="small" label="メールアドレス" autoComplete="email" autoFocus/>
          </FormControl><br/>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password" size="small">パスワード</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              size="small"
              name="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl><br/>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <InputLabel htmlFor="outlined-adornment-confirm-password" size="small">パスワード(確認用)</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              size="small"
              name="password_confirmation"
              type={confirmValues.showPassword ? 'text' : 'password'}
              value={confirmValues.password}
              onChange={confirmHandleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={confirmHandleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmValues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="ConfirmPassword"
            />
          </FormControl>
          <Button variant="contained" type="submit" title="サインアップ" sx={{margin: 2}}>サインアップ</Button>
        </form>
      </Container>
    </>
  )
}

export default Sign_up;
