import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useAudience } from "../context/AudienceContext";
import "../styles/Style_Home.css";

type HomeProps = { isVolunteer?: boolean };

function Home({ isVolunteer: propIsVolunteer }: HomeProps = {}) {
  const audience = useAudience();
  const isVolunteer = propIsVolunteer ?? audience.isVolunteer;
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // GTA 6 / Apple-style parallax: conteúdo desliza com inércia e dissolve suavemente no scroll
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`home ${isVolunteer ? "volunteer" : ""}`}
    >
      <motion.div
        className="content"
        style={
          shouldReduceMotion
            ? undefined
            : { y: yContent, opacity: opacityContent }
        }
      >
        <motion.p
          className="eyebrow"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 16, filter: "blur(6px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          PROJETO DE EXTENSÃO UNIVERSITÁRIA DA UNICAMP
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={isVolunteer ? "volunteer" : "school"}
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0, y: 20, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              shouldReduceMotion
                ? undefined
                : { opacity: 0, y: -16, filter: "blur(6px)" }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {isVolunteer ? (
              <>
                <h1>
                  Ganhe <span>60 horas</span> de extensão para se formar semeando
                  talentos pela programação
                </h1>
                <p>
                  Torne-se voluntário do Semeia Code, desenvolva sua liderança,
                  ensine programação em escolas públicas e conclua suas horas de
                  extensão com propósito.
                </p>
              </>
            ) : (
              <>
                <h1>
                  Estude com os melhores alunos da <span>América Latina</span>
                </h1>
                <p>
                  Levamos programação para escolas públicas com aulas gratuitas,
                  voluntários dedicados e uma comunidade que acredita no potencial
                  de cada aluno.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default Home;
