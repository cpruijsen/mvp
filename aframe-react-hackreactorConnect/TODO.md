# TODO:

### dynamic rendering
- [DONE ] change structure of data.js
- [DONE ] dynamically generate clusters of cubes for classes
- [DONE ] images of students on cubes
- [ DONE ] enable color change
- [ ONLY ON TEST ] enable layout change on shapes
- [DONE ] add names (text components) for cubes
- [DONE] render more than one complex layout shape
- [] Infoboxes / animated fields per person/cube
* currently no point, as we don't have more data.

### gamefield
- [DONE ] change dependency to either A-frame master (check if it works with Aframe-react) or Extras v1.x (to work with aframe v0.2.x)
- [DONE ] set up floor (plane), sky (dome)
- [] transparency for floor
- [DONE] add gravity for player / camera
- [DONE] enable player jump
**note: disabled physics for performance**

### non-aframe:
- [] add login / auth
- [] store data.js in a database
- [] ...

### stretch:
- [] add an api integration ( linkedin ? ) and a room for displaying GET data.

### Misc:
- [] consolidate dependency management
- [] create readme with step-by-step
- [] request more (and richer) data from HR
- [DONE] rotate text based on player position (so always visible from front)
* I'm not too happy with look-at performance. Might be related to the text entity colliding somehow with the boxes.

### idea: name game
- [DONE] click on a box to get a prompt
- [DONE] prompt asks for name of the person
- [DONE] display score positioned relative to camera
- [] if correct global score ++
- [] if incorrect global error++
- [] if error > 10, game over
- [] if score > 40, you win
- [] enable game start by clicking on a cube
- [] render a keyboard for the player to answer from
- [] keyboard has a-z and delete/submit/space
- [] game end on clicking submit

### future (super) Stretch
- [] Clarif.ai API for image tags, implement a memory type game where you have to select similar people
- [] find yourself (link to device camera?)
- [] add enemies
