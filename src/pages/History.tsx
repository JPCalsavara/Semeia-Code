import { dadosLinhaDoTempo } from "../model/data";
import "../styles/Style_History.css";

function History() {
  return (
    <section className="historia" id="historia">
      <div className="historia-titulo">
        <h2>linha do tempo</h2>
        <h3>A história do projeto, semestre a semestre</h3>
      </div>
      <div className="linha-do-tempo">
        {dadosLinhaDoTempo.map((item) => (
          <div key={item.id} className="item-linha-tempo">
            <div className="linha-imagem">
              <img src={item.image} alt="" />
            </div>
            <div className="linha-texto">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default History;
