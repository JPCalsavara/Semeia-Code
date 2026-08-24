function CardSchool({ nome, imagem, corDoCard }) {
  return (
    <div className={`card-escola ${corDoCard}`}>
      <h3>{nome}</h3>
      <div className="container-foto">
        <img src={imagem} alt={`Foto da ${nome}`} />
      </div>
    </div>
  );
}

export default CardSchool;