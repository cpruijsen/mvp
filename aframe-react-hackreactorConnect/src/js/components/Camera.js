import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity>
    <Entity
      position="0 1 0"
      camera=""
      //look-controls=""
      //wasd-controls=""
      universal-controls
      // kinematic-body
      // jump-ability="enableDoubleJump: true; distance: 2;"
      {...props}/>
    {/*<Animation // TODO: add trigger / door.
      begin="back" dur="0" to="0 0 0"
      />*/}

  </Entity>
);

// ERROR: animation not defined -- check imports.
