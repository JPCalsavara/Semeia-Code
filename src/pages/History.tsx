import { dadosLinhaDoTempo } from "../model/data";
import "../styles/Style_History.css";

function History() {
  return (
    <section className="historia" id="historia">
      <div className="historia-header">
        <h2>A História do Projeto, Semestre a Semestre</h2>
      </div>

      <div className="linha-do-tempo">
        {dadosLinhaDoTempo.map((item) => (
          <div key={item.id} className="item-linha-tempo">
            <div className="linha-imagem" aria-hidden="true">
              <span className="dot-inner" />
            </div>
            <div className="linha-texto">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default History;
