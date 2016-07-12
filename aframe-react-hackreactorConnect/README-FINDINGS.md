# lessons learnt during development of Hack Reactor Connect VR

### performance

WebVR is very taxing for most devices (incl Mac), for this product I had to comment out all animations to render with physics (or vice versa).

Note: I have 240+ cubes rendering dynamically, in layouts, with pictures pulled from a third party site.

- to that note, rendering my entire dataset at once (~800 pictures w names etc) in a custom layout is a challenge. **the app will literally freeze**

A better approach is to render only on command (this could be with a click handler, by stepping into another world, etc...)

### physics

Combining custom layouts with kinematic-body so the player can jump and feel like a real 'player' is buggy - custom layouts / moving layouts seem to render more of the gamefield non-traversable, so you'll get stuck in empty space etc.

### dynamic rendering / layout changes / etc.

Dynamic `in-place` data changes for layout entities (so for example the pictures rendered on a layout entity's child components would change from being those of cohort 44 to cohort 45) is unpredictable in performance.
- part of this probably stems from a different number of students per cohort and a lack of excess handling
- another part is due to a-frame first rendering the new cubes before removing the old ones (or never removing the old ones), and compensating automatically for overlap / collission - this makes the new cubes render further away.

### text inputs

Prompts/alerts will break the app, as you can't have such DOM events in VR.

**Keyboard has to be rendered in 3D**
- layout doesn't work directly on text entities, one needs to render primitives, which can have child text entities to indicate the key value.
- Click-handler must be on the primitive.

3D rendering (especially when using react to further abstract from the DOM) is tricky with nodes.

For example, one might want to dynamically position a keyboard based on player position.
One might think (based on the docs):
if(document.getElementById('camera')) {
  var camera = document.querySelector('a-entity[camera]').components.camera.camera;
  console.log(camera);
logs => `T…E.PerspectiveCamera` which is a DOM node without the aframe positioning you were hoping to access.

What does work: [in progress]

### dependencies

It is very important to check which version of aframe you're running. I was using Aframe v0.2.x which requires Extras v1.x -- but npm install for Extras automatically installs Extras v2.x. Result: physics not working and no helpful errors at all (and a good amount of hours lost...).

Considering this is a new and fast-developing technology this is not uncommon.

###
