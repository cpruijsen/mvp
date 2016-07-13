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
          material={{src: `url(${person.image})`, color: that.state.color}}
          onClick={that.changeColor} >
          <Entity text={`text:  ${person.name}`}
                  material="color: #66E1B4"
                  scale="0.3 0.3 0.3"
                  position="0 .5 -1"
                  look-at="#camera"
                  visible="false" />
        </Entity>; })}
      </Entity> })
})}
