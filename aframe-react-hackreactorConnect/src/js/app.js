import 'aframe';
import 'aframe-layout-component';
import 'babel-polyfill';
import 'aframe-text-component';
import 'aframe-physics-components';
import 'aframe-extras';
var extras = require('aframe-extras');
extras.registerAll();
import _ from 'underscore';
import data from './data/data'

import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import Floor from './components/Floor';
// ...

class BoilerplateScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'yellow',
      layout: 'circle',
      cohort: 0
    }
  }

  changeColor = () => {
    const colors = ['orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  changeLayout = () => {
  const layoutTypes = ['box', 'circle', 'cube', 'dodecahedron', 'line', 'pyramid'];
  this.setState({
    layout: layoutTypes[Math.floor(Math.random() * layoutTypes.length)],
  });
};

  changeCohort = () => {
    if (this.state.cohort < 2) {
      this.setState({cohort: this.state.cohort + 1});
    } else {
      this.setState({cohort: 0});
    }
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

  render () {

    var that = this;
    // layout shapes demo
    var currentLayoutOptions = that.getLayoutOptions();

    // general internal
    var len = data.length;
    var datasq = Math.floor(Math.sqrt(len)); // 43 => 6
    var datacb = Math.floor(Math.cbrt(len));
    var numCircles = Math.floor(len / 10); // arbitrary... for now.
    var dataRangeToSqrt = _.range(0, datasq + 1); // [0, 1, 2, 3, 4, 5, 6]
    var dataRangeToCbrt = _.range(0, datacb ); // 43 => [0, 1, 2, 3]
    var dataRangeCircles = _.range(0, numCircles); // 42 => [0, 1, 2, 3]
    var cohort = data[that.state.cohort].users;

    return (
      // TODO: make physics work
      // kinematic-body on camera, static body on floor and Sky
      // physics on Scene

      <Scene>
        <Camera><Cursor/></Camera>
        <Sky/>


        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

        {/* changeLayout control entity for layout test container */}
        <Entity onClick={that.changeLayout} geometry="primitive: cylinder" material="color: red" position="-10 0 1"> </Entity>

        {/* changeCohort control entity for layout test container */}
        <Entity onClick={that.changeCohort} geometry="primitive: cylinder" material="color: green" position="-13 0 1"> </Entity>

        {/* Layout tests container entity component */}
          <Entity
              layout={{type: `${that.state.layout}`,
              margin: `${currentLayoutOptions.margin}`,
              radius: `${currentLayoutOptions.radius}`,
              columns: `${currentLayoutOptions.columns}` }}
              position="0 1 0" >

          {cohort.map(function(person) {
            return <Entity key={person.id} data={person}
                    static-body="shape: box"
                    geometry="primitive: box"
                    material={{src: `url(${person.image})`, color: that.state.color}}
                    onClick={that.changeColor} >
              {/*<Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>*/}
            </Entity>; })}
          </Entity>

      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
