import ActionCable from "actioncable"
import { useState } from "react";
import { getCookie } from "typescript-cookie";
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
  const [comments, setComments] = useState<Comment[]>([])

  const roomName: string = `Board${id}`
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  const boardChannel = cable.subscriptions.create(
    { channel: 'BoardChannel', room: roomName },
    {
      received(data) {
        setComments(data.comments)
      },

      post: function(message){
        this.perform('post', {comment: message})
      }
    }
  )
  const test = () => {
    boardChannel.perform('test', {})
  }

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
      <button onClick={test}>テスト</button>
      <form onSubmit={createComment}>
        <label>タイトル</label>
        <input name="name" title="name" type="text"/><br/>
        <label>本文</label><br/>
        <textarea name="comment" title="comment" rows={4} cols={40} defaultValue=""/>
        <button title="作成" type="submit">作成</button>
      </form>
    </>
  )
}

export default BoardComment
