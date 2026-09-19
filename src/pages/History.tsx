import { useState } from "react";
import { dadosLinhaDoTempo, dadosLinhaDoTempoVoluntario } from "../model/data";
import { useAudience } from "../context/AudienceContext";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import "../styles/Style_History.css";

type HistoryProps = {
  isVolunteer?: boolean;
};

type TimelineImageGalleryProps = {
  images: string[];
  title: string;
};

function TimelineImageGallery({ images, title }: TimelineImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] ?? images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="linha-foto-container">
      <div
        className="linha-foto-backdrop"
        style={{ backgroundImage: `url(${currentImage})` }}
        aria-hidden="true"
      />
      <img
        src={currentImage}
        alt={`${title} - Foto ${currentIndex + 1} de ${images.length}`}
        className="linha-foto"
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="timeline-img-btn prev"
            onClick={handlePrev}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            type="button"
            className="timeline-img-btn next"
            onClick={handleNext}
            aria-label="Próxima foto"
          >
            ›
          </button>
          <div className="timeline-img-pagination">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`timeline-img-dot ${idx === currentIndex ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Ir para foto ${idx + 1}`}
              />
            ))}
          </div>
          <div className="timeline-img-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}

function History({ isVolunteer: propIsVolunteer }: HistoryProps = {}) {
  const audience = useAudience();
  const isVolunteer = propIsVolunteer ?? audience.isVolunteer;
  return (
    <section className="historia" id="historia">
      <ScrollReveal>
        <div className="historia-header">
          <h2>Linha do tempo</h2>
          <p className="historia-subtitle">
            A história do projeto, semestre a semestre
          </p>
        </div>
      </ScrollReveal>

      <div className="linha-do-tempo">
        {isVolunteer
          ? dadosLinhaDoTempoVoluntario.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div className="item-linha-tempo">
                  <div className="linha-imagem" aria-hidden="true">
                    <span className="dot-inner" />
                  </div>
                  <div className="linha-texto">
                    {((item.images && item.images.length > 0) || item.image) && (
                      <TimelineImageGallery
                        images={item.images && item.images.length > 0 ? item.images : [item.image]}
                        title={item.title}
                      />
                    )}
                    <div className="linha-meta">
                      <div className="timeline-badges">
                        {item.semester && (
                          <span className="timeline-semester-badge">
                            Semestre {item.semester}
                          </span>
                        )}
                        <span className="timeline-period">{item.period}</span>
                      </div>
                      <span className="timeline-location">{item.location}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <div className="timeline-role">{item.role}</div>
                    <p className="timeline-description">{item.description}</p>
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="timeline-highlights">
                        {item.highlights.map((highlight, hIndex) => (
                          <li key={hIndex}>
                            <span
                              className="highlight-bullet"
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))
          : dadosLinhaDoTempo.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <div className="item-linha-tempo">
                  <div className="linha-imagem" aria-hidden="true">
                    <span className="dot-inner" />
                  </div>
                  <div className="linha-texto">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
      </div>
    </section>
  );
}

export default History;
