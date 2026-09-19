import CardSchool from "../components/CardSchool";
import { dadosDasEscolas } from "../model/data";

function SectionSchool() {
  return (
    <div className="img-conteudo-escola">
      {dadosDasEscolas.map((escola) => (
        <CardSchool
          key={escola.id}
          nome={escola.name}
          imagem={escola.image}
          corDoCard={escola.color}
        />
      ))}
    </div>
  );
}

export default SectionSchool;
