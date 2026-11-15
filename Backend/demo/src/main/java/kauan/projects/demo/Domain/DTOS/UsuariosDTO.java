package kauan.projects.demo.Domain.DTOS;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record UsuariosDTO(@NotEmpty List<@Valid UserDTO> usuarios) {
}
