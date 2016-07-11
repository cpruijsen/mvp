import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity geometry={{primitive: 'plane', width: 50, height: 50}}
          material={{color: "#395D33", shader: 'flat'}}
          opacity="75"
          position="0 0 0"
          rotation="-90 0 0"
          static-body
          scale="1 1 -1"/>
);
