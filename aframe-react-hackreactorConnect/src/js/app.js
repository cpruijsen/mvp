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

  // changeCohort = () => {
  //   if (this.state.cohort < 2) {
  //     this.setState({cohort: this.state.cohort + 1});
  //   } else {
  //     this.setState({cohort: 0});
  //   }
  // };

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
    // general internal
    var that = this;
    var currentLayoutOptions = that.getLayoutOptions();

    // function to create an object which holds each cohort as a separate object, which includes functions and variables dependent on the length of that cohorts users array.
    // these are in turn used for dynamic layout and rendering.
    // TODO: refactor and import this from another file.
    var createDataMapObj = function() {
      var obj = {};
      var len = data.length;
      for (let i = 0; i < len; i++) {
        obj[i] = data[i];
        obj[i].len = obj[i].users.length;
        obj[i].datasq = Math.floor(Math.sqrt(obj[i].len));
        obj[i].datacb = Math.floor(Math.cbrt(obj[i].len));
        obj[i].numCircles = Math.floor(obj[i].len / 10);
        obj[i].dataRangeCircles = _.range(0, obj[i].numCircles);
        obj[i].circleIterator = obj[i].numCircles;
        obj[i].circleSliceStart = -10;
        obj[i].circleSliceEnd = 0;
        obj[i].circlePosition = 0;
        obj[i].changePosForCylinder = function() {
          this.circleIterator--;
          var z = i * 10 + 10; // so each dataset has a unique rendering position for the cylinders
          var position = this.dataRangeCircles[this.circleIterator];
          this.circlePosition = `0 ${position} ${z}`;
        };
        obj[i].determineSlicingCylinder = function(options, i) {
          if (options.all) { // renders remaining people
            this.circleSliceStart += 10;
            if (i === this.numCircles - 1) {
              // this makes for very ugly cylinders.
              this.circleSliceEnd = this.circleSliceStart + 10 + (this.len % 10);
            } else {
              this.circleSliceEnd = this.circleSliceStart + 10;
            }
          } else {
            this.circleSliceStart += 10;
            this.circleSliceEnd = this.circleSliceStart + 10;
          }
        };
      }
      return obj;
    };
    var datamap = createDataMapObj();
    // {0: { }, 1: {}, 2: {}}
    // where 0:{group_name, group_id, users, len, ... }

    // var len = data.length;
    // var datasq = Math.floor(Math.sqrt(len)); // 43 => 6
    // var datacb = Math.floor(Math.cbrt(len));
    // var dataRangeToSqrt = _.range(0, datasq + 1); // [0, 1, 2, 3, 4, 5, 6]
    // var dataRangeToCbrt = _.range(0, datacb ); // 43 => [0, 1, 2, 3]

    // NOTE: not so functional atm. dynamic data switch.
    var cohort = data[that.state.cohort].users;

    return (
      // TODO: make physics work w/ jump and collision
      // `kinematic-body` on camera, `static-body` on floor and Sky
      // `physics` on Scene

      <Scene>
        <Camera><Cursor/></Camera>
        <Sky/>


        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

        {datamap[0].dataRangeCircles.map(function(i) {
          datamap[0].changePosForCylinder();
          datamap[0].determineSlicingCylinder({all: true}, i);

          return <Entity layout={{type: 'circle', radius: `${datamap[0].datacb}`}} position={datamap[0].circlePosition}>
          <Animation attribute="layout.radius" repeat="indefinite" to={`${datamap[0].datasq}`} direction="alternate" begin="5000"/>

          {datamap[0].users.slice(datamap[0].circleSliceStart, datamap[0].circleSliceEnd).map(function(person) {

            return <Entity key={person.id} data={person}
                geometry="primitive: box"
                material={{src: `url(${person.image})`, color: that.state.color}}
                onClick={that.changeColor} >
                {/*<Entity text={`text:  ${person.name}`}
                        material="color: #66E1B4"
                        scale="0.3 0.3 0.3"
                        position="0 .5 -1"
                        rotation="0 180 0"
                        visible="true"
                </Entity>*/}
              </Entity>; })}
            </Entity> })}

          {datamap[1].dataRangeCircles.map(function(i) {
            datamap[1].changePosForCylinder();
            datamap[1].determineSlicingCylinder({all: true}, i);

            return <Entity layout={{type: 'circle', radius: `${datamap[1].datacb}`}} position={datamap[1].circlePosition}>
            <Animation attribute="layout.radius" repeat="indefinite" to={`${datamap[1].datasq}`} direction="alternate" begin="5000"/>

            {datamap[1].users.slice(datamap[1].circleSliceStart, datamap[1].circleSliceEnd).map(function(person) {

              return <Entity key={person.id} data={person}
                  geometry="primitive: box"
                  material={{src: `url(${person.image})`, color: that.state.color}}
                  onClick={that.changeColor} >
                  {/*<Entity text={`text:  ${person.name}`}
                          material="color: #66E1B4"
                          scale="0.3 0.3 0.3"
                          position="0 .5 -1"
                          rotation="0 180 0"
                          visible="true" </Entity>*/}
                </Entity>; })}
              </Entity> })}

            {datamap[2].dataRangeCircles.map(function(i) {
              datamap[2].changePosForCylinder();
              datamap[2].determineSlicingCylinder({all: true}, i);

              return <Entity layout={{type: 'circle', radius: `${datamap[2].datacb}`}} position={datamap[2].circlePosition}>
              <Animation attribute="layout.radius" repeat="indefinite" to={`${datamap[2].datasq}`} direction="alternate" begin="5000"/>

              {datamap[2].users.slice(datamap[2].circleSliceStart, datamap[2].circleSliceEnd).map(function(person) {

                return <Entity key={person.id} data={person}
                    geometry="primitive: box"
                    material={{src: `url(${person.image})`, color: that.state.color}}
                    onClick={that.changeColor} >
                    {/*<Entity text={`text:  ${person.name}`}
                            material="color: #66E1B4"
                            scale="0.3 0.3 0.3"
                            position="0 .5 -1"
                            rotation="0 180 0"
                            visible="true" </Entity>*/}
                  </Entity>; })}
                </Entity> })}




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

      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
