package kauan.projects.demo.Domain.DTOS;

import kauan.projects.demo.Domain.Despesa;
import kauan.projects.demo.Domain.ENUMS.DespesaCategoria;
import kauan.projects.demo.Domain.ENUMS.DespesaPagamento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public record DespesaRequestDTO(@NotNull DespesaCategoria categoria, @NotNull DespesaPagamento despesaPagamento,
                                @NotNull LocalDate dataCriacao, @NotBlank String descricao,
                                @NotNull @Positive Double valor) {
}