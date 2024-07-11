import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../css/About/relatedProyectsCarousel.module.css";
import Image from "next/image";
import gsap from "gsap";

const images = [
  "https://tympanus.net/Development/ConnectedGrid/img/14.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/15.jpg",
  "https://tympanus.net/Development/ConnectedGrid/img/16.jpg",
];

type Props = {};

const RelatedProyectsCarrousel = (props: Props) => {
  const [selectedStep, setSelectedStep] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageBandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  const clickHandler = (number: number) => {
    console.log(number, selectedStep);

    let movement = "";
    let percentage = 0;

    if (number !== selectedStep) {
      movement = number > selectedStep ? "right" : "left";

      const maxNumber = Math.max(number, selectedStep);
      const minNumber = Math.min(number, selectedStep);

      percentage = (maxNumber - minNumber) * 32;

      setSelectedStep(number);
    }

    switch (movement) {
      case "right":
        gsap.to(imageBandRef.current, {
          x: `-=${percentage}%`,
          ease: "power1",
        });
        break;

      case "left":
        gsap.to(imageBandRef.current, {
          x: `+=${percentage}%`,
          ease: "power1",
        });
        break;

      default:
        console.log("nothing");
        break;
    }
  };

  return (
    <motion.div className={styles.main}>
      <motion.div className={styles.image_container}>
        <motion.div
          ref={imageBandRef}
          className={styles.image_wrapper}>
          {images.map((_, i) => (
            <span
              className={styles.single_image_container}
              key={i + 1}>
              <img
                style={{ scale: `${selectedStep !== i + 1 ? "0.8" : "1"}` }}
                className={styles.image}
                alt=""
                src={_}
              />
            </span>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className={styles.steps_container}>
        {new Array(3).fill("").map((_, i) => (
          <motion.div
            key={i + 1}
            onClick={() => clickHandler(i + 1)}
            style={{
              backgroundColor: `${selectedStep == i + 1 ? "grey" : "#3b3b3b"}`,
            }}
            className={`${styles.step} image_${i + 1}`}></motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RelatedProyectsCarrousel;
