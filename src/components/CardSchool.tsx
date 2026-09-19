import { SpotlightCard } from "./effects/SpotlightCard";

type CardSchoolProps = { nome: string; imagem: string; corDoCard: string };

function CardSchool({ nome, imagem, corDoCard }: CardSchoolProps) {
  return (
    <SpotlightCard className={`card-escola ${corDoCard}`}>
      <h3>{nome}</h3>
      <div className="container-foto">
        <img src={imagem} alt={`Foto da ${nome}`} />
      </div>
    </SpotlightCard>
  );
}

export default CardSchool;
