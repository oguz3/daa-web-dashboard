import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import styles from './Hero.module.scss';

const Hero = () => {
  const comp = useRef();
  const tl = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: '#ImgWrapper',
            start: '0% 0%',
            end: '100% 0%',
            pin: '#ImgWrapper',
            scrub: 4,
          },
        })
        .to('#ImgWrapper #img7', { transform: 'translateZ(4500px)' }, 0)
        .to('#ImgWrapper #img6', { transform: 'translateZ(3700px)' }, 0)
        .to('#ImgWrapper #img5', { transform: 'translateZ(3100px)' }, 0)
        .to('#ImgWrapper #img4', { transform: 'translateZ(2800px)' }, 0)
        .to('#ImgWrapper #img3', { transform: 'translateZ(2600px)' }, 0)
        .to('#ImgWrapper #img2', { transform: 'translateZ(2400px)' }, 0)
        .to('#ImgWrapper #img1', { transform: 'translateZ(2200px)' }, 0)
        .from('#codeby a', { y: 130, opacity: 0 }, 0.31);
    }, comp);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <div ref={comp}>
      <div id="wrapper" className={styles.wrapper}>
        <h1>
          The Best Part <br /> <span>Digital Assistant Mirror</span>
        </h1>
        <p>Scroll Down</p>
      </div>
      <div id="ImgWrapper" className={styles.img_wrapper}>
        <img
          id="img5"
          className={styles.img_5}
          src="https://cdn.dribbble.com/users/907812/screenshots/4002808/smart-mirror_shot.png"
          alt=""
        />
        <img
          id="img3"
          className={styles.img_3}
          src="https://i.pinimg.com/564x/76/ca/84/76ca84414d00a8d2bb65073d47bb0e1e.jpg"
          alt=""
        />
        <img
          id="img6"
          className={styles.img_6}
          src="https://i.pinimg.com/564x/58/02/51/580251b6b7d47d85d021e8f07e90bf6e.jpg"
          alt=""
        />
        <img
          id="img7"
          className={styles.img_7}
          src="https://i.pinimg.com/564x/ac/ab/12/acab126cc24fe7eb73d3ac94bfa1dee4.jpg"
          alt=""
        />
        <img
          id="img4"
          className={styles.img_4}
          src="https://i.pinimg.com/564x/36/b0/e8/36b0e887d16174b8a8f30ed1529a6b70.jpg"
          alt=""
        />

        <img
          id="img1"
          className={styles.img_1}
          src="https://cdn.dribbble.com/users/1182081/screenshots/4002769/smart_mirror_800x600.gif"
          alt=""
        />
        <img
          id="img2"
          className={styles.img_2}
          src="https://cdn.dribbble.com/users/829956/screenshots/4002875/smart_mirror_by_ana_sakac_800x600.png"
          alt=""
        />

        <div id="codeby">
          <p>
            Everything you <span>need</span> for your home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
