package kauan.projects.demo.Domain.DTOS;

import kauan.projects.demo.Domain.ENUMS.ProjetoStatus;

import java.time.LocalDate;

public record ProjetoDTO(
        int id,
        String nome,
        Double valor,
        String descricao,
        LocalDate dataCriacao,
        ProjetoStatus status,
        LocalDate prazoFinalizacao
) {
}