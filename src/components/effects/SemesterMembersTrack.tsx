import { useRef, useState, PointerEvent } from "react";
import { SpotlightCard } from "./SpotlightCard";
import type { VolunteerMember } from "../../model/data";

interface SemesterMembersTrackProps {
  members: VolunteerMember[];
  semester: string;
  isCurrent: boolean;
}

/**
 * Trilho de Membros com Scroll Lateral Estilo Apple MacBook Pro
 * Suporta drag-to-scroll (arrastar segurando), hold-to-scroll (segurar nas setas) e scroll snap
 */
export function SemesterMembersTrack({
  members,
  semester,
  isCurrent,
}: SemesterMembersTrackProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const holdIntervalRef = useRef<number | null>(null);

  const getCardStepWidth = () => {
    if (!sliderRef.current) return 216 + 20;
    const card = sliderRef.current.querySelector(".card-membro") as HTMLElement | null;
    if (!card) return 216 + 20;
    const gap = 20;
    return card.offsetWidth + gap;
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const step = getCardStepWidth();
    sliderRef.current.scrollTo({
      left: index * step,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    const newIdx = currentIndex > 0 ? currentIndex - 1 : members.length - 1;
    scrollToIndex(newIdx);
  };

  const handleNext = () => {
    const newIdx = currentIndex < members.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIdx);
  };

  // Segurar para rolar continuamente (Apple MacBook Pro style)
  const handleStartHold = (direction: "prev" | "next") => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    if (direction === "next") handleNext();
    else handlePrev();

    holdIntervalRef.current = window.setInterval(() => {
      if (!sliderRef.current) return;
      const step = direction === "next" ? 14 : -14;
      sliderRef.current.scrollLeft += step;
    }, 16);
  };

  const handleStopHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
      if (sliderRef.current) {
        const step = getCardStepWidth();
        const targetIdx = Math.round(sliderRef.current.scrollLeft / step);
        scrollToIndex(Math.max(0, Math.min(targetIdx, members.length - 1)));
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
    if (!sliderRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      scrollLeft: sliderRef.current.scrollLeft,
      hasMoved: false,
    };
    sliderRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    const dx = e.clientX - dragStartRef.current.startX;
    if (Math.abs(dx) > 4) {
      dragStartRef.current.hasMoved = true;
    }
    sliderRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    setIsDragging(false);
    try {
      sliderRef.current.releasePointerCapture(e.pointerId);
    } catch {
      // Ignorado caso não tenha sido capturado
    }
    if (dragStartRef.current.hasMoved) {
      const step = getCardStepWidth();
      const targetIdx = Math.round(sliderRef.current.scrollLeft / step);
      scrollToIndex(Math.max(0, Math.min(targetIdx, members.length - 1)));
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current || isDragging) return;
    const step = getCardStepWidth();
    const newIdx = Math.round(sliderRef.current.scrollLeft / step);
    setCurrentIndex(Math.max(0, Math.min(newIdx, members.length - 1)));
  };

  return (
    <div className="semester-group">
      <div className="semester-header-bar">
        <div className="semester-badge">
          Semestre {semester}
          {isCurrent ? " (Atual)" : ""}
        </div>

        {members.length > 4 && (
          <div className="membros-scroll-controles">
            <button
              type="button"
              onMouseDown={() => handleStartHold("prev")}
              onMouseUp={handleStopHold}
              onMouseLeave={handleStopHold}
              onTouchStart={() => handleStartHold("prev")}
              onTouchEnd={handleStopHold}
              className="slider-btn mini prev"
              aria-label="Voluntários anteriores (segure para rolar)"
              title="Segure para rolar"
            >
              ‹
            </button>
            <button
              type="button"
              onMouseDown={() => handleStartHold("next")}
              onMouseUp={handleStopHold}
              onMouseLeave={handleStopHold}
              onTouchStart={() => handleStartHold("next")}
              onTouchEnd={handleStopHold}
              className="slider-btn mini next"
              aria-label="Próximos voluntários (segure para rolar)"
              title="Segure para rolar"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div
        ref={sliderRef}
        className={`cards-membros-slider ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onScroll={handleScroll}
      >
        <div className="cards-membros-track">
          {members.map((member) => (
            <SpotlightCard className="card-membro" key={member.id}>
              <div className="membro-foto">
                {member.image ? (
                  <img src={member.image} alt={`Foto de ${member.name}`} />
                ) : (
                  <span aria-hidden="true">{member.name.charAt(0)}</span>
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
    </div>
  );
}
