import SectionSchool from "./SectionSchool";
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntarioPorSemestre,
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

          <div className="depoimentos-voluntarios">
            {Object.entries(depoimentosVoluntarioPorSemestre).map(
              ([semester, testimonials]) => (
                <div className="semester-group" key={semester}>
                  <h3>{semester}</h3>
                  <div
                    className="cards-depoimento"
                    tabIndex={0}
                    aria-label={`Depoimentos de voluntários de ${semester}`}
                  >
                    {testimonials.map((depoimento) => (
                      <blockquote key={depoimento.id}>
                        <div className="voluntario-foto">
                          {depoimento.image ? (
                            <img src={depoimento.image} alt={`Foto de ${depoimento.name}`} />
                          ) : (
                            <span aria-hidden="true">{depoimento.name.charAt(0)}</span>
                          )}
                        </div>
                        <p>{depoimento.text}</p>
                        <footer>
                          <strong>{depoimento.name}</strong>
                          <span>{depoimento.company}</span>
                          <span>{depoimento.roleYear}</span>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              ),
            )}
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
