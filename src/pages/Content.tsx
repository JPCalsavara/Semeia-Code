import { useMemo, useState, useRef, PointerEvent } from "react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SectionSchool from "./SectionSchool";
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntario,
  getSemestresComMembrosOrdenados,
  empresasParceiras,
} from "../model/data";
import { useAudience } from "../context/AudienceContext";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import { SpotlightCard } from "../components/effects/SpotlightCard";
import { SemesterMembersTrack } from "../components/effects/SemesterMembersTrack";
import "../styles/Style_Content.css";

type ContentProps = { isVolunteer?: boolean };

function Content({ isVolunteer: propIsVolunteer }: ContentProps = {}) {
  const audience = useAudience();
  const isVolunteer = propIsVolunteer ?? audience.isVolunteer;
  const lenis = useLenis();
  const shouldReduceMotion = useReducedMotion();

  const depoimentosSliderRef = useRef<HTMLDivElement>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isDraggingDepoimentos, setIsDraggingDepoimentos] = useState(false);
  const totalDepoimentos = depoimentosVoluntario.length;
  const holdIntervalRef = useRef<number | null>(null);

  const getCardStepWidth = () => {
    if (!depoimentosSliderRef.current) return 370 + 24;
    const card = depoimentosSliderRef.current.querySelector(".card-quote") as HTMLElement | null;
    if (!card) return 370 + 24;
    const gap = 24;
    return card.offsetWidth + gap;
  };

  const scrollDepoimentoToIndex = (index: number) => {
    if (!depoimentosSliderRef.current) return;
    const step = getCardStepWidth();
    depoimentosSliderRef.current.scrollTo({
      left: index * step,
      behavior: "smooth",
    });
    setSliderIndex(index);
  };

  const handlePrevDepoimento = () => {
    const newIdx = sliderIndex > 0 ? sliderIndex - 1 : totalDepoimentos - 1;
    scrollDepoimentoToIndex(newIdx);
  };

  const handleNextDepoimento = () => {
    const newIdx = sliderIndex < totalDepoimentos - 1 ? sliderIndex + 1 : 0;
    scrollDepoimentoToIndex(newIdx);
  };

  // Segurar para rolar continuamente (Apple MacBook Pro style)
  const handleStartHold = (direction: "prev" | "next") => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (direction === "next") handleNextDepoimento();
    else handlePrevDepoimento();

    holdIntervalRef.current = window.setInterval(() => {
      if (!depoimentosSliderRef.current) return;
      const step = direction === "next" ? 14 : -14;
      depoimentosSliderRef.current.scrollLeft += step;
    }, 16);
  };

  const handleStopHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
      if (depoimentosSliderRef.current) {
        const step = getCardStepWidth();
        const targetIdx = Math.round(depoimentosSliderRef.current.scrollLeft / step);
        scrollDepoimentoToIndex(Math.max(0, Math.min(targetIdx, totalDepoimentos - 1)));
      }
    }
  };

  // Drag-to-scroll com Pointer Events (arrastar segurando com o mouse/touch)
  const dragStartRef = useRef<{ startX: number; scrollLeft: number; hasMoved: boolean }>({
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!depoimentosSliderRef.current) return;
    setIsDraggingDepoimentos(true);
    dragStartRef.current = {
      startX: e.clientX,
      scrollLeft: depoimentosSliderRef.current.scrollLeft,
      hasMoved: false,
    };
    depoimentosSliderRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingDepoimentos || !depoimentosSliderRef.current) return;
    const dx = e.clientX - dragStartRef.current.startX;
    if (Math.abs(dx) > 4) {
      dragStartRef.current.hasMoved = true;
    }
    depoimentosSliderRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingDepoimentos || !depoimentosSliderRef.current) return;
    setIsDraggingDepoimentos(false);
    try {
      depoimentosSliderRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // Ignorado caso não tenha sido capturado
    }
    if (dragStartRef.current.hasMoved) {
      const step = getCardStepWidth();
      const targetIdx = Math.round(depoimentosSliderRef.current.scrollLeft / step);
      scrollDepoimentoToIndex(Math.max(0, Math.min(targetIdx, totalDepoimentos - 1)));
    }
  };

  const handleSliderScroll = () => {
    if (!depoimentosSliderRef.current || isDraggingDepoimentos) return;
    const step = getCardStepWidth();
    const currentIdx = Math.round(depoimentosSliderRef.current.scrollLeft / step);
    setSliderIndex(Math.max(0, Math.min(currentIdx, totalDepoimentos - 1)));
  };

  const semestresOrdenados = useMemo(
    () => getSemestresComMembrosOrdenados(),
    [],
  );
  const [semestreIndex, setSemestreIndex] = useState(0);
  const totalSemestres = semestresOrdenados.length;
  const currentSemesterEntry = semestresOrdenados[semestreIndex];
  const currentSemester = currentSemesterEntry?.semester ?? "";
  const currentMembers = currentSemesterEntry?.members ?? [];

  const scrollToVoluntarios = () => {
    const el = document.getElementById("membros-titulo");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -140, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrevSemestre = () => {
    setSemestreIndex((prev) => (prev > 0 ? prev - 1 : totalSemestres - 1));
    scrollToVoluntarios();
  };

  const handleNextSemestre = () => {
    setSemestreIndex((prev) => (prev < totalSemestres - 1 ? prev + 1 : 0));
    scrollToVoluntarios();
  };

  const handleSelectSemestre = (idx: number) => {
    setSemestreIndex(idx);
    scrollToVoluntarios();
  };

  return (
    <section className="conteudo-escola" id="conteudo">
      {isVolunteer ? (
        <>
          <ScrollReveal>
            <div className="conteudo-header">
              <h2>Onde Você Pode Atuar</h2>
              <p className="conteudo-subtitle">
                Conheça os papéis no Semeia Code e veja como voluntários transformam vidas e fortalecem suas habilidades.
              </p>
            </div>
          </ScrollReveal>

          <div className="cards-conteudo">
            {dadosDosVoluntarios.map((voluntario, index) => (
              <ScrollReveal key={voluntario.id} delay={index * 0.12}>
                <SpotlightCard className={`card-conteudo ${voluntario.color}`}>
                  <picture>
                    <img src={voluntario.image} alt={voluntario.alt} />
                  </picture>
                  <div className="card-conteudo-body">
                    <h3 className="card-titulo">
                      <span>{voluntario.titleLine1}</span>
                      {voluntario.titleLine2 && (
                        <span>{voluntario.titleLine2}</span>
                      )}
                    </h3>
                    <p className="card-subtitulo">{voluntario.description}</p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="secao-depoimentos-voluntarios">
            <ScrollReveal>
              <div className="secao-subtitulo">
                <h2>Vozes da Nossa Comunidade</h2>
                <p>Histórias de quem viveu a experiência de ensinar e liderar no projeto.</p>
              </div>
            </ScrollReveal>

            <div className="slider-depoimentos-container">
              <div
                ref={depoimentosSliderRef}
                className={`cards-depoimento-slider ${isDraggingDepoimentos ? "is-dragging" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onScroll={handleSliderScroll}
              >
                <div className="cards-depoimento-track">
                  {depoimentosVoluntario.map((depoimento) => (
                    <blockquote key={depoimento.id} className="card-quote">
                      <div className="quote-mark" aria-hidden="true">“</div>
                      <p className="quote-text">{depoimento.text}</p>
                      <footer className="card-depoimento-footer">
                        <div className="author-avatar">
                          {depoimento.image ? (
                            <img
                              src={depoimento.image}
                              alt={`Foto de ${depoimento.name}`}
                            />
                          ) : (
                            <span aria-hidden="true">
                              {depoimento.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="author-info">
                          <strong className="author-name">{depoimento.name}</strong>
                          <span className="author-role">{depoimento.roleYear}</span>
                          {depoimento.semesters && depoimento.semesters.length > 0 && (
                            <span className="author-semestres">
                              {depoimento.semesters.length > 1
                                ? `${depoimento.semesters[0]} - ${depoimento.semesters[depoimento.semesters.length - 1]}`
                                : depoimento.semesters[0]}
                            </span>
                          )}
                          {depoimento.company && (
                            <span className="author-company">@{depoimento.company}</span>
                          )}
                        </div>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>

              {totalDepoimentos > 1 && (
                <div className="slider-controles">
                  <button
                    type="button"
                    onMouseDown={() => handleStartHold("prev")}
                    onMouseUp={handleStopHold}
                    onMouseLeave={handleStopHold}
                    onTouchStart={() => handleStartHold("prev")}
                    onTouchEnd={handleStopHold}
                    className="slider-btn prev"
                    aria-label="Depoimento anterior (segure para rolar)"
                    title="Segure para rolar"
                  >
                    ‹
                  </button>
                  <div className="slider-dots">
                    {depoimentosVoluntario.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`slider-dot ${idx === sliderIndex ? "active" : ""}`}
                        onClick={() => scrollDepoimentoToIndex(idx)}
                        aria-label={`Ir para depoimento ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onMouseDown={() => handleStartHold("next")}
                    onMouseUp={handleStopHold}
                    onMouseLeave={handleStopHold}
                    onTouchStart={() => handleStartHold("next")}
                    onTouchEnd={handleStopHold}
                    className="slider-btn next"
                    aria-label="Próximo depoimento (segure para rolar)"
                    title="Segure para rolar"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="membros-semestre"
            role="region"
            aria-labelledby="membros-titulo"
          >
            <div className="secao-subtitulo">
              <h2 id="membros-titulo">Todos os voluntários</h2>
            </div>

            <AnimatePresence mode="wait">
              {currentSemester && (
                <motion.div
                  className="semester-group"
                  key={currentSemester}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 16, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: -16, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SemesterMembersTrack
                    members={currentMembers}
                    semester={currentSemester}
                    isCurrent={semestreIndex === 0}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {totalSemestres > 1 && (
              <div className="slider-controles">
                <button
                  type="button"
                  onClick={handlePrevSemestre}
                  className="slider-btn prev"
                  aria-label="Semestre anterior"
                >
                  ‹
                </button>
                <div className="slider-dots">
                  {semestresOrdenados.map((group, idx) => (
                    <button
                      key={group.semester}
                      type="button"
                      className={`slider-dot ${idx === semestreIndex ? "active" : ""}`}
                      onClick={() => handleSelectSemestre(idx)}
                      aria-label={`Ir para semestre ${group.semester}`}
                      title={`Semestre ${group.semester}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNextSemestre}
                  className="slider-btn next"
                  aria-label="Próximo semestre"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <ScrollReveal>
            <div className="conteudo-header">
              <h2>Cada Turma, Uma História</h2>
              <p className="conteudo-subtitle">
                Registros e vivências das turmas de escolas públicas acompanhadas pelo Semeia Code.
              </p>
            </div>
          </ScrollReveal>

          <SectionSchool />

          {depoimentosEscola.length > 0 && (
            <ScrollReveal>
              <div className="depoimentos-escola">
                <h2>Depoimentos</h2>
                <div className="lista-depoimentos">
                  {depoimentosEscola.map((depoimento) => (
                    <p key={depoimento.id}>"{depoimento.text}"</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="areas-atuacao">
              <h2>Onde Nossos Voluntários Atuam Hoje</h2>
              <div className="empresas">
                {empresasParceiras.map((empresa) => (
                  <div key={empresa} className="semester-badge">
                    <span>{empresa}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </>
      )}
    </section>
  );
}

export default Content;
