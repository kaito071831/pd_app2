import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Link from "next/link"
import { useState } from "react"
import { createAxiosInstance } from "../libs/haveSession"
import { Signin_button } from "./Signin_button"
import { Signout_button } from "./Signout_button"

export const Header = () => {
  const [isSession, setIsSession] = useState<boolean>(false);
  
    (async() => {
      const axiosInstance = createAxiosInstance()
      try{
        await axiosInstance.get("auth/validate_token")
          .then((res) => {
            if(res.data.success == true){
              setIsSession(true)
            }else{
              setIsSession(false)
            }
          })
        }catch(e){
          if(e.name !== "AxiosError"){
            console.log(e);
          }
        }
    })()
  return(
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Box component="div" sx={{flexGrow: 1}}>
            <Link href={"/boards"}>
              Boards
            </Link>
          </Box>
          {isSession ? <Signout_button/> : <Signin_button/>}
        </Toolbar>
      </AppBar>
    </>
  )
}
