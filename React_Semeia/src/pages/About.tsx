import CardItem from '../components/CardItem';
import AboutClass from './AboutClass';
import { dadosDosCards } from '../model/data';
import '../styles/Style_About.css';

function About() {
  return (
    <>
      <section className="sobre" id="sobre">
        <div className="sobre-texto">
          <h2>Sobre nós</h2>
          <p>
            O Semeia Code nasceu dentro da Faculdade de Tecnologia Unicamp com a missão de aproximar estudantes de
            escolas públicas do universo da programação, sem custo e com acompanhamento próximo de estudantes de
            tecnologia voluntários.
          </p>

          <p>
            Acreditamos que ensinar lógica de programação é ensinar a resolver problemas, e que essa habilidade pode
            mudar o rumo de quem talvez nunca tivesse tido essa chance.
          </p>

          <p>
            Hoje, somos uma rede que busca o apoio de escolas para semear conhecimento em mentes jovens.
          </p>
        </div>

        <div className="sobre-card">
          {dadosDosCards.map((card) => (
            <CardItem
              key={card.id}
              titulo={card.title}
              descricao={card.description}
              imagem={card.image}
            />
          ))}
        </div>
      </section>

      <AboutClass />
    </>
  );
}

export default About;