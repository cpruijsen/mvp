# lessons learnt during development of hackreactorconnect VR

### performance
- WebVR is very taxing for most devices (incl Mac), for this product I had to comment out all animations for it to render with physics (or vice versa).

I decided to **not use physics**.

Note: I have 240+ cubes rendering dynamically, in layouts, with pictures pulled from a third party site.

-

### dynamic rendering / layout changes / etc.
- dynamic `in-place` data changes for layout entities (so for example the pictures rendered on a layout entity's child components would change from being those of cohort 44 to cohort 45) is unpredictable in performance.
-- part of this probably stems from a different number of students per cohort and a lack of excess handling
-- another part is due to a-frame first rendering the new cubes before removing the old ones (or never removing the old ones), and compensating automatically for overlap / collission - this makes the new cubes render further away.

### dependencies
- it is very important to check which version of aframe you're running. I was using Aframe v0.2.x which requires Extras v1.x -- but npm install for Extras automatically installs Extras v2.x. Result: physics not working and no helpful errors at all (and a good amount of hours lost...).
- Considering this is a new and fast-developing technology this is not uncommon.
