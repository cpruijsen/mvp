{/* color toggle */}
{/*<Entity static-body onClick={that.ChangeColor} geometry="primitive: box"   material="color: grey" position="-8 0 1">
  <Entity text={`text: ChangeColor Click Me`}
          position="0 1 0"
          material="color: #af111c"
          scale="0.1 0.1 0"
          />
</Entity>*/}

changeColor = () => {
  const colors = ['orange', 'yellow', 'green', 'blue', 'white'];
  this.setState({
    color: colors[Math.floor(Math.random() * colors.length)],
  });
};
