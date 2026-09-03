import { describe, expect, it } from "vitest";
import {
  dadosDosVoluntarios,
  depoimentosVoluntario,
  depoimentosVoluntarioPorSemestre,
  empresasParceiras,
} from "./data";

describe("conteudo editorial", () => {
  it("mantem dados de voluntariado completos", () => {
    expect(depoimentosVoluntario.length).toBeGreaterThan(0);

    for (const testimonial of depoimentosVoluntario) {
      expect(testimonial.name).toBeTruthy();
      expect(testimonial.company).toBeTruthy();
      expect(testimonial.roleYear).toBeTruthy();
      expect(testimonial.text).toBeTruthy();
      expect(testimonial).toHaveProperty("semester");
      expect(testimonial).toHaveProperty("image");
    }
  });

  it("mantem empresas separadas das funcoes de voluntariado", () => {
    expect(empresasParceiras).toEqual(["iFood", "EloGroup", "Nubank", "Samsung"]);
    expect(dadosDosVoluntarios).toHaveLength(3);
  });

  it("organiza dois membros por semestre", () => {
    expect(Object.keys(depoimentosVoluntarioPorSemestre)).toEqual([
      "2025.1",
      "2025.2",
    ]);

    for (const testimonials of Object.values(depoimentosVoluntarioPorSemestre)) {
      expect(testimonials).toHaveLength(2);
    }
  });
});
