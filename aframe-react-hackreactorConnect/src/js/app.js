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
      errorScoreVisible: false,
      hintVisible: false,
      hintName: '',
      hintNameIndex: 0,
      loseVisible: false,
      successVisible: false,
      currentNameStringVisible: false,
      currentPerson: 'Test User', // set this to the user on click
      currentPersonGitHub: '',
      currentPersonGitHubVisible: false,
      nameString: '',
      keyboardVisible: false
    }
  }

  startNameGame = (personName, personGitHub) => {

    // if (this.state.currentPerson === personName) {
    //   this.setState({currentPersonGitHubVisible: true});
        //  this.setState({currentPersonGitHub: personGitHub});
    // }

    this.setState({currentPerson: personName});
    this.setState({nameString: ''});
    // setting visibility of camera overlays and keyboard
    this.setState({instructionVisible: true});
    this.setState({keyboardVisible: true});
    this.setState({currentNameStringVisible: true});
    this.setState({errorVisible: false});
    this.setState({successVisible: false});
    this.setState({winVisible: false});
    this.setState({loseVisible: false});
  };

  nameGame = () => {
    var name = this.state.nameString.toLowerCase();
    var currentPerson = this.state.currentPerson.toLowerCase();
    var currentPersonFirstName = currentPerson.slice(0, currentPerson.indexOf(' '));
    if (name === currentPersonFirstName) {
      this.setState({score: this.state.score + 1});
      if (this.state.score > 4) {
        this.setState({winVisible: true});
      }
      this.setState({successVisible: true});
    } else {
      this.setState({errorScore: this.state.errorScore + 1});
      if (this.state.errorScore > 4) {
        this.setState({loseVisible: true});
      } else {
        this.setState({errorVisible: true});
        this.setState({errorScoreVisible: true});
      }
    }
    this.setState({keyboardVisible: false});
    this.setState({instructionVisible: false});
    this.setState({hintNameIndex: 0});
    this.setState({hintName: ''});
    this.setState({hintVisible: false});
    // this.setState({currentPersonGitHubVisible: false})
  };

  addCharToNameString = (char) => {
    if (char === 'DEL') {
      return this.removeCharFromNameString();
    } else if (char === 'ENTR') {
      return this.nameGame();
    } else if (char === 'SPACE') { // removed spaces for now, no need.
      char = ' ';
    } else if (char === 'HINT') {
      return this.getHint();
    }
    this.setState({nameString: this.state.nameString + char});
  };

  removeCharFromNameString = () => {
    this.setState( {nameString: this.state.nameString.slice(0, this.state.nameString.length-1) });
  };

  getHint = () => {
    this.setState({hintVisible: true});
    var newChar = this.state.currentPerson.slice(this.state.hintNameIndex, this.state.hintNameIndex + 1);
    this.setState({hintName: this.state.hintName + newChar});
    this.setState({hintNameIndex: this.state.hintNameIndex + 1});
  };

  // fetchGitHub = () => {
  //   var handle = this.state.currentPersonGitHub;
  //   // NOTE: need to get a client ID etc for github and insert into fetch.
  //
  // };

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
          if ( i < len / 2) {
            var x = -i;
            var z = -5 + i * 3;
          } else {
            var x = i;
            var z = -24 + i*3;
          }
           // so each dataset has a unique rendering position for the cylinders
          var position = this.dataRangeCircles[this.circleIterator];
          this.circlePosition = `${x} ${position} ${z}`;
          if (this.circleIterator === 0) {
            this.circleIterator = this.numCircles;
          } // at the end of the function to fix before any future events
        };
        obj[i].determineSlicingCylinder = function(options, i) {
          if (options.all) {
            this.circleSliceStart += 10;
            if (i === this.numCircles - 1) {
              this.circleSliceEnd = this.circleSliceStart + 10 + (this.len % 10);
            } else {
              this.circleSliceEnd = this.circleSliceStart + 10;
            }
          } else {
            this.circleSliceStart += 10;
            this.circleSliceEnd = this.circleSliceStart + 10;
          }
        };
        // other shapes...
      }
      return obj;
    };
    var datamap = createDataMapObj();

    var keyBoard = {
      leftKeyBoard: ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V', 'T', 'ENTR' , 'DEL', 'HINT'],
      rightKeyBoard: ['P', 'O', 'I', 'U', 'H', 'J', 'K', 'L', 'B', 'G', 'M', 'N', 'Y', 'DEL' , 'ENTR', 'HINT']
    };
    var keyBoardStartPosition = -1;
    var keyBoardPosition;
    var keyBoardRotation = "0 0 0";
    var setKeyBoardPosition = function() {    // TODO: improve.
      // camera - how to get node access?
      // try document.querySelector('a-entity[camera]').object3D.position

      keyBoardStartPosition +=1.5;
      keyBoardPosition = `${keyBoardStartPosition} 0 0`;
      if (keyBoardStartPosition > 0.5) {
        keyBoardRotation = "0 -90 0";
      }
    };

    return (
      <Scene>
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
        {/*
          TODO: modularize || template the below
          TODO: add a 'click twice, show github profile! mention after click1'
        */}
        <Camera>
          <Cursor/>
          <Entity text={`text: current score = ${this.state.score}`}
                  material="color: #66E1B4"
                  scale="0.1 0.1 0"
                  position="0.8 0.65 -1"  />
          <Entity text={`text: current name = ${this.state.nameString}`}
                  material="color: #66E1B4"
                  scale="0.1 0.1 0"
                  visible={this.state.currentNameStringVisible}
                  position="-0.25 0.65 -1"  />
          <Entity text={`text: HINT = ${this.state.hintName}`}
                  material="color: #000080"
                  scale="0.1 0.2 0"
                  visible={this.state.hintVisible}
                  position="-0.25 0.35 -1"  />
          <Entity text={`text: You win! Champ.`}
                  material="color: #FFD700"
                  scale="0.5 0.5 0"
                  visible={this.state.winVisible}
                  position="0 0 -1"  />
          <Entity text={`text: You lose! Try again.`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.loseVisible}
                  position="0.5 0.5 -1"  />
          <Entity text={`text: Wrong! Try again.`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.errorVisible}
                  position="0.5 0.1 -1" />
          <Entity text={`text: Errors = ${this.state.errorScore}`}
                  material="color: #af111c"
                  scale="0.1 0.1 0"
                  visible={this.state.errorScoreVisible}
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

        {/* github profile pane */}
      {/*<Entity
        id="gitHubProfilePanel"
        visible={currentPersonGitHubVisible}
        geometry="primitive: box, " >

        <Entity
          id="gitHubProfilePanelText"
          scale="0.35 0.35 0.01"
          material="color: grey"
          text={`text: ${currentPersonGitHub}`}
          // TODO: change the text=... to a render of the github profile.
          />
    </Entity>*/}


        {/* keyboard for nameGame
          TODO: need to figure out optimal spot
          TODO: change depth of boxes.
        */}

        {_.map(keyBoard, function(side) {
          setKeyBoardPosition();
          return <Entity layout={{type: 'box', margin: '0.35', columns: '4'}}
                         position={keyBoardPosition}
                         rotation={keyBoardRotation}
                         >
            {side.map(function(char) {
             return <Entity key={char} geometry="primitive: box"
                            scale="0.35 0.35 0.01"
                            material="color: grey"
                            visible={that.state.keyboardVisible}
                            onClick={() => that.addCharToNameString(char)} >
               <Entity text={`text: ${char}`}
                 material="color: #FFD700"
                 position="0. 0 0.75"
                 scale="0.2 0.2 1"
                 visible={that.state.keyboardVisible}
                />
             </Entity>
           })}
          </Entity>
        })}

        {/* cylinders - disabled animation for performance. */}

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

        // TODO: add argument person.handle to onClick
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
