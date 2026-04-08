import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { phrases } from "../../utils/phrases";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = prev + 1;
        if (nextIndex === phrases.length - 1) {
          setIsFinished(true);
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isFinished]);

  const segments =
    phrases[index].match(/[\u2E80-\u9FFF\uFF00-\uFFEF]|\S+|\s+/g) || [];
  let delayCounter = 0;

  const morphicReveal = {
    hidden: {
      opacity: 0,
      filter: "blur(20px) contrast(120%)",
      scale: 0.9,
      y: 40,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px) contrast(100%)",
      scale: 1,
      y: 0,
      transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isFinished && (
          <motion.header
            className={styles.header}
            initial="hidden"
            animate="visible"
            variants={morphicReveal}
          >
            MMXXVI, PP
          </motion.header>
        )}
      </AnimatePresence>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          <AnimatePresence mode="popLayout">
            {segments.map((segment: string, segmentIndex: any) => {
              if (!segment.trim()) {
                return (
                  <span
                    key={`${index}-space-${segmentIndex}`}
                    className={styles.space}
                  >
                    &nbsp;
                  </span>
                );
              }

              return (
                <span
                  key={`${index}-word-${segmentIndex}`}
                  className={styles.word}
                >
                  {segment.split("").map((char) => {
                    const currentDelay = delayCounter * 0.04;
                    delayCounter++;

                    return (
                      <motion.span
                        key={`${index}-char-${delayCounter}`}
                        initial={{ opacity: 0, filter: "blur(12px)", y: 15 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{ opacity: 0, filter: "blur(12px)", y: -15 }}
                        transition={{ duration: 0.6, delay: currentDelay }}
                        className={styles.char}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </AnimatePresence>
        </h1>
      </main>

      <AnimatePresence>
        {isFinished && (
          <motion.footer
            className={styles.footerWrapper}
            initial="hidden"
            animate="visible"
            variants={morphicReveal}
          >
            <Link to="/selecionar-musica" className={styles.startButton}>
              Iniciar
            </Link>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
