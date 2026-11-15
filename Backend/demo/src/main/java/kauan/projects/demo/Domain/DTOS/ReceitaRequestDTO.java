package kauan.projects.demo.Domain.DTOS;

import kauan.projects.demo.Domain.ENUMS.ReceitaCategoria;
import kauan.projects.demo.Domain.ENUMS.ReceitaStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import kauan.projects.demo.Domain.Receita;

import java.time.LocalDate;

public record ReceitaRequestDTO(@NotBlank String descricao, @NotNull @Positive Double valor,
                                @NotNull LocalDate dataCriacao, @NotNull ReceitaCategoria categoria, String clienteNome,
                                @NotNull ReceitaStatus receitaStatus) {
}
