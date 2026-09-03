import SectionSchool from "./SectionSchool";
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntario,
  membrosVoluntarioPorSemestre,
  empresasParceiras,
} from "../model/data";
import "../styles/Style_Content.css";

type ContentProps = { isVolunteer: boolean };

function Content({ isVolunteer }: ContentProps) {
  return (
    <section className="conteudo-escola" id="conteudo">
      {isVolunteer ? (
        <>
          <div className="conteudo-titulo">
            <h2>Onde você pode atuar</h2>
            <h3>Cargos abertos para quem quer somar ao projeto.</h3>
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
                <h3 className="card-titulo">
                  <span>{voluntario.titleLine1}</span>
                  {voluntario.titleLine2 && (
                    <span>{voluntario.titleLine2}</span>
                  )}
                </h3>
                <p className="card-subtitulo">{voluntario.description}</p>
              </div>
            ))}
          </div>

          <div className="areas-atuacao">
            <h2>Onde nossos voluntários atuam hoje</h2>
          </div>

          <div className="cards-depoimento">
            {depoimentosVoluntario.map((depoimento) => (
              <blockquote key={depoimento.id}>
                <p>{depoimento.text}</p>
                <div className="card-depoimento">
                  <strong>{depoimento.name}</strong>
                  <span>{depoimento.roleYear}</span>
                  <span>{depoimento.company}</span>
                </div>
              </blockquote>
            ))}
          </div>

          <div
            className="membros-semestre"
            role="region"
            aria-labelledby="membros-titulo"
          >
            <h2 id="membros-titulo">Membros por semestre</h2>
            <div className="membros-semestre-lista">
              {Object.entries(membrosVoluntarioPorSemestre).map(
                ([semester, members]) => (
                  <div className="semester-group" key={semester}>
                    <h3>{semester}</h3>
                    <div className="cards-membros">
                      {members.map((member) => (
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
                          <h4>{member.name}</h4>
                          <p>{member.role}</p>
                          <span>{member.company}</span>
                        </article>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="t-conteudo-escola">
            <h2>Cada turma, uma história</h2>
            <h3>Fotos e depoimentos de turmas que já passaram pelo projeto.</h3>
          </div>

          <SectionSchool />

          <div className="depoimentos">
            {depoimentosEscola.map((depoimento) => (
              <div key={depoimento.id} className="depoimento">
                <p>{depoimento.text}</p>
              </div>
            ))}
          </div>

          <div className="areas-atuacao">
            <h2>Onde nossos voluntários atuam hoje</h2>
            <div className="empresas">
              {empresasParceiras.map((empresa) => (
                <div key={empresa} className="empresa">
                  {empresa}
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
