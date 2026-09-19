import { useMemo, useState, useRef, PointerEvent } from "react";
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
            <ScrollReveal>
              <div className="secao-subtitulo">
                <h2 id="membros-titulo">Todos os voluntários</h2>
              </div>
            </ScrollReveal>

            <div className="membros-semestre-lista">
              {semestresOrdenados.map((group) => (
                <div className="semester-group" key={group.semester}>
                  <div className="semester-badge">
                    Semestre {group.semester}
                    {group.isCurrent ? " (Atual)" : ""}
                  </div>
                  <div className="cards-membros">
                    {group.members.map((member) => (
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
              ))}
            </div>
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
