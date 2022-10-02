import ActionCable from "actioncable"

const BoardComment = (props) => {
  const roomName: string = `Board${props.id}`
  const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
  const boardChannel = cable.subscriptions.create(
    { channel: 'BoardChannel', room: roomName },
    {
      received(response) {
        console.log(response)
      }
    }
  )
  const test = () => {
    boardChannel.perform('test', {})
  }
  return(
    <>
      aaaaaa
      <button onClick={test}>テスト</button>
    </>
  )
}

export default BoardComment
