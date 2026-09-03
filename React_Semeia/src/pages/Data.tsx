import { dadosImpacto } from '../model/data';
import '../styles/Style_Data.css';

function Data() {
  return (
    <section className="dados" id="dados">
      <div className="dados-impacto">
        <h2 className="titulo">nosso impacto</h2>
        <h3 className="subtitulo">Números que mostram o</h3>
        <h3 className="subtitulo">que estamos semeando</h3>

        <div className="dados-geral">
          {dadosImpacto.map((item) => (
            <div key={item.id} className="dados-texto">
                <h2>{item.number}</h2>
                <h3>{item.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Data;
