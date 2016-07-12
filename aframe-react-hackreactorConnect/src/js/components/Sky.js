import {Entity} from 'aframe-react';
import React from 'react';
// import 'aframe-extras';
// var extras = require('aframe-extras');
// extras.registerAll();

// TODO: CORS enabled starry sky image as material src: url()

export default props => (
  <Entity geometry={{primitive: 'sphere', radius: 300}}
          material={{color: "#73CFF0", shader: 'flat'}}
          scale="1 1 -1"
          static-body
          />
);
