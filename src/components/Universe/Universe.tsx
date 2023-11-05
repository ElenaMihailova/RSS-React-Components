import { useState, useEffect, useRef } from 'react';
import './Universe.css';

interface Star {
  key: number;
  className: string;
  style: object;
  ypos: number;
  speed: number;
  width: number;
}

const Universe: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const universeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    createAnimation();
  }, []);

  const createAnimation = () => {
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

    setStars(newStars);
  };

  return (
    <div ref={universeRef} id="universe">
      {stars.map((star) => (
        <div key={star.key} className={star.className} style={star.style}></div>
      ))}
    </div>
  );
};

export default Universe;
