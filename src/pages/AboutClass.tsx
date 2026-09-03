import iconSchool from "../assets/icons/icons8-school-100.png";
import iconPencil from "../assets/icons/icons8-pencil-100.png";
import iconTree from "../assets/icons/icons8-tree-96.png";

function AboutClass() {
  return (
    <section className="sobre-aula" id="sobre-aula">
      <div className="sobre-aula-header">
        <h2>Como Funcionam Nossas Aulas</h2>
        <p className="sobre-aula-subtitle">
          Um processo totalmente colaborativo e prático que conecta a universidade às escolas públicas parceiras.
        </p>
      </div>

      <div className="aulas-grid">
        <div className="aula-card">
          <div className="aula-card-icon">
            <img src={iconSchool} alt="Parceria escolar" />
          </div>
          <h3>1. Parceria Ativa</h3>
          <p>
            Os universitários buscam ativamente instituições parceiras, alinhando o conteúdo pedagógico e horários com os professores responsáveis.
          </p>
        </div>

        <div className="aula-card">
          <div className="aula-card-icon">
            <img src={iconPencil} alt="Aulas práticas" />
          </div>
          <h3>2. Ensino Prático</h3>
          <p>
            Durante os encontros, nossos estudantes assumem a sala de aula para ensinar lógica e programação de maneira acessível e engajadora.
          </p>
        </div>

        <div className="aula-card">
          <div className="aula-card-icon">
            <img src={iconTree} alt="Experiência transformadora" />
          </div>
          <h3>3. Impacto Duplo</h3>
          <p>
            Capacitamos os jovens para o futuro digital enquanto proporcionamos aos universitários uma experiência transformadora de docência e liderança.
          </p>
        </div>
      </div>

      <div className="sobre-aula-banner">
        <div className="banner-content">
          <p>
            <strong>Vivência Transformadora:</strong> O processo integra teoria e prática em um ambiente acolhedor, onde os estudantes de ensino médio adquirem repertório tecnológico e os graduandos fortalecem suas habilidades sociais, de comunicação e gestão.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutClass;