import { useMemo, useState } from "react";
import SectionSchool from "./SectionSchool";
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntario,
  getSemestresComMembrosOrdenados,
  empresasParceiras,
} from "../model/data";
import { useAudience } from "../context/AudienceContext";
import "../styles/Style_Content.css";

type ContentProps = { isVolunteer?: boolean };

function Content({ isVolunteer: propIsVolunteer }: ContentProps = {}) {
  const audience = useAudience();
  const isVolunteer = propIsVolunteer ?? audience.isVolunteer;

  const [sliderIndex, setSliderIndex] = useState(0);
  const totalDepoimentos = depoimentosVoluntario.length;
  const maxIndex = Math.max(0, totalDepoimentos - 3);

  const handlePrevDepoimento = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNextDepoimento = () => {
    setSliderIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
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
          <div className="conteudo-header">
            <h2>Onde Você Pode Atuar</h2>
            <p className="conteudo-subtitle">
              Conheça os papéis no Semeia Code e veja como voluntários transformam vidas e fortalecem suas habilidades.
            </p>
          </div>

          <div className="cards-conteudo">
            {dadosDosVoluntarios.map((voluntario) => (
              <div
                key={voluntario.id}
                className={`card-conteudo ${voluntario.color}`}
              >
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
              </div>
            ))}
          </div>

          <div className="secao-depoimentos-voluntarios">
            <div className="secao-subtitulo">
              <h2>Vozes da Nossa Comunidade</h2>
              <p>Histórias de quem viveu a experiência de ensinar e liderar no projeto.</p>
            </div>

            <div className="slider-depoimentos-container">
              <div className="cards-depoimento-slider">
                <div
                  className="cards-depoimento-track"
                  style={{
                    transform: `translateX(-${sliderIndex * (100 / 3)}%)`,
                  }}
                >
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

              {totalDepoimentos > 3 && (
                <div className="slider-controles">
                  <button
                    type="button"
                    onClick={handlePrevDepoimento}
                    className="slider-btn prev"
                    aria-label="Depoimento anterior"
                  >
                    ‹
                  </button>
                  <div className="slider-dots">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`slider-dot ${idx === sliderIndex ? "active" : ""}`}
                        onClick={() => setSliderIndex(idx)}
                        aria-label={`Ir para depoimento ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleNextDepoimento}
                    className="slider-btn next"
                    aria-label="Próximo depoimento"
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

            {currentSemester && (
              <div className="semester-group" key={currentSemester}>
                <div className="semester-badge">
                  Semestre {currentSemester}
                  {semestreIndex === 0 ? " (Atual)" : ""}
                </div>
                <div className="cards-membros">
                  {currentMembers.map((member) => (
                    <article className="card-membro" key={member.id}>
                      <div className="membro-foto">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={`Foto de ${member.name}`}
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
                    </article>
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
          <div className="conteudo-header">
            <h2>Cada Turma, Uma História</h2>
            <p className="conteudo-subtitle">
              Registros e vivências das turmas de escolas públicas acompanhadas pelo Semeia Code.
            </p>
          </div>

          <SectionSchool />

          {depoimentosEscola.length > 0 && (
            <div className="depoimentos-escola">
              <h2>Depoimentos</h2>
              <div className="lista-depoimentos">
                {depoimentosEscola.map((depoimento) => (
                  <p key={depoimento.id}>"{depoimento.text}"</p>
                ))}
              </div>
            </div>
          )}

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
        </>
      )}
    </section>
  );
}

export default Content;
