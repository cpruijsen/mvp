# TODO:

### dynamic rendering
- [DONE] change structure of data.js
- [DONE] dynamically generate clusters of cubes for classes
- [DONE] images of students on cubes
- [DONE] enable color change
- [ ONLY ON TEST ] enable layout change on shapes
- [DONE] add names (text components) for cubes
- [DONE] render more than one complex layout shape
- [] Infoboxes / animated fields per person/cube
**currently no point, as we don't have more data.**
- render cylinders in a circle, for easier access

### gamefield
- [DONE] change dependency to either A-frame master (check if it works with Aframe-react) or Extras v1.x (to work with aframe v0.2.x)
- [DONE] set up floor (plane), sky (dome)
- [] transparency for floor
- [DONE] add gravity for player / camera
- [DONE] enable player jump
**note: disabled physics for performance**

### non-aframe:
- [] liberate and host publicly
- [] add login / auth
- [] store data.js in a database
- [] create a leaderboard // score for auth users

### stretch:
- [] add an api integration ( hhttps://developer.github.com/v3/search/#search-users ? ) and a room for displaying GET data.
- [] add https://www.fullcontact.com/developer/

### Misc:
- [] consolidate dependency management
- [] modularize components in separate files
- [DONE] create readme with step-by-step / lessons
- [DONE] request more data from HR
- [DONE] obtain richer data (github handles etc.)
- [DONE] rotate text based on player position (so always visible from front)
* You have to include the `#` in the id-selector for `look-at`, unlike in some other frameworks (such as jQuery...)
- [in progress] merge JSON allUsers and allData
**note: due to size of JSON files had to use fileSystem(fs), :/**

### idea: name game
- [DONE] click on a box to get a prompt
- [DONE] prompt asks for name of the person
- [DONE] display score positioned relative to camera
- [DONE] if correct global score ++
- [DONE] if incorrect global error++
- [DONE] if error >= 10, game over
- [DONE] if score >= 10, you win
- [DONE] enable game start by clicking on a cube
- [DONE] render a keyboard for the player to answer from
- [DONE] keyboard has a-z and delete/submit/space
- [DONE] keyboard renders/positions dynamically based on camera position

**note: keyboard was repositioning on each render to camera position, and this caused some janky behavior (you ideally only want it to render dynamically once on start game for each new person) - so I took the rendering out of the map function to handle them separately**

Solution: I ended up using state... although another solution would have been `<Animate begin="nameGame"/>` with `document.querySelector('#keyboardRight').emit('nameGame');`

- [DONE] game end on clicking submit
- [DONE] polish and make fun to play ;)
- [DONE] enable hints, improve game messages
- [] implement a max-hints or penalty for using hints

### future (super) Stretch
- [] Clarif.ai API for image tags, implement a memory type game where you have to select similar people
- [] find yourself (link to device camera?)
- [] add enemies
