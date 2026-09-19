import CardItem from "../components/CardItem";
import AboutClass from "./AboutClass";
import { dadosDosCards } from "../model/data";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import "../styles/Style_About.css";

function About() {
  return (
    <div className="about-container">
      <section className="sobre" id="sobre">
        <ScrollReveal>
          <div className="sobre-header">
            <span className="badge-tag">SOBRE O PROJETO</span>
            <h2>Sobre nós</h2>
          </div>
        </ScrollReveal>

        <div className="sobre-grid">
          <ScrollReveal delay={0.1}>
            <div className="sobre-texto">
              <p className="lead-paragraph">
                O <strong>Semeia Code</strong> nasceu dentro da <strong>Faculdade de Tecnologia Unicamp</strong> com a missão de aproximar estudantes de escolas públicas do universo da programação, sem custo e com acompanhamento próximo de estudantes de tecnologia voluntários.
              </p>

              <p>
                Acreditamos que ensinar lógica de programação é ensinar a <strong>resolver problemas</strong>, e que essa habilidade pode mudar o rumo de quem talvez nunca tivesse tido essa chance.
              </p>

              <p>
                Hoje, somos uma rede que busca o apoio de escolas para semear conhecimento em mentes jovens.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="sobre-cards-container">
              <h3 className="cards-title">Pilares do Nosso Impacto</h3>
              <div className="sobre-card-list">
                {dadosDosCards.map((card) => (
                  <CardItem
                    key={card.id}
                    titulo={card.title}
                    descricao={card.description}
                    imagem={card.image}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <AboutClass />
    </div>
  );
}

export default About;

