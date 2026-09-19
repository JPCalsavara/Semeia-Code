import { dadosImpacto } from "../model/data";
import { AnimatedCounter } from "../components/effects/AnimatedCounter";
import { SpotlightCard } from "../components/effects/SpotlightCard";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import "../styles/Style_Data.css";

function Data() {
  return (
    <section className="dados" id="dados">
      <div className="dados-impacto">
        <ScrollReveal>
          <h2 className="subtitulo">Números Que Mostram O Que Estamos Semeando</h2>
        </ScrollReveal>

        <div className="dados-geral">
          {dadosImpacto.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.12}>
              <SpotlightCard className="card-impacto">
                <div className="numero-box">
                  <h2>
                    <AnimatedCounter value={item.number} />
                  </h2>
                </div>
                <h3>{item.description}</h3>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Data;
