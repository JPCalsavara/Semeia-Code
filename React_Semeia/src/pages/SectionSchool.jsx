import CardSchool from '../components/CardSchool';
import { dadosDasEscolas } from '../model/DataCard';

function SectionSchool() {
  return (
    <div className="img-conteudo-escola">
      {dadosDasEscolas.map((escola) => (
        <CardSchool
          key={escola.id}
          nome={escola.nome}
          imagem={escola.imagem}
          corDoCard={escola.corDoCard}
        />
      ))}
    </div>
  );
}

export default SectionSchool;