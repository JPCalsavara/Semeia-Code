import { dadosLinhaDoTempo, dadosLinhaDoTempoVoluntario } from "../model/data";
import { useAudience } from "../context/AudienceContext";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import "../styles/Style_History.css";

type HistoryProps = {
  isVolunteer?: boolean;
};

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
                    {item.image && (
                      <div className="linha-foto-container">
                        <div
                          className="linha-foto-backdrop"
                          style={{ backgroundImage: `url(${item.image})` }}
                          aria-hidden="true"
                        />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="linha-foto"
                          loading="lazy"
                        />
                      </div>
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
