import { AppBar, Toolbar, Typography } from "@mui/material"
import { Logout_button } from "./logout_button"

export const Header = () => {
  return(
    <>
      <AppBar position="static">
        <Toolbar variant="regular">
          <Typography component="div" sx={{flexGrow: 1}}>
            Boards
          </Typography>
          <Logout_button/>
        </Toolbar>
      </AppBar>
    </>
  )
}
