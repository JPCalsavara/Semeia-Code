import { describe, expect, it } from "vitest";
import {
  dadosDosVoluntarios,
  dadosLinhaDoTempoVoluntario,
  depoimentosVoluntario,
  membrosUnicos,
  membrosVoluntarioPorSemestre,
  empresasParceiras,
  getSemestresComMembrosOrdenados,
  getLinhaDoTempo,
} from "./data";

describe("conteudo editorial", () => {
  it("mantem dados de voluntariado completos", () => {
    expect(depoimentosVoluntario.length).toBeGreaterThan(0);

    for (const testimonial of depoimentosVoluntario) {
      expect(testimonial.name).toBeTruthy();
      expect(testimonial.roleYear).toBeTruthy();
      expect(testimonial.text).toBeTruthy();
      expect(testimonial.memberId !== undefined && testimonial.memberId !== null).toBe(true);
      expect(Array.isArray(testimonial.semesters)).toBe(true);
      expect(testimonial.semesters.length).toBeGreaterThan(0);
      expect(testimonial.semester).toBeTruthy();
      expect(
        Object.values(membrosVoluntarioPorSemestre)
          .flat()
          .some((member) => member.id === testimonial.memberId),
      ).toBe(true);
    }
  });

  it("mantem empresas separadas das funcoes de voluntariado", () => {
    expect(empresasParceiras).toContain("iFood");
    expect(empresasParceiras).toContain("EloGroup");
    expect(empresasParceiras).toContain("Nubank");
    expect(empresasParceiras).toContain("Samsung");
    expect(dadosDosVoluntarios).toHaveLength(3);
  });

  it("organiza membros por semestre", () => {
    expect(Object.keys(membrosVoluntarioPorSemestre)).toEqual([
      "2025.1",
      "2025.2",
      "2026.1",
      "2026.2",
    ]);

    for (const members of Object.values(membrosVoluntarioPorSemestre)) {
      expect(members.length).toBeGreaterThan(0);
      for (const member of members) {
        expect(member.name).toBeTruthy();
        expect(member.role).toBeTruthy();
        expect(member).toHaveProperty("image");
        expect(member).toHaveProperty("linkedin");

        if (member.image) {
          expect(member.image).toMatch(/^\/images\/membros\/.+\.(jpeg|jpg|png)$/);
        }
        if (member.linkedin) {
          expect(member.linkedin).toContain("linkedin.com/in/");
        }
      }
    }

    // Valida membros de 2025.2
    const membros20252 = membrosVoluntarioPorSemestre["2025.2"];
    expect(membros20252.some((m) => m.name === "João Calsavara")).toBe(true);
    expect(membros20252.some((m) => m.name === "Daniel Aniceto")).toBe(true);
    expect(membros20252.some((m) => m.name === "Vinícius Romão")).toBe(true);

    // Valida membros de 2026.1
    const membros20261 = membrosVoluntarioPorSemestre["2026.1"];
    expect(membros20261.some((m) => m.name === "João Guilherme")).toBe(true);
    expect(membros20261.some((m) => m.name.includes("Mamede") || m.name.includes("Mamade"))).toBe(true);
    expect(membros20261.some((m) => m.name.includes("Gustavo"))).toBe(true);
    expect(membros20261.some((m) => m.name.includes("Santiago"))).toBe(true);
    expect(membros20261.some((m) => m.name.includes("Luiza"))).toBe(true);
    expect(membros20261.some((m) => m.name.includes("Nakaba"))).toBe(true);
  });

  it("mantem linha do tempo de voluntariado estruturada por semestre com fotos", () => {
    expect(dadosLinhaDoTempoVoluntario).toHaveLength(5);

    const semestres = dadosLinhaDoTempoVoluntario.map((item) => item.semester);
    expect(semestres).toEqual([
      "2024.2",
      "2025.1",
      "2025.2",
      "2026.1",
      "2026.2",
    ]);

    for (const item of dadosLinhaDoTempoVoluntario) {
      expect(item.id).toBeTruthy();
      expect(item.period).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.role).toBeTruthy();
      expect(item.location).toBeTruthy();
      expect(item.image).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.highlights.length).toBeGreaterThan(0);
    }

    // Valida fundadores
    const fundacao = dadosLinhaDoTempoVoluntario[0];
    expect(fundacao.role).toContain("João Calsavara");
    expect(fundacao.role).toContain("Guilherme Palermo");

    // Valida 3a turma com 40 alunos e entrada de Romao e Daniel em 2026.1
    const membros20261 = membrosVoluntarioPorSemestre["2026.1"];
    expect(membros20261.some((m) => m.name.includes("Daniel"))).toBe(true);
    expect(membros20261.some((m) => m.name === "Vinícius Romão")).toBe(true);

    const terceiraTurma = dadosLinhaDoTempoVoluntario[3];
    expect(terceiraTurma.description).toContain("40 alunos");
    expect(terceiraTurma.role).toContain("Vinícius Romão");
    expect(terceiraTurma.role).toContain("Daniel");

    // Valida 4a turma (2026.2) na Escola Brasil com Prog 1 e Prog 2
    const quartaTurma = dadosLinhaDoTempoVoluntario[4];
    expect(quartaTurma.location).toContain("Brasil");
    expect(quartaTurma.description).toContain("Prog 1");
    expect(quartaTurma.description).toContain("Prog 2");
    expect(quartaTurma.description).toContain("15 alunos");
  });

  it("oferece consultas de alta alavancagem com semestres ordenados e linha do tempo", () => {
    const semestresOrdenados = getSemestresComMembrosOrdenados();
    expect(semestresOrdenados).toHaveLength(4);

    // Valida ordenação cronológica decrescente
    expect(semestresOrdenados.map((s) => s.semester)).toEqual([
      "2026.2",
      "2026.1",
      "2025.2",
      "2025.1",
    ]);

    // Valida sinalização de semestre atual
    expect(semestresOrdenados[0].isCurrent).toBe(true);
    expect(semestresOrdenados[1].isCurrent).toBe(false);

    // Valida consulta polimórfica de linha do tempo
    const timelineVol = getLinhaDoTempo("volunteers");
    const timelineSchool = getLinhaDoTempo("schools");
    expect(timelineVol).toHaveLength(5);
    expect(timelineSchool.length).toBeGreaterThan(0);
  });

  it("mantem membros unicos no data.json com IDs sequenciais e vetores de semestre e cargos", () => {
    expect(membrosUnicos.length).toBe(19);

    // IDs seriais 1, 2, 3...
    membrosUnicos.forEach((member, index) => {
      expect(member.id).toBe(index + 1);
      expect(Array.isArray(member.semestre)).toBe(true);
      expect(Array.isArray(member.cargos)).toBe(true);
      expect(member.semestre.length).toBe(member.cargos.length);
      expect(member.semestre.length).toBeGreaterThan(0);
    });

    // Valida que cada semestre exibe o cargo baseado no índice do vetor
    const joao = membrosUnicos.find((m) => m.name === "João Calsavara")!;
    expect(joao.semestre).toEqual(["2025.1", "2025.2"]);
    expect(joao.cargos).toEqual([
      "Fundador, Professor e Coordenador",
      "Coordenador Executivo e Educacional",
    ]);

    const membros20251 = membrosVoluntarioPorSemestre["2025.1"];
    const joao20251 = membros20251.find((m) => m.name === "João Calsavara")!;
    expect(joao20251.role).toBe(joao.cargos[0]);

    const membros20252 = membrosVoluntarioPorSemestre["2025.2"];
    const joao20252 = membros20252.find((m) => m.name === "João Calsavara")!;
    expect(joao20252.role).toBe(joao.cargos[1]);
  });
});
