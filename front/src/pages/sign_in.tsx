import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import { AxiosInstance, AxiosResponse } from "axios"
import { useState } from "react";
import { removeCookie, setCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Header } from "../components/header";

interface State {
  password: string;
  showPassword: boolean;
}

const Sign_in: NextPage = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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
      <Header/>
      <Snackbar open={isError} autoHideDuration={60}>
        <Alert severity="error" onClose={() => { setIsError(false) }}>{errorMessage}</Alert>
      </Snackbar>
      <Container>
        <Box component="h3" sx={{textAlign: "center"}}>サインイン</Box>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" margin="dense" fullWidth>
            <TextField name="email" type="email" size="small" label="メールアドレス" autoComplete="email" autoFocus/>
          </FormControl>
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
            <Button variant="contained" type="submit" title="ログイン" sx={{margin: 2}}>ログイン</Button>
          </FormControl>
        </form>
      </Container>
    </>
  )
}

export default Sign_in;
