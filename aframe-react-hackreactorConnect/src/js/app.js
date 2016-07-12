import 'aframe';
import 'aframe-layout-component';
import 'babel-polyfill';
import 'aframe-text-component';
import 'aframe-physics-components';
import 'aframe-extras';
var extras = require('aframe-extras');
extras.registerAll();
import _ from 'underscore';
import data from './data/allData'

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
      pyramidVisibility: false
      // layout: 'circle',
      // cohort: 0
    }
  }

  changeColor = () => {
    const colors = ['orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  togglePyramidVisibility = () => {
    this.setState({pyramidVisibility: !this.state.pyramidVisibility});
  };

  nameGame = (personName) => {
    console.log(personName);
    var name = prompt('namegame! who is this person?');
    if (name === personName) {
      console.log('success!')
    } else {
      console.log('wrong! ' + personName + 'is not called ' + name);
    }
  };

  render () {
    // general internal
    var that = this;
    // function to create an object which holds each cohort as a separate object, which includes functions and variables dependent on the length of that cohorts users array.
    // these are in turn used for dynamic layout and rendering.
    // TODO: refactor and import this from another file.
    var createDataMapObj = function() {
      var obj = {};
      var len = data.length;
      for (let i = 0; i < len; i++) {
        // general
        obj[i] = data[i];
        obj[i].len = obj[i].users.length;
        obj[i].datasq = Math.floor(Math.sqrt(obj[i].len));
        obj[i].datacb = Math.floor(Math.cbrt(obj[i].len));
        obj[i].numCircles = Math.floor(obj[i].len / 10);
        obj[i].dataRangeToSqrt = _.range(0, obj[i].datasq + 1);
        obj[i].dataRangeToCbrt = _.range(0, obj[i].datacb );
        // cylinders
        obj[i].dataRangeCircles = _.range(0, obj[i].numCircles);
        obj[i].circleIterator = obj[i].numCircles;
        obj[i].circleSliceStart = -10;
        obj[i].circleSliceEnd = 0;
        obj[i].circlePosition = 0;
        obj[i].changePosForCylinder = function() {
          this.circleIterator--;
          var z = i * 10 - 10; // so each dataset has a unique rendering position for the cylinders
          var position = this.dataRangeCircles[this.circleIterator];
          this.circlePosition = `10 ${position} ${z}`;
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
        // pyramids and mirrored pyramids
        obj[i].sliceArr = [];
        obj[i].numBoxesUsedInPyramid = 0;
        obj[i].leftOverBoxes = 0;
        obj[i].pyramidCurrentN =  0;
        obj[i].pyramidPosition = 0;
        obj[i].pyramidMirroredPosition = 0;
        obj[i].pyramidSliceStart = 0;
        obj[i].pyramidSliceEnd = 0;
        obj[i].pyramidIterator = 0;
        obj[i].calculatePyramid = function(n, base, count) {
          var count = count || 1;
          var base = base || 2;
          if (count === n) {
            obj[i].numBoxesUsedInPyramid = count;
            obj[i].leftOverBoxes = n - count;
            obj[i].sliceArr.push(count);
            return base-1;
          } else if (count > n) {
            return base - 2;
          } else {
            obj[i].numBoxesUsedInPyramid = count;
            obj[i].leftOverBoxes = n - count;
            obj[i].sliceArr.push(count);
            return obj[i].calculatePyramid(n, base + 1, count + base*base);
          }
        };
        obj[i].calculatePyramid(obj[i].len);
        obj[i].sliceArr = obj[i].sliceArr.reverse();
        obj[i].pyramidPositionX = -10;
        obj[i].pyramidPositionY = 1; // manipulates distance between pyramids
        obj[i].pyramidPositionZ = i * 10 -20;
        obj[i].pyramidMirroredPositionX = -10;
        obj[i].pyramidMirroredPositionY = 0;
        obj[i].pyramidMirroredPositionZ = i * 10 -20;
        obj[i].determineNforPyramid = function() {
          if (!obj[i].sliceArr[obj[i].pyramidIterator]) {
            obj[i].pyramidIterator = 0; // reset on mirrored pyramid creation.
          }

          obj[i].pyramidSliceStart = obj[i].numBoxesUsedInPyramid - obj[i].sliceArr[obj[i].pyramidIterator];
          if (obj[i].sliceArr[obj[i].pyramidIterator+1]) {
            obj[i].pyramidSliceEnd = obj[i].numBoxesUsedInPyramid - obj[i].sliceArr[obj[i].pyramidIterator+1];
          } else {
            obj[i].pyramidSliceEnd = obj[i].numBoxesUsedInPyramid; // so we don't get NaN
          }
          obj[i].pyramidIterator++;
          obj[i].pyramidCurrentN = Math.sqrt(obj[i].pyramidSliceEnd - obj[i].pyramidSliceStart);
        };

        obj[i].changePositionForPyramid = function(options) {
          options = options || {};
          if (options.mirrored) { // X and Z could go +1 instead ?
            obj[i].pyramidMirroredPositionX +=1;
            obj[i].pyramidMirroredPositionY -=1;
            obj[i].pyramidMirroredPositionZ +=1;
            obj[i].pyramidMirroredPosition = `${obj[i].pyramidMirroredPositionX} ${obj[i].pyramidMirroredPositionY} ${obj[i].pyramidMirroredPositionZ}`
          }
          obj[i].pyramidPositionX +=1; // on second iteration (mirrored) this shouldn't affect
          obj[i].pyramidPositionY +=1; // rendering of the first pyramid.
          obj[i].pyramidPositionZ +=1;
          obj[i].pyramidPosition = `${obj[i].pyramidPositionX} ${obj[i].pyramidPositionY} ${obj[i].pyramidPositionZ}`
        };

        // other shapes...

      }
      return obj;
    };
    var datamap = createDataMapObj();
    // {0: { }, 1: {}, 2: {}}
    // where 0:{group_name, group_id, users, len, ... }

    return (
      <Scene >

        {/*
          NOTE: disabling physics, as there is no 'real need' in the current implementation and there are performance implications.

          scene: physics="debug: true"

          <Entity geometry={{primitive: 'plane', width: 50, height: 50}}
                material={{color: "#395D33", shader: 'flat'}}
                transparent="true"
                opacity="100" // doesn't work atm...
                position="0 -1 0"
                rotation="-90 0 0"
                static-body
                scale="1 1 -1"/>
        */}

        <Camera><Cursor/></Camera>
        <Sky/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

        {/*insert other material here*/}

        {/* visible toggle */}
        <Entity static-body onClick={that.togglePyramidVisibility} geometry="primitive: box"   material="color: red" position="-10 0 1"> </Entity>

        {/* cylinders */}

        {/* cylinder 1 */}
        {datamap[0].dataRangeCircles.map(function(i) {
          datamap[0].changePosForCylinder();
          datamap[0].determineSlicingCylinder({all: true}, i);

          return <Entity
            layout={{type: 'circle', radius: `${datamap[0].datacb}`}} position={datamap[0].circlePosition}
            visible={!that.state.pyramidVisibility}

            >
          {/*<Animation attribute="layout.radius" repeat="indefinite" to={`${datamap[0].datasq}`} direction="alternate" begin="5000"/>*/}

          {datamap[0].users.slice(datamap[0].circleSliceStart, datamap[0].circleSliceEnd).map(function(person) {

            return <Entity key={person.id} data={person}
                geometry="primitive: box"

                material={{src: `url(${person.image})`, color: that.state.color}}
                onClick={that.changeColor} >
                <Entity text={`text:  ${person.name}`}
                        material="color: #66E1B4"
                        scale="0.3 0.3 0.3"
                        position="0 .5 -1"
                        look-at="#camera"
                        visible="true" />
              </Entity>; })}
            </Entity> })}

                {/*pyramids and mirrored pyramids*/}

                {/* pyramid 1 */}

                {datamap[0].sliceArr.map(function(i) {
                  datamap[0].determineNforPyramid();
                  datamap[0].changePositionForPyramid();
                    return <Entity layout={{type: 'box', margin: '2', columns: `${datamap[0].pyramidCurrentN}`}}
                      position={datamap[0].pyramidPosition}
                      rotation="90 0 0"
                      visible={that.state.pyramidVisibility} >

                    {datamap[0].users.slice(datamap[0].pyramidSliceStart, datamap[0].pyramidSliceEnd).map(function(person) {
                      return <Entity key={person.id}
                        geometry="primitive: box"

                        material={{src: `url(${person.image})`, color: 'orange'}}
                        onClick={() => {that.nameGame(person.name)} } >
                      </Entity>
                    })}
                  </Entity>
                })}

                {/*// === MIRRORED PYRAMID 1 === //*/}
                {datamap[0].sliceArr.map(function(i) {
                  datamap[0].determineNforPyramid();
                  datamap[0].changePositionForPyramid({mirrored: true});
                    return <Entity layout={{type: 'box', margin: '2', columns: `${datamap[0].pyramidCurrentN}`}}
                      position={datamap[0].pyramidMirroredPosition}
                      rotation="90 0 0"
                      visible={that.state.pyramidVisibility} >

                    {datamap[0].users.slice(datamap[0].pyramidSliceStart, datamap[0].pyramidSliceEnd).map(function(person) {
                      return <Entity key={person.id}
                        geometry="primitive: box"

                        material={{src: `url(${person.image})`, color: that.state.color}}
                        onClick={that.changeColor} >
                        {/*<Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>*/}
                      </Entity>
                    })}
                  </Entity>
                })}

      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
