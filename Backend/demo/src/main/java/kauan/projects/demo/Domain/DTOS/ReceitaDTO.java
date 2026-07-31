package kauan.projects.demo.Domain.DTOS;

import kauan.projects.demo.Domain.ENUMS.ReceitaCategoria;
import kauan.projects.demo.Domain.ENUMS.ReceitaStatus;

import java.time.LocalDate;


public record ReceitaDTO(
        int id,
        String descricao,
        Double valor,
        LocalDate dataCriacao,
        ReceitaCategoria categoria,
        String clienteNome,
        ReceitaStatus receitaStatus
) {
}