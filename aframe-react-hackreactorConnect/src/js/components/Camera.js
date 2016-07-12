import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-extras';
var extras = require('aframe-extras');
extras.registerAll();

export default props => (
  <Entity>
    <Entity
      id="camera"
      position="0 0 0"
      camera="active:true"
      universal-controls=""
      // kinematic-body=""
      // jump-ability="enableDoubleJump: true; distance: 2.5;"
      // velocity="0 0 0"
      {...props}/>

  {/*<Animation // TODO: add trigger / door.
      begin="back" dur="0" to="0 0 0"
      />*/}

  </Entity>
);

// ERROR: animation not defined -- check imports.
