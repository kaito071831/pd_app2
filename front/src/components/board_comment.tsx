import ActionCable from "actioncable"
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { createAxiosInstance } from "../libs/haveSession";
import { Comment } from "../types/comment";

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
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
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
      <div>
        {comments.map((comment: Comment) => (
          <div key={comment.id}>
            <div>{comment.name}</div>
            <div>{comment.comment}</div>
          </div>
        ))}
      </div>
      <form name="commentForm" onSubmit={createComment}>
        <label>名前</label>
        <input name="name" title="name" type="text"/><br/>
        <label>本文</label><br/>
        <textarea name="comment" title="comment" rows={4} cols={40} defaultValue=""/>
        <button title="作成" type="submit">作成</button>
      </form>
    </>
  )
}

export default BoardComment
