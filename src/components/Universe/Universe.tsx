import React, { Component } from 'react';
import './Universe.css';

interface Star {
  key: number;
  className: string;
  style: object;
  ypos: number;
  speed: number;
  width: number;
}

interface UniverseState {
  stars: Star[];
}
class Universe extends Component<Record<string, never>, UniverseState> {
  universeRef: React.RefObject<HTMLDivElement>;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      stars: [],
    };
    this.universeRef = React.createRef();
  }

  componentDidMount() {
    this.createAnimation();
  }

  createAnimation() {
    const starCount = 400;
    const maxTime = 80;
    const { innerWidth: width, innerHeight: height } = window;
    const newStars = [];

    for (let i = 0; i < starCount; ++i) {
      const ypos = Math.round(Math.random() * height);
      const speed = 1800 * (Math.random() * maxTime + 3);

      const starClass = 'star' + (3 - Math.floor(speed / 1500 / 8));

      newStars.push({
        key: i,
        className: starClass,
        style: {
          backgroundColor: '#B4FEE7',
          animation: `moveStar ${speed}ms linear infinite`,
          animationDelay: `${Math.random() * -speed}ms`,
          top: `${ypos}px`,
        },
        ypos: ypos,
        speed: speed,
        width: width,
      });
    }

    this.setState({ stars: newStars });
  }

  render() {
    return (
      <div ref={this.universeRef} id="universe">
        {this.state.stars.map((star) => (
          <div
            key={star.key}
            className={star.className}
            style={star.style}
          ></div>
        ))}
      </div>
    );
  }
}

export default Universe;
