// note there are nicer ways to render keyboards, but this already was quite the effort - little comes free in VR ;)

// included in the function that starts the game - startNameGame
this.setKeyBoardPosition();

// on state:
keyboardVisible: false,
keyBoardPositionLeft: "0 0 0",
keyBoardPositionRight: "0 0 0"

setKeyBoardPosition = () => {
  if (document.querySelector('a-entity[camera]')) {
     var cameraposition = document.querySelector('a-entity[camera]').object3D.position;
     var keyBoardPositionsBasedOnCamera = {
       xr: cameraposition.x + 0.5,
       xl: cameraposition.x + 2
     }
     this.setState({keyBoardPositionLeft: `${keyBoardPositionsBasedOnCamera.xl} ${cameraposition.y} ${cameraposition.z}`});
     this.setState({keyBoardPositionRight: `${keyBoardPositionsBasedOnCamera.xr} ${cameraposition.y} ${cameraposition.z}`});
  }
};

var keyBoard = {
  leftKeyBoard: ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V', 'T', 'ENTR' , 'DEL', 'HINT'],
  rightKeyBoard: ['P', 'O', 'I', 'U', 'H', 'J', 'K', 'L', 'B', 'G', 'M', 'N', 'Y', 'DEL' , 'ENTR', 'HINT']
};

{/* keyboard for nameGame */}
{/* right keyboard */}
{ <Entity id="keyboardRight"
          layout={{type: 'box', margin: '0.35', columns: '4'}}
          position={that.state.keyBoardPositionRight}
          look-at="#camera" >
    {keyBoard.rightKeyBoard.map(function(char) {
     return <Entity key={char} geometry="primitive: box"
                    scale="0.35 0.35 0.01"
                    material="color: grey"
                    visible={that.state.keyboardVisible}
                    onClick={() => that.addCharToNameString(char)} >
       <Entity text={`text: ${char}`}
         material="color: #FFD700"
         position="0. 0 0.75"
         scale="0.2 0.2 1"
         visible={that.state.keyboardVisible}> </Entity>
     </Entity>
   })}
 </Entity>
}

{/* left keyboard */}
{<Entity id="keyboardLeft"
         layout={{type: 'box', margin: '0.35', columns: '4'}}
         position={that.state.keyBoardPositionLeft}
         look-at="#camera" >
    {keyBoard.leftKeyBoard.map(function(char) {
     return <Entity key={char} geometry="primitive: box"
                    scale="0.35 0.35 0.01"
                    material="color: grey"
                    visible={that.state.keyboardVisible}
                    onClick={() => that.addCharToNameString(char)} >
       <Entity text={`text: ${char}`}
         material="color: #FFD700"
         position="0. 0 0.75"
         scale="0.2 0.2 1"
         visible={that.state.keyboardVisible}> </Entity>
     </Entity>
   })}
 </Entity>}
