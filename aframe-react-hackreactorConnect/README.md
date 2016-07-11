# Hackreactor Connect - HR44 MVP Solo project



### findings:
- for detailed reports on lessons learned / insights into aframe and aframe-react as well as the other used component libraries, see `README-FINDINGS.md`

###




### This project makes use of aframe-react-boilerplate

- NOTE: this was used to save time on webpack and dependency setup, all react / aframe components provided were edited / customized / re-written.
- to reiterate: all code to do with dynamically slicing data, rendering complex layouts and nested layouts, working with data etc was written custom for this project.

An [aframe-react](https://github.com/ngokevin/aframe-react) boilerplate, combining [A-Frame](https://aframe.io) with React.

![](https://cloud.githubusercontent.com/assets/674727/11852092/08f52994-a3eb-11e5-86e1-e7b55bbad02b.png)

### Getting Started

To get started:

```bash
npm install
npm run serve-js &
npm run serve
```

Then head over to localhost:5555.

### Registering an A-Frame Component

With Webpack's ES6 module syntax:

```
import 'aframe';
import 'aframe-example-component';  // Some component on NPM.
```

### Publishing to GitHub Pages

Ready to show off? Run:

```bash
npm run ghpages
```

And share your project on the [A-Frame Slack](http://aframevr.slack.com/) and
[awesome-aframe](https://github.com/aframevr/awesome-aframe).
