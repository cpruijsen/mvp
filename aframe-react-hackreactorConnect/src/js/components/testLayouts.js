import {Entity} from 'aframe-react';
import React from 'react';

changeLayout = () => {
const layoutTypes = ['box', 'circle', 'cube', 'dodecahedron', 'line', 'pyramid'];
this.setState({
  layout: layoutTypes[Math.floor(Math.random() * layoutTypes.length)],
});
};

getLayoutOptions = () => {
  if (this.state.layout === 'circle') {
    return {
      margin: 0,
      radius: 7,
      columns: 0
    };
  } else if (this.state.layout === 'box') {
    return {
      margin: 1.5,
      radius: 0,
      columns: 8
    };
  } else if (this.state.layout === 'line') {
    return {
      margin: 1.5,
      radius: 0,
      columns: 0
    };
  } else if (this.state.layout === 'dodecahedron') {
    return {
      margin: 0, // takes 20 (do deca) boxes
      radius: 20, // leaves rest in prev. config.
      columns: 0
    };
  } else if (this.state.layout === 'pyramid') {
    return {
      margin: 0,
      radius: 20, // renders 4 entity boxes into a pyramid
      columns: 0 // leaving the rest in the previous configuration.
    };
  } else if (this.state.layout === 'cube') {
    return {
      margin: 0, // as pyramid, using 6 boxes
      radius: 20, // rest is left in prev. config.
      columns: 0
    }
  }
};


// if used TODO more refactoring, depenencies etc.

/*
// changeCohort = () => {
//   if (this.state.cohort < 2) {
//     this.setState({cohort: this.state.cohort + 1});
//   } else {
//     this.setState({cohort: 0});
//   }
// };

var cohort = data[that.state.cohort].users;
var currentLayoutOptions = that.getLayoutOptions();
*/

{/* changeLayout control entity for layout test container */}
<Entity onClick={that.changeLayout} geometry="primitive: cylinder" material="color: red" position="-10 0 1"> </Entity>

{/* changeCohort control entity for layout test container
  TODO: need to debug.
  layout on change of data renders a new layout
  but this new layout cannot 'overlap' the old one
  so it might be better to instead remove and add a new layout

  <Entity onClick={that.changeCohort} geometry="primitive: cylinder" material="color: green" position="-13 0 1"> </Entity>
*/}

{/* Layout tests container entity component */}
  <Entity
      layout={{type: `${that.state.layout}`,
      margin: `${currentLayoutOptions.margin}`,
      radius: `${currentLayoutOptions.radius}`,
      columns: `${currentLayoutOptions.columns}` }}
      position="20 0 -10" >

  {cohort.map(function(person) {
    return <Entity key={person.id} data={person}
            // static-body="shape: box"
            geometry="primitive: box"
            material={{src: `url(${person.image})`, color: that.state.color}}
            onClick={that.changeColor} >
      <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>
    </Entity>; })}
  </Entity>
