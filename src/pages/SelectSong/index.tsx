import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { albumBlocks } from "../../utils/albumData";

const SelectSong = () => {
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const morphicTransition = {
    hidden: { opacity: 0, filter: "blur(20px)", scale: 0.95 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(20px)",
      scale: 1.05,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const itemTransition = {
    hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const activeBlock = albumBlocks.find((b) => b.id === activeBlockId);

  return (
    <div className={styles.container}>
      <header className={styles.viewHeader}>
        <motion.svg
          className={styles.headerIcon}
          viewBox="0 0 4500 4500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{ rotate: 180 }}
        >
          <path
            d="M1869 4111 c-676 -105 -1276 -632 -1507 -1324 -97 -290 -105 -715 -22 -1135 l43 -218 183 -257 184 -258 82 4 c70 4 103 -10 218 -92 75 -54 209 -128 298 -165 89 -37 176 -85 192 -106 27 -34 70 -40 402 -52 436 -16 527 -3 905 126 357 121 386 135 420 199 16 32 94 111 172 177 424 357 544 644 590 1409 16 252 37 475 49 496 42 79 -97 225 -214 225 -80 0 -145 56 -254 220 -341 513 -1117 848 -1741 751z m211 -260 c0 -65 -6 -71 -85 -91 -682 -176 -1028 -604 -989 -1226 35 -561 274 -866 804 -1025 99 -29 183 -56 186 -59 5 -5 -208 -356 -406 -670 l-50 -78 -145 61 c-1443 611 -1149 2844 412 3127 248 45 273 42 273 -39z m497 28 c320 -88 707 -371 904 -661 46 -67 118 -139 178 -178 159 -101 163 -123 165 -820 1 -450 -202 -922 -491 -1139 -128 -97 -148 -98 -284 -21 -154 88 -529 389 -507 407 4 4 67 36 139 71 231 112 450 325 548 532 108 231 139 727 54 887 -25 48 -40 101 -33 119 38 100 -535 545 -805 625 -85 25 -85 26 -85 122 0 115 3 116 217 56z m-473 -609 c15 -256 72 -1294 81 -1460 l5 -99 -96 -46 c-251 -119 -700 196 -834 585 -204 594 210 1292 750 1264 l80 -4 14 -240z m445 160 c171 -78 359 -239 405 -346 15 -37 54 -82 86 -100 70 -40 79 -71 80 -261 0 -390 -203 -759 -522 -948 -188 -111 -198 -107 -200 80 -1 85 -12 490 -25 900 -17 551 -17 745 0 745 12 0 91 -32 176 -70z m-338 -2510 l-1 -270 -160 -6 c-306 -11 -304 -25 -55 377 228 366 219 370 216 -101z m499 169 c149 -116 270 -220 270 -230 0 -28 -92 -69 -281 -127 -230 -70 -234 -69 -247 33 -18 148 -35 535 -23 535 6 0 133 -95 281 -211z"
            fill="currentColor"
          />
        </motion.svg>

        <h1 className={styles.headerTitle}>
          {!activeBlockId ? "Selecionar Bloco" : "Selecionar Faixa"}
        </h1>
      </header>

      <main className={styles.mainContent}>
        <AnimatePresence mode="wait">
          {!activeBlockId ? (
            <motion.div
              key="blocks-view"
              className={styles.listContainer}
              variants={morphicTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.blocksGrid}>
                {albumBlocks.map((block, index) => {
                  const [text, number] = block.title.split(" ");
                  const isLast = index === albumBlocks.length - 1;
                  // Angulação muito mais suave (max 4 graus) para manter centralizado
                  const randomAngle = Math.sin(index * 4) * 4;
                  const randomHeight = 35 + Math.abs(Math.cos(index) * 15);

                  return (
                    <div key={block.id} className={styles.blockWrapper}>
                      <motion.button
                        className={styles.blockItem}
                        variants={itemTransition}
                        onClick={() => setActiveBlockId(block.id)}
                      >
                        <span className={styles.blockText}>{text}</span>
                        <span className={styles.blockNumber}>{number}</span>
                      </motion.button>

                      {!isLast && (
                        <motion.div
                          variants={itemTransition}
                          className={styles.lineWrapper}
                        >
                          <div
                            className={styles.connectingLine}
                            style={{
                              height: `${randomHeight}px`,
                              transform: `rotate(${randomAngle}deg)`,
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="songs-view"
              className={styles.listContainer}
              variants={morphicTransition}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className={styles.backButton}
                variants={itemTransition}
                onClick={() => setActiveBlockId(null)}
              >
                RETORNAR
              </motion.button>

              <div className={styles.songsGrid}>
                {activeBlock?.songs.map((song, index) => {
                  const isLast = index === activeBlock.songs.length - 1;
                  const randomAngle = Math.sin(Number(song.id) * 4) * 4;
                  const randomHeight =
                    30 + Math.abs(Math.cos(Number(song.id)) * 20);

                  return (
                    <div key={song.id} className={styles.songWrapper}>
                      <motion.div
                        variants={itemTransition}
                        className={styles.motionWrapper}
                      >
                        <Link
                          to={`/musica/${song.id}`}
                          className={styles.songItem}
                        >
                          <div className={styles.songTitle}>
                            {song.title.split(" ").map((word, wordIndex) => (
                              <span
                                key={wordIndex}
                                className={styles.word}
                                style={{
                                  justifyContent:
                                    word.length === 1
                                      ? "center"
                                      : "space-between",
                                }}
                              >
                                {word.split("").map((char, charIndex) => (
                                  <span key={charIndex} className={styles.char}>
                                    {char}
                                  </span>
                                ))}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </motion.div>

                      {!isLast && (
                        <motion.div
                          variants={itemTransition}
                          className={styles.lineWrapper}
                        >
                          <div
                            className={styles.connectingLine}
                            style={{
                              height: `${randomHeight}px`,
                              transform: `rotate(${randomAngle}deg)`,
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={styles.footer}>MMXXVI, PP</footer>
    </div>
  );
};

export default SelectSong;
