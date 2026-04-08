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
          <motion.div
            className={styles.bgWrapper}
            initial="hidden"
            animate="visible"
            variants={morphicReveal}
          >
            <svg
              className={styles.backgroundIcon}
              viewBox="0 0 4500 4500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "rotate(180deg)" }}
            >
              <path
                d="M1869 4111 c-676 -105 -1276 -632 -1507 -1324 -97 -290 -105 -715 -22 -1135 l43 -218 183 -257 184 -258 82 4 c70 4 103 -10 218 -92 75 -54 209 -128 298 -165 89 -37 176 -85 192 -106 27 -34 70 -40 402 -52 436 -16 527 -3 905 126 357 121 386 135 420 199 16 32 94 111 172 177 424 357 544 644 590 1409 16 252 37 475 49 496 42 79 -97 225 -214 225 -80 0 -145 56 -254 220 -341 513 -1117 848 -1741 751z m211 -260 c0 -65 -6 -71 -85 -91 -682 -176 -1028 -604 -989 -1226 35 -561 274 -866 804 -1025 99 -29 183 -56 186 -59 5 -5 -208 -356 -406 -670 l-50 -78 -145 61 c-1443 611 -1149 2844 412 3127 248 45 273 42 273 -39z m497 28 c320 -88 707 -371 904 -661 46 -67 118 -139 178 -178 159 -101 163 -123 165 -820 1 -450 -202 -922 -491 -1139 -128 -97 -148 -98 -284 -21 -154 88 -529 389 -507 407 4 4 67 36 139 71 231 112 450 325 548 532 108 231 139 727 54 887 -25 48 -40 101 -33 119 38 100 -535 545 -805 625 -85 25 -85 26 -85 122 0 115 3 116 217 56z m-473 -609 c15 -256 72 -1294 81 -1460 l5 -99 -96 -46 c-251 -119 -700 196 -834 585 -204 594 210 1292 750 1264 l80 -4 14 -240z m445 160 c171 -78 359 -239 405 -346 15 -37 54 -82 86 -100 70 -40 79 -71 80 -261 0 -390 -203 -759 -522 -948 -188 -111 -198 -107 -200 80 -1 85 -12 490 -25 900 -17 551 -17 745 0 745 12 0 91 -32 176 -70z m-338 -2510 l-1 -270 -160 -6 c-306 -11 -304 -25 -55 377 228 366 219 370 216 -101z m499 169 c149 -116 270 -220 270 -230 0 -28 -92 -69 -281 -127 -230 -70 -234 -69 -247 33 -18 148 -35 535 -23 535 6 0 133 -95 281 -211z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

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
