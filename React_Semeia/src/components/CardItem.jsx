function CardItem({ titulo, descricao, imagem }) {
  return (
    <div className="card-item">
      <div className="card-icon">
        <img src={imagem} alt={titulo} />
      </div>
      <div className="card-info">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
      </div>
    </div>
  );
}

export default CardItem;