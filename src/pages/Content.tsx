import {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  PointerEvent,
} from "react";
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
import "../styles/Style_Content.css";

type ContentProps = { isVolunteer?: boolean };

function Content({ isVolunteer: propIsVolunteer }: ContentProps = {}) {
  const audience = useAudience();
  const isVolunteer = propIsVolunteer ?? audience.isVolunteer;

  const depoimentosSliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const [isDraggingDepoimentos, setIsDraggingDepoimentos] = useState(false);
  const dragStartRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });

  const repeatedDepoimentos = useMemo(() => {
    return [0, 1, 2, 3].flatMap((setIndex) =>
      depoimentosVoluntario.map((depoimento) => ({
        ...depoimento,
        loopKey: `loop-${setIndex}-${depoimento.id}`,
      })),
    );
  }, []);

  const getSingleSetWidth = useCallback(() => {
    if (!trackRef.current) return 0;
    const cards = trackRef.current.querySelectorAll<HTMLElement>(".card-quote");
    const total = depoimentosVoluntario.length;
    if (cards.length >= total * 2 && cards[0] && cards[total]) {
      const measured = cards[total].offsetLeft - cards[0].offsetLeft;
      if (measured > 0) return measured;
    }
    return 0;
  }, []);

  useEffect(() => {
    const container = depoimentosSliderRef.current;
    if (!container) return;

    const initTimer = setTimeout(() => {
      if (container) {
        const singleWidth = getSingleSetWidth();
        if (singleWidth > 0 && container.scrollLeft === 0) {
          container.scrollLeft = singleWidth;
        }
      }
    }, 60);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      return () => clearTimeout(initTimer);
    }

    let animationFrameId: number;
    const speed = 0.6;

    const step = () => {
      if (
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        depoimentosSliderRef.current
      ) {
        depoimentosSliderRef.current.scrollLeft += speed;
        const singleWidth = getSingleSetWidth();
        if (singleWidth > 0) {
          if (depoimentosSliderRef.current.scrollLeft >= singleWidth * 2) {
            depoimentosSliderRef.current.scrollLeft -= singleWidth;
          } else if (depoimentosSliderRef.current.scrollLeft <= 5) {
            depoimentosSliderRef.current.scrollLeft += singleWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [getSingleSetWidth]);

  const handleSliderScroll = () => {
    const container = depoimentosSliderRef.current;
    if (!container) return;
    const singleWidth = getSingleSetWidth();
    if (singleWidth > 0) {
      if (container.scrollLeft >= singleWidth * 2) {
        container.scrollLeft -= singleWidth;
      } else if (container.scrollLeft <= 5) {
        container.scrollLeft += singleWidth;
      }
    }
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!depoimentosSliderRef.current) return;
    isDraggingRef.current = true;
    setIsDraggingDepoimentos(true);
    dragStartRef.current = {
      startX: e.clientX,
      scrollLeft: depoimentosSliderRef.current.scrollLeft,
    };
    depoimentosSliderRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !depoimentosSliderRef.current) return;
    const dx = e.clientX - dragStartRef.current.startX;
    depoimentosSliderRef.current.scrollLeft =
      dragStartRef.current.scrollLeft - dx;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !depoimentosSliderRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingDepoimentos(false);
    try {
      depoimentosSliderRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
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

  const handlePrevSemestre = () => {
    setSemestreIndex((prev) => (prev > 0 ? prev - 1 : totalSemestres - 1));
  };

  const handleNextSemestre = () => {
    setSemestreIndex((prev) => (prev < totalSemestres - 1 ? prev + 1 : 0));
  };

  return (
    <section className="conteudo-escola" id="conteudo">
      {isVolunteer ? (
        <>
          <ScrollReveal>
            <div className="conteudo-header">
              <h2>Onde você pode atuar</h2>
              <p className="conteudo-subtitle">
                Cargos abertos para quem quer somar ao projeto.
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
                <h2>Vozes da nossa comunidade</h2>
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onScroll={handleSliderScroll}
              >
                <div ref={trackRef} className="cards-depoimento-track">
                  {repeatedDepoimentos.map((depoimento) => (
                    <blockquote key={depoimento.loopKey} className="card-quote">
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
                          {depoimento.semester && (
                            <span className="author-semestres">
                              Semestre {depoimento.semester}
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
            </div>
          </div>

          <div
            className="membros-semestre"
            role="region"
            aria-labelledby="membros-titulo"
          >
            <ScrollReveal>
              <div className="secao-subtitulo">
                <h2 id="membros-titulo" className="membros-titulo">Todos os voluntários</h2>
              </div>
            </ScrollReveal>

            {currentSemester && (
              <div className="semester-group" key={currentSemester}>
                <div className="semester-badge">
                  Semestre {currentSemester}
                  {semestreIndex === 0 ? " (Atual)" : ""}
                </div>
                <div className="cards-membros">
                  {currentMembers.map((member) => (
                    <SpotlightCard className="card-membro" key={member.id}>
                      <div className="membro-foto">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={`Foto de ${member.name}`}
                            loading="lazy"
                          />
                        ) : (
                          <span aria-hidden="true">
                            {member.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="membro-corpo">
                        <div className="membro-info">
                          <h4>{member.name}</h4>
                          <p className="membro-cargo">{member.role}</p>
                          {member.company && (
                            <span className="membro-empresa">{member.company}</span>
                          )}
                        </div>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="membro-linkedin"
                            aria-label={`Perfil no LinkedIn de ${member.name}`}
                            title={`Perfil no LinkedIn de ${member.name}`}
                          >
                            <svg
                              className="linkedin-icon"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            )}

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
                      onClick={() => setSemestreIndex(idx)}
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
              <h2>Cada turma, uma história</h2>
              <p className="conteudo-subtitle">
                Fotos e depoimentos de turmas que já passaram pelo projeto.
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
              <h2>Onde nossos voluntários atuam hoje</h2>
              <div className="empresas">
                {empresasParceiras.map((empresa) => (
                  <div key={empresa} className="empresa">
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
