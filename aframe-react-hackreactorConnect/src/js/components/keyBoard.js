/*
Two ways to do this
- nicer way: custom rendering
- fast way: box layouts of planes / flat cubes for left && right.

var keyBoard = {
  leftKeyBoard: [ ['Q', 'W', 'E', 'R'], ['A', 'S', 'D', 'F'], ['Z', 'X', 'C', 'V'] ],
  leftKeyBottom: ['T', 'SPACE' , 'DEL'],
  rightKeyBoard: [['P', 'O', 'I', 'U'], ['H', 'J', 'K', 'L'], ['B', 'G', 'M', 'N']],
  rightKeyBottom: ['Y', 'SPACE' , 'DEL']
};


// 4 *
<Entity text={`text: ${char}`}
  material="color: #FFD700"
  scale="0.1 0.1 0"
  visible={this.state.keyboardVisible}
  position={dynamic}/>

// 3 *
<Entity text={`text: ${char}`}
  material="color: #FFD700"
  scale="0.133 0.133 0"
  visible={this.state.keyboardVisible}
  position={dynamic}/>


*/
