package kauan.projects.demo.Domain.DTOS;

import jakarta.validation.constraints.*;
import kauan.projects.demo.Domain.ENUMS.Cargo;
public record UserDTO(
        @NotNull
        @Positive
        Integer id,

        @NotBlank
        @Size(min = 2, max = 100)
        String nome,

        @NotBlank
        @Email
        @Size(max = 254)
        String email,

        @NotNull
        Cargo cargo
) {}