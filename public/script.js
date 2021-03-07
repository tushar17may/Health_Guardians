const socket = io('/')
const videogrid = document.getElementById('video-grid')


//connection to peer server
const mypeer = new Peer(undefined, {
    host:'/',
    port: '3001'
})

// myvideo.muted=true is used to mute our video (cause we dont want to listen our voice :)

const myvideo = document.createElement('video')
myvideo.muted=true

// we need to keep track which people we had contacted
const peers= {}

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    addvideostream(myvideo, stream)

    //jab doosra banda call krta hai to use meri current video stream bhej do
    mypeer.on('call', call =>{
    call.answer(stream)
    const video = document.createElement('video')
    
    call.on('stream', uservideostream =>{
        addvideostream(video,uservideostream)
    })
})

socket.on('user-connected', userid => {
    // user is joining
    setTimeout(() => {
      // user joined
      connecttonewuser(userid, stream)
    }, 1000)
  })
})

socket.on('user-disconnected',userid=>{
        if(peers[userid])
        peers[userid].close();
})

//mypeer.on says as soon as we connect with our peer server and get back an id we want to run this code
mypeer.on('open', id =>{
    socket.emit('join-room', ROOM_ID , id)

})



// this is a function to add video stream
// video.srcObject = stream this will allow us to play our video
// video.addEventListener('loadedmetadata',()=>{    this says that once the video is loaded on our page we want to play the video

function addvideostream(video,stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videogrid.append(video)
}

// what this function does is its going to call a user that we give a certain id to and send our video and audio stream

// call.on(stream) this line says when the user sends us back their stream we're going to take in their video stram

function connecttonewuser(userid, stream)
{
    const call= mypeer.call(userid,stream)
    const video = document.createElement('video')
    call.on('stream', uservideostream =>{
        addvideostream(video,uservideostream)
    })
    call.on('close', ()=>{
        video.remove()
    })

    peers[userid] = call;
}