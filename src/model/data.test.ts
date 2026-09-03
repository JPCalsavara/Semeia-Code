import { describe, expect, it } from "vitest";
import {
  dadosDosVoluntarios,
  depoimentosVoluntario,
  membrosVoluntarioPorSemestre,
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
      expect(testimonial.memberId).toBeTruthy();
      expect(
        Object.values(membrosVoluntarioPorSemestre)
          .flat()
          .some((member) => member.id === testimonial.memberId),
      ).toBe(true);
    }
  });

  it("mantem empresas separadas das funcoes de voluntariado", () => {
    expect(empresasParceiras).toEqual([
      "iFood",
      "EloGroup",
      "Nubank",
      "Samsung",
    ]);
    expect(dadosDosVoluntarios).toHaveLength(3);
  });

  it("organiza dois membros por semestre", () => {
    expect(Object.keys(membrosVoluntarioPorSemestre)).toEqual([
      "2025.1",
      "2025.2",
    ]);

    for (const members of Object.values(membrosVoluntarioPorSemestre)) {
      expect(members).toHaveLength(2);
      for (const member of members) {
        expect(member.name).toBeTruthy();
        expect(member.role).toBeTruthy();
        expect(member.company).toBeTruthy();
        expect(member).toHaveProperty("image");
      }
    }
  });
});
