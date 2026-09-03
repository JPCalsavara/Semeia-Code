import SectionSchool from "./SectionSchool";
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntario,
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
                <footer>
                  <strong>{depoimento.name}</strong>
                  <span>{depoimento.company}</span>
                  <span>{depoimento.roleYear}</span>
                </footer>
              </blockquote>
            ))}
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
        </>
      )}

    </section>
  );
}

export default Content;
