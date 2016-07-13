import {Entity} from 'aframe-react';
import React from 'react';
// import 'aframe-extras';
// var extras = require('aframe-extras');
// extras.registerAll();

// TODO: CORS enabled starry sky image as material src: url()
// material={{color: "#73CFF0", shader: 'flat'}}

export default props => (
  <Entity geometry={{primitive: 'sphere', radius: 300}}
          material={{src: `url(https://firebasestorage.googleapis.com/v0/b/hackreactorconnect-vr.appspot.com/o/star_sky.png?alt=media&token=933387ef-dd6d-4573-b5ba-3a47dd5ee0fd)`}}
          scale="1 1 -1"
          static-body
          />
);
