import React from "react";
import Jitsi from 'react-jitsi'

const VideoCall = ({ code, username }) =>{
    return (
      <div>   
        <Jitsi containerStyle={{ width: '1200px', height: '800px' }} frameStyle={{ display: 'block',width: '100%',height: '100%'}} code={code} username={username} />
      </div>
    );
  }
  
  export default VideoCall;