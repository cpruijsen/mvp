// pyramids - createDataMapObj

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

{/* visible toggle */}
<Entity static-body onClick={that.togglePyramidVisibility} geometry="primitive: box"   material="color: red" position="-10 0 1">
  <Entity text={`text: Pyramids! Click Me`}
          material="color: #FFD700"
          scale="0.5 0.5 0"
          position="0 1 0"/>
</Entity>

togglePyramidVisibility = () => {
  this.setState({pyramidVisibility: !this.state.pyramidVisibility});
};

{/*pyramids and mirrored pyramids*/}
{_.map(datamap, function(cohort) {
  return cohort.sliceArr.map(function(i) {
    cohort.determineNforPyramid();
    cohort.changePositionForPyramid();
      return <Entity layout={{type: 'box', margin: '2', columns: `${cohort.pyramidCurrentN}`}}
        position={cohort.pyramidPosition}
        rotation="90 0 0"
        visible={that.state.pyramidVisibility} >
      {cohort.users.slice(cohort.pyramidSliceStart, cohort.pyramidSliceEnd).map(function(person) {
        return <Entity key={person.id}
          geometry="primitive: box"
          material={{src: `url(${person.image})`, color: `${that.state.color}`}}
          onClick={() => {that.nameGame(person.name)} } >
          <Entity text={`text:  ${person.name}`}
                  material="color: #66E1B4"
                  scale="0.3 0.3 0.3"
                  position="0 .5 -1"
                  look-at="#camera"
                  visible="false" />
        </Entity>
      })}
    </Entity>
  })
})}

{/* // === MIRRORED PYRAMIDS === // */}
{_.map(datamap, function(cohort) {
    cohort.sliceArr.map(function(i) {
      cohort.determineNforPyramid();
      cohort.changePositionForPyramid({mirrored: true});
        return <Entity layout={{type: 'box', margin: '2', columns: `${cohort.pyramidCurrentN}`}}
          position={cohort.pyramidMirroredPosition}
          rotation="90 0 0"
          visible={that.state.pyramidVisibility} >

        {cohort.users.slice(cohort.pyramidSliceStart, cohort.pyramidSliceEnd).map(function(person) {
          return <Entity key={person.id}
            geometry="primitive: box"

            material={{src: `url(${person.image})`, color: that.state.color}}>
            <Animation attribute="rotation" dur="5000" repeat="indefinite" to="0 360 360"/>
          </Entity>
        })}
      </Entity>
    })
})}
