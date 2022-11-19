import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Container } from "@mui/system";
import ActionCable from "actioncable"
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";
import { Comment } from "../types/comment";
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
  id: number
}

type FormComment = {
  name: string
  comment: string
  boardId: number
  uid: string
}

const BoardComment = (props: Props) => {
  const id: number = props.id;
  
  const axiosInstance: AxiosInstance = createAxiosInstance();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      return await axiosInstance.get(`boards/${id.toString()}/comments`)
        .then((response) => {
          setComments(response.data.data);
        })
    })()
  }, [])

  const roomName: string = `Board${id}`

  // Webソケットの通信を行う
  const cable = ActionCable.createConsumer(`ws://${process.env.API_ORIGIN}/cable`);
  const boardChannel = cable.subscriptions.create(
    { channel: 'BoardChannel', room: roomName },
    {
      // コメントを受信した際の処理
      received(data) {
        setComments(data.comments)
      },

      // board_channelのpost関数を実行する
      post: function(message){
        this.perform('post', {comment: message})
      }
    }
  )

  const createComment = (event: any) => {
    event.preventDefault();
    const commentData = new FormData(event.currentTarget);
    const comment: FormComment = {
      name: commentData.get("name").toString(),
      comment: commentData.get("comment").toString(),
      boardId: id,
      uid: getCookie('uid')
    }
    boardChannel.perform('post', {commentData: comment})
    document.commentForm.reset();
  }

  return(
    <>
      <Container component={"div"} sx={{textAlign: "center"}}>
        <Box component={"div"} sx={{
          bgcolor: "#EFEFEF",
          p: 2,
          borderRadius: 5
        }}>
          {comments.map((comment: Comment, index: number) => {
            const date = new Date(comment.updated_at).toLocaleString()
            return(
            <Box component={"div"} key={comment.id} sx={{
              textAlign: "left",
              mb: 2
            }}>
              <Box component={"div"}>
                {index + 1}名前: {comment.name} {date}
              </Box>
              <Box component={"div"} sx={{textAlign: "left"}}>{comment.comment}</Box>
            </Box>
          )})}
          <Box component={"div"} sx={{
            textAlign: "left",
            pt: 2,
            borderTop: 1 
          }}>
            <form name="commentForm" onSubmit={createComment}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <TextField name="name" size="small" label="名前"/><br/>
              </FormControl>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="outlined-adornment" size="small">本文</InputLabel>
                <OutlinedInput
                  id="outlined-adornment"
                  size="small"
                  name="comment"
                  multiline
                  rows={4}
                  label="本文"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        edge="end"
                        sx={{
                          cursor: "pointer"
                        }}
                      >
                        <AddCircleIcon/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default BoardComment
