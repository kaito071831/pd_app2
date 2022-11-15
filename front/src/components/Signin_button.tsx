import { Icon } from "@mui/material"
import Link from "next/link"
import LoginIcon from '@mui/icons-material/Login';

export const Signin_button = () => {
  return(
    <>
      <div>
        <Link href="/sign_in">
          <Icon color="info" sx={{
            cursor: "pointer"
          }}>
            <LoginIcon/>
          </Icon>
        </Link>
      </div>
    </>
  )
}
