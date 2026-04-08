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
              <motion.div
                className={styles.headerWrapper}
                variants={itemTransition}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d=""
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className={styles.headerTitle}>Selecione o Bloco</h1>
              </motion.div>

              {albumBlocks.map((block, index) => {
                const [text, number] = block.title.split(" ");
                const isLast = index === albumBlocks.length - 1;
                const randomX = Math.sin(index * 5) * 30;
                const randomHeight = 15 + Math.abs(Math.cos(index) * 20);

                return (
                  <div key={block.id} className={styles.itemWrapper}>
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
                            height: `${randomHeight}dvh`,
                            transform: `translateX(${randomX}px) rotate(${randomX / 10}deg)`,
                          }}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
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
                ← RETORNAR
              </motion.button>

              <motion.h2
                variants={itemTransition}
                className={styles.blockTitle}
              >
                {activeBlock?.title}
              </motion.h2>

              <div className={styles.songsGrid}>
                {activeBlock?.songs.map((song, index) => {
                  const isLast = index === activeBlock.songs.length - 1;
                  const randomX = Math.sin(Number(song.id) * 4) * 40;
                  const randomHeight =
                    5 + Math.abs(Math.cos(Number(song.id)) * 8);

                  return (
                    <div key={song.id} className={styles.itemWrapper}>
                      <motion.div variants={itemTransition}>
                        <Link
                          to={`/musica/${song.id}`}
                          className={styles.songItem}
                        >
                          <span className={styles.songTitle}>{song.title}</span>
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
                              height: `${randomHeight}dvh`,
                              transform: `translateX(${randomX}px) rotate(${randomX / 15}deg)`,
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
