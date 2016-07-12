# Hackreactor Connect - HR44 MVP Solo project

This project was built solo at Hack Reactor, Jul 11-12 2016.

## WebVR

Currently only a few browsers support Web VR - including https://nightly.mozilla.org/ and experimental Chrome builds. You can also use an Oculus Rift, if you're lucky enough to have one (and the hardware to back it)!

However, you can still navigate this in regular 3D using your standard web browser.

### Findings:

For detailed reports on lessons learned / insights into aframe and aframe-react as well as the other used component libraries, see `README-FINDINGS.md`


### This project makes use of aframe-react-boilerplate

An [aframe-react](https://github.com/ngokevin/aframe-react) boilerplate, combining [A-Frame](https://aframe.io) with React.

NOTE: this was used to save time on webpack and dependency setup, all react / aframe components provided were edited / customized / re-written.

To reiterate: all code to do with dynamically slicing data, rendering complex layouts and nested layouts, working with data etc was written custom for this project.

Feel free to use my modified version as a boilerplate for your projects!

### Getting Started

To get started:

```bash
npm install
npm run serve-js &
npm run serve
```

Then head over to localhost:5555.

### Publishing to GitHub Pages

Ready to show off? Run:

```bash
npm run ghpages
```

And share your project on the [A-Frame Slack](http://aframevr.slack.com/) and
[awesome-aframe](https://github.com/aframevr/awesome-aframe).
