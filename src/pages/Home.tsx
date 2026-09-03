import "../styles/Style_Home.css";

type HomeProps = { isVolunteer: boolean };

function Home({ isVolunteer }: HomeProps) {
  return (
    <section id="home" className={`home ${isVolunteer ? "volunteer" : ""}`}>
      <div className="content">
        <p className="eyebrow">PROJETO DE EXTENSÃO UNIVERSITÁRIA DA UNICAMP</p>
        {isVolunteer ? (
          <>
            <h1>
              Ganhe <span>60 horas</span> de extensão para se formar semeando
              talentos pela programação
            </h1>
            <p>
              Torne-se voluntário do Semeia Code, desenvolva sua liderança,
              ensine programação em escolas públicas e conclua suas horas de
              extensão com propósito.
            </p>
          </>
        ) : (
          <>
            <h1>
              Estude com os melhores alunos da <span>América Latina</span>
            </h1>
            <p>
              Levamos programação para escolas públicas com aulas gratuitas,
              voluntários dedicados e uma comunidade que acredita no potencial
              de cada aluno.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
