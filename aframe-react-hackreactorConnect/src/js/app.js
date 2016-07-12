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
      color: '#ffffff',
      pyramidVisibility: false,
      score: 0,
      errorScore: 0,
      winVisible: false,
      instructionVisible: false,
      errorVisible: false,
      loseVisible: false,
      successVisible: false,
      currentPerson: 'Test User', // set this to the user on click
      nameString: '',
      keyboardVisible: false
    }
  }

  changeColor = () => {
    const colors = ['orange', 'yellow', 'green', 'blue', 'white'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  togglePyramidVisibility = () => {
    this.setState({pyramidVisibility: !this.state.pyramidVisibility});
  };

  startNameGame = (personName) => {
    this.setState({currentPerson: personName});
    this.setState({nameString: ''});
    // setting visibility of camera overlays and keyboard
    this.setState({instructionVisible: true});
    this.setState({keyboardVisible: true});
    this.setState({errorVisible: false});
    this.setState({successVisible: false});
    this.setState({winVisible: false});
    this.setState({loseVisible: false});
  };

  nameGame = () => {
    var name = this.state.nameString;
    var currentPerson = this.state.currentPerson;
    var currentPersonFirstName = currentPerson.slice(0, currentPerson.indexOf(' '));
    if (name === currentPerson) {
      this.setState({score: this.state.score + 1});
      if (this.state.score > 9) {
        this.setState({winVisible: true});
      }
      this.setState({successVisible: true});
    } else {
      this.setState({errorScore: this.state.errorScore + 1});
      if (this.state.errorScore > 9) {
        this.setState({loseVisible: true});
      } else {
        this.setState({errorVisible: true});
      }
      console.log(currentPersonFirstName, ' is not ', name);
    }
    this.setState({keyboardVisible: false});
    this.setState({instructionVisible: false});
  };

  addCharToNameString = (char) => {
    if (char === 'DEL') {
      return this.removeCharFromNameString();
    } else if (char === 'ENTR') {
      return this.nameGame();
    } else if (char === 'SPACE') {
      char = ' ';
    }
    this.setState({nameString: this.state.nameString + char});
  };

  removeCharFromNameString = () => {
    this.setState( {nameString: this.state.nameString.slice(0, this.state.nameString.length-1) });
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
          if (this.circleIterator === 0) {
            this.circleIterator = this.numCircles;
          } // at the end of the function to fix before any future events
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
            this.numBoxesUsedInPyramid = count;
            this.leftOverBoxes = n - count;
            this.sliceArr.push(count);
            return base-1;
          } else if (count > n) {
            return base - 2;
          } else {
            this.numBoxesUsedInPyramid = count;
            this.leftOverBoxes = n - count;
            this.sliceArr.push(count);
            return this.calculatePyramid(n, base + 1, count + base*base);
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
          if (!this.sliceArr[this.pyramidIterator]) {
            this.pyramidIterator = 0; // reset on mirrored pyramid creation.
          }
          this.pyramidSliceStart = this.numBoxesUsedInPyramid - this.sliceArr[this.pyramidIterator];
          if (this.sliceArr[this.pyramidIterator+1]) {
            this.pyramidSliceEnd = this.numBoxesUsedInPyramid - this.sliceArr[this.pyramidIterator+1];
          } else {
            this.pyramidSliceEnd = this.numBoxesUsedInPyramid; // so we don't get NaN
          }
          this.pyramidIterator++;
          this.pyramidCurrentN = Math.sqrt(this.pyramidSliceEnd - this.pyramidSliceStart);
        };

        obj[i].changePositionForPyramid = function(options) {
          options = options || {};
          if (options.mirrored) { // X and Z could go +1 instead ?

            if (this.pyramidIterator === 0) {
              this.pyramidMirroredPositionX = -10;
              this.pyramidMirroredPositionY = 0;
              this.pyramidMirroredPositionZ = i * 10 -20;
            }

            this.pyramidMirroredPositionX +=1;
            this.pyramidMirroredPositionY -=1;
            this.pyramidMirroredPositionZ +=1;
            this.pyramidMirroredPosition = `${this.pyramidMirroredPositionX} ${this.pyramidMirroredPositionY} ${this.pyramidMirroredPositionZ}`
          }
          if (this.pyramidIterator === 0) {
            this.pyramidPositionX = -10;
            this.pyramidPositionY = 1;
            this.pyramidPositionZ = i * 10 -20;
          }
          this.pyramidPositionX +=1;
          this.pyramidPositionY +=1;
          this.pyramidPositionZ +=1;
          this.pyramidPosition = `${this.pyramidPositionX} ${this.pyramidPositionY} ${this.pyramidPositionZ}`

        };
        // other shapes...
      }
      return obj;
    };
    var datamap = createDataMapObj();

    var keyBoard = {
      leftKeyBoard: ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V', 'T', 'SPACE' , 'DEL'],
      rightKeyBoard: ['P', 'O', 'I', 'U', 'H', 'J', 'K', 'L', 'B', 'G', 'M', 'N', 'Y', 'SPACE' , 'ENTR']
    };
    var keyBoardStartPosition = 0;
    var keyBoardPosition;
    var setKeyBoardPosition = function() {
    // TODO: improve.
      keyBoardStartPosition++;
      keyBoardPosition = `0 ${keyBoardStartPosition} 0`;
    }

    return (
      <Scene >
        {/*  NOTE: disabling physics, as there is no 'real need' in the current implementation and there are performance implications.

          scene: physics="debug: true" // also kinematic-body on camera
          <Entity geometry={{primitive: 'plane', width: 50, height: 50}}
                material={{color: "#395D33", shader: 'flat'}}
                transparent="true"
                opacity="100" // doesn't work atm...
                position="0 -1 0"
                rotation="-90 0 0"
                static-body
                scale="1 1 -1"/>
        */}

        <Camera>
          <Cursor/>
          <Entity text={`text: current score = ${that.state.score}`}
                  material="color: #66E1B4"
                  scale="0.1 0.1 0"
                  position="0.8 0.65 -1"  />
          <Entity text={`text: You win! Champ.`}
                  material="color: #FFD700"
                  scale="0.5 0.5 0"
                  visible={this.state.winVisible}
                  position="0.5 0.5 -1"  />
          <Entity text={`text: You lose! Try again.`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.loseVisible}
                  position="0.5 0.5 -1"  />
          <Entity text={`text: Wrong! Try again.`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.errorVisible}
                  position="0.5 0.5 -1" />
          <Entity text={`text: Great! Keep Going.`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.successVisible}
                  position="0.5 0.5 -1" />
          <Entity text={`text: first name :: ENTR`}
                  material="color: #66E1B4"
                  scale="0.1 0.1 0"
                  visible={this.state.instructionVisible}
                  position="-0.8 0.65 -1"  />
        </Camera>
        <Sky/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position={[-1, 1, 0]}/>
        <Entity light={{type: 'directional', intensity: 1}} position={[1, 1, 0]}/>

        {/* color toggle */}
        <Entity static-body onClick={that.ChangeColor} geometry="primitive: box"   material="color: grey" position="-8 0 1">
          <Entity text={`text: ChangeColor Click Me`}
                  position="0 1 0"
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  />
        </Entity>

        {/* keyboard for nameGame
          TODO: need to figure out optimal spot
          TODO: change depth of boxes.
        */}

        {_.map(keyBoard, function(side) {
          setKeyBoardPosition();
          return <Entity layout="type: 'box', margin: 1, columns: 4"
                         position={keyBoardPosition} >
            {side.map(function(char) {
             return <Entity key={char} geometry="primitive: box"
                            material="color: grey"
                            visible={that.state.keyboardVisible}
                            onClick={() => that.addCharToNameString(char)} >
               <Entity text={`text: ${char}`}
                 material="color: #FFD700"
                 position="0 0 0.5"
                 scale="0.1 0.1 0"
                 visible={that.state.keyboardVisible}
                />
             </Entity>
           })}
          </Entity>
        })}

        {/* cylinders */}

        {_.map(datamap, function(cohort) {
          return cohort.dataRangeCircles.map(function(i) {
            cohort.changePosForCylinder();
            cohort.determineSlicingCylinder({all: true}, i);
            return <Entity
              layout={{type: 'circle', radius: `${cohort.datacb}`}} position={cohort.circlePosition}
              visible={!that.state.pyramidVisibility} >
            {/*<Animation attribute="layout.radius" repeat="indefinite" to={`${cohort.datasq}`} direction="alternate" begin="5000"/>*/}
            {cohort.users.slice(cohort.circleSliceStart, cohort.circleSliceEnd).map(function(person) {
        // note: enabling text will cause the app to freeze,
        // as there are ~800 pictures being rendered, plus text (from the JSON)
              return <Entity key={person.id} data={person}
                  geometry="primitive: box"
                  onClick={() => {that.startNameGame(person.name)} }
                  material={{src: `url(${person.image})`, color: that.state.color}}>
                  <Entity text={`text:  ${person.name}`}
                          material="color: #66E1B4"
                          scale="0.3 0.3 0.3"
                          position="0 .5 -1"
                          look-at="#camera"
                          visible="false" />
                </Entity>; })}
              </Entity> })
        })}

        {/* for now moving pyramids out (makes for faster testing) */}
      </Scene>
    );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));
