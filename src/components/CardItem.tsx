import { SpotlightCard } from "./effects/SpotlightCard";

type CardItemProps = { titulo: string; descricao: string; imagem: string };

function CardItem({ titulo, descricao, imagem }: CardItemProps) {
  return (
    <SpotlightCard className="card-item">
      <div className="card-icon">
        <img src={imagem} alt={titulo} />
      </div>
      <div className="card-info">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </SpotlightCard>
  );
}

export default CardItem;
