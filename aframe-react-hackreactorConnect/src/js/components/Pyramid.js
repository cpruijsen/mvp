{/* visible toggle */}
{/*<Entity static-body onClick={that.togglePyramidVisibility} geometry="primitive: box"   material="color: red" position="-10 0 1">
  <Entity text={`text: Pyramids! Click Me`}
          material="color: #FFD700"
          scale="0.5 0.5 0"
          position="0 1 0"/>
</Entity>*/}

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
{/* {_.map(datamap, function(cohort) {
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
})} */}
