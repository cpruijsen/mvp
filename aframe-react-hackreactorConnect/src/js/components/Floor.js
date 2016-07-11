import {Entity} from 'aframe-react';
import React from 'react';
// import 'aframe-extras';
// var extras = require('aframe-extras');
// extras.registerAll();

export default props => (
  <Entity geometry={{primitive: 'plane', width: 50, height: 50}}
          material={{color: "#395D33", shader: 'flat'}}
          opacity="75"
          position="0 0 0"
          rotation="-90 0 0"
          static-body
          scale="1 1 -1"/>
);
/*
various options:
<Entity id="floor" static-body="shape: box" geometry="primitive: box" depth="23" height="20" width="40" position="0 -0.5 0" material="color: #596C56;"/>

<a-grid static-body></a-grid>

<a-ocean static-body depth="23" height="20" width="40" position="0 -10 20"></a-ocean>

*/
