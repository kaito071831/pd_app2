import { Alert, IconButton, Snackbar } from "@mui/material";
import { AxiosInstance } from "axios";
import { NextRouter, useRouter } from "next/router"
import { useState } from "react";
import { removeCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const Signout_button = () => {
  const router: NextRouter = useRouter();
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
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
      <div>
        <IconButton type="submit" edge="end" onClick={handleSubmit}>
          <ExitToAppIcon color="error" titleAccess="SignOut"/>
        </IconButton>
        <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error" onClose={() => { setIsError(false) }}>{errorMessage}</Alert>
        </Snackbar>
      </div>
    </>
  )
}
