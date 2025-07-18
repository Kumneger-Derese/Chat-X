const chatHandler = (socket, io) => {
  socket.on('chat:msg', async data => {
    console.log({ data })
    io.emit('chat:res', {
      username: data.username,
      message: data.message,
      id: `chat-x-${Date.now()}`
    })
  })
}

export { chatHandler }
