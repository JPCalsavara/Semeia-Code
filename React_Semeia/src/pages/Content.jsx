import SectionSchool from './SectionSchool';
import {
  dadosDosVoluntarios,
  depoimentosEscola,
  depoimentosVoluntario,
  empresasParceiras
} from '../model/DataCard';
import '../styles/Style_Content.css';

function Content({ isVolunteer }) {
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
                className={`card-conteudo ${voluntario.corDoCard}`}
              >
                <picture>
                  <img src={voluntario.imagem} alt={voluntario.alt} />
                </picture>
                <h3 className="card-titulo">
                  <span>{voluntario.tituloLinha1}</span>
                  {voluntario.tituloLinha2 && (
                    <span>{voluntario.tituloLinha2}</span>
                  )}
                </h3>
                <p className="card-subtitulo">{voluntario.descricao}</p>
              </div>
            ))}
          </div>

          <div className="cards-depoimento">
            {depoimentosVoluntario.map((depoimento) => (
              <p key={depoimento.id}>{depoimento.texto}</p>
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
              <div
                key={depoimento.id}
                className={`depoimento ${depoimento.tipo}`}
              >
                <p>{depoimento.texto}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="areas-atuacao">
        <h2>onde nossos voluntários atuam hoje</h2>
        <div className="empresas">
          {empresasParceiras.map((empresa, index) => (
            <div key={index} className="empresa">
              {empresa}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Content;