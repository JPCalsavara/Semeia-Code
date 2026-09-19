import { dadosImpacto } from "../model/data";
import "../styles/Style_Data.css";

function Data() {
  return (
    <section className="dados" id="dados">
      <div className="dados-impacto">
        <h2 className="subtitulo">Números Que Mostram O Que Estamos Semeando</h2>

        <div className="dados-geral">
          {dadosImpacto.map((item) => (
            <div key={item.id} className="card-impacto">
              <div className="numero-box">
                <h2>{item.number}</h2>
              </div>
              <h3>{item.description}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Data;
