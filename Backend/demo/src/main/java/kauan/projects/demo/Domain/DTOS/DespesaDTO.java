package kauan.projects.demo.Domain.DTOS;


import kauan.projects.demo.Domain.ENUMS.DespesaCategoria;
import kauan.projects.demo.Domain.ENUMS.DespesaPagamento;

import java.time.LocalDate;

public record DespesaDTO(
        Long id,
        DespesaCategoria categoria,
        DespesaPagamento despesaPagamento,
        LocalDate dataCriacao,
        String descricao,
        Double valor
) {
}