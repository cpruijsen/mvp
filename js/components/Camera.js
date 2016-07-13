import {Entity} from 'aframe-react';
import React from 'react';
import 'aframe-extras';
var extras = require('aframe-extras');
extras.registerAll();

export default props => (
  <Entity id="cameraEnclosed" position="0 0 0">
    <Entity
      id="camera"
      camera="" // can use multiple cameras with active: true // false
      universal-controls=""
      // kinematic-body=""
      // `jump-ability="enableDoubleJump: true; distance: 2.5;"
      // velocity="0 0 0"
      {...props}/>

  {/*<Animation // TODO: add trigger / door.
      begin="back" dur="0" to="0 0 0"
      />*/}

  </Entity>
);

// ERROR: animation not defined -- check imports.
