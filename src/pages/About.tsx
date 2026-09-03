import CardItem from "../components/CardItem";
import AboutClass from "./AboutClass";
import { dadosDosCards } from "../model/data";
import "../styles/Style_About.css";

function About() {
  return (
    <div className="about-container">
      <section className="sobre" id="sobre">
        <div className="sobre-header">
          <span className="badge-tag">SOBRE O PROJETO</span>
          <h2>Transformando vidas através da programação</h2>
        </div>

        <div className="sobre-grid">
          <div className="sobre-texto">
            <p className="lead-paragraph">
              O <strong>Semeia Code</strong> nasceu dentro da <strong>Faculdade de Tecnologia Unicamp</strong> com a missão de aproximar estudantes de escolas públicas do universo da programação — de forma 100% gratuita e com acompanhamento próximo de voluntários.
            </p>

            <p>
              Acreditamos que ensinar lógica de programação é ensinar a <strong>resolver problemas</strong>, e que essa habilidade pode mudar o rumo de quem talvez nunca tivesse tido essa oportunidade.
            </p>

            <p>
              Hoje, somos uma rede engajada que busca o apoio de escolas para semear conhecimento e despertar novos talentos em mentes jovens.
            </p>

            
          </div>

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
        </div>
      </section>

      <AboutClass />
    </div>
  );
}

export default About;

