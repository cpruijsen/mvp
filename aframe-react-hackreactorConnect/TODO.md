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
**currently no point, as we don't have more data.**

### gamefield
- [DONE ] change dependency to either A-frame master (check if it works with Aframe-react) or Extras v1.x (to work with aframe v0.2.x)
- [DONE ] set up floor (plane), sky (dome)
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
- [] add an api integration ( linkedin ? ) and a room for displaying GET data.

### Misc:
- [] consolidate dependency management
- [DONE] create readme with step-by-step / lessons
- [] request more (and richer) data from HR
- [DONE] rotate text based on player position (so always visible from front)
* I'm not too happy with look-at performance. Might be related to the text entity colliding somehow with the boxes.

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
- [DONE] game end on clicking submit
- [] polish and make fun to play ;)

### future (super) Stretch
- [] Clarif.ai API for image tags, implement a memory type game where you have to select similar people
- [] find yourself (link to device camera?)
- [] add enemies
