import CardSchool from "../components/CardSchool";
import { dadosDasEscolas } from "../model/data";
import { ScrollReveal } from "../components/effects/ScrollReveal";

function SectionSchool() {
  return (
    <div className="img-conteudo-escola">
      {dadosDasEscolas.map((escola, index) => (
        <ScrollReveal key={escola.id} delay={index * 0.12}>
          <CardSchool
            nome={escola.name}
            imagem={escola.image}
            imagens={escola.images}
            corDoCard={escola.color}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}

export default SectionSchool;
