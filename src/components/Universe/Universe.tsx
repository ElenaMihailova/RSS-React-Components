//source https://codepen.io/sacsam005/pen/BaJmaXy

import { Component } from 'react';
import './Universe.css';

class Universe extends Component {
  componentDidMount() {
    this.createAnimation();
  }

  createAnimation() {
    const starCount = 400;
    const maxTime = 80;
    const universe = document.getElementById('universe');

    if (!universe) {
      console.error('Element with id="universe" not found');
      return;
    }

    const { innerWidth: width, innerHeight: height } = window;

    for (let i = 0; i < starCount; ++i) {
      const ypos = Math.round(Math.random() * height);
      const star = document.createElement('div');
      const speed = 1800 * (Math.random() * maxTime + 3);

      const starClass = 'star' + (3 - Math.floor(speed / 1500 / 8));

      star.setAttribute('class', starClass);
      star.style.backgroundColor = '#B4FEE7';

      universe.appendChild(star);
      star.animate(
        [
          {
            transform: `translate3d(${width}px, ${ypos}px, 0)`,
          },
          {
            transform: `translate3d(-${Math.random() * 256}px, ${ypos}px, 0)`,
          },
        ],
        {
          delay: Math.random() * -speed,
          duration: speed,
          iterations: 1000,
        }
      );
    }
  }

  render() {
    return <div id="universe"></div>;
  }
}

export default Universe;
