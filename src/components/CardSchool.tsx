import { useState } from "react";
import { SpotlightCard } from "./effects/SpotlightCard";

type CardSchoolProps = {
  nome: string;
  imagem: string;
  imagens?: string[];
  corDoCard: string;
};

function CardSchool({ nome, imagem, imagens, corDoCard }: CardSchoolProps) {
  const imagesList = imagens && imagens.length > 0 ? imagens : [imagem];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  return (
    <SpotlightCard className={`card-escola ${corDoCard}`}>
      <h3>{nome}</h3>
      <div className="container-foto">
        <img
          src={imagesList[currentIndex]}
          alt={`Foto da ${nome}${imagesList.length > 1 ? ` (${currentIndex + 1}/${imagesList.length})` : ""}`}
        />
        {imagesList.length > 1 && (
          <>
            <button
              type="button"
              className="school-img-btn prev"
              onClick={handlePrev}
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="school-img-btn next"
              onClick={handleNext}
              aria-label="Próxima foto"
            >
              ›
            </button>
            <div className="school-img-pagination">
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`school-img-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Ir para foto ${idx + 1}`}
                />
              ))}
            </div>
            <div className="school-img-counter">
              {currentIndex + 1} / {imagesList.length}
            </div>
          </>
        )}
      </div>
    </SpotlightCard>
  );
}

export default CardSchool;
