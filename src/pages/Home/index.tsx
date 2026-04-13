import { motion } from "framer-motion";
import styles from "./index.module.css";
import SymbolIcon from "../../assets/Icons/symbol.png";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
} as const;

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
} as const;

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
} as const;

const letterVariants = {
  hidden: {
    opacity: 0,
    color: "#ffffff",
    textShadow: "0px 0px 20px rgba(255,255,255,1)",
    filter: "blur(10px)",
    y: 10,
  },
  visible: {
    opacity: 1,
    color: "#33362C",
    textShadow: "0px 0px 0px rgba(255,255,255,0)",
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const Home = () => {
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className={styles.char}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className={styles.header} variants={textContainerVariants}>
        <h1 className={styles.headerTitle}>{splitText("PP")}</h1>
        <h1 className={styles.headerTitle}>{splitText("PP")}</h1>
      </motion.header>

      <main className={styles.mainContent}>
        <div className={styles.ellipseWrapper}>
          <motion.div className={styles.ellipse} variants={fadeVariants}>
            <div className={styles.ellipseBorder}></div>

            <motion.div
              className={styles.ellipseContent}
              variants={textContainerVariants}
            >
              <p className={styles.contentTitle}>
                {splitText("SCRIPTA")}
                <br />
                {splitText("LUCIS")}
              </p>
              <button className={styles.contentButton}>
                <span className={styles.contentButtonText}>
                  {splitText("INICIAR")}
                </span>
              </button>
            </motion.div>

            <img
              src={SymbolIcon}
              alt="Adorno da elipse"
              className={styles.ellipseBottomImage}
            />
          </motion.div>
        </div>
      </main>

      <motion.footer className={styles.footer} variants={textContainerVariants}>
        <button className={styles.footerButton}>
          <span className={styles.justifiedLine}>{splitText("TERMOS")}</span>
          <span className={styles.justifiedLine}>{splitText("DE USO")}</span>
        </button>
        <button className={styles.footerButton}>
          <span className={styles.justifiedLine}>
            {splitText("POLÍTICA DE")}
          </span>
          <span className={styles.justifiedLine}>
            {splitText("PRIVACIDADE")}
          </span>
        </button>
      </motion.footer>
    </motion.div>
  );
};

export default Home;
