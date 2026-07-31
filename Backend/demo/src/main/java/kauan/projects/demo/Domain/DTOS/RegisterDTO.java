package kauan.projects.demo.Domain.DTOS;

import kauan.projects.demo.Domain.ENUMS.Cargo;

public record RegisterDTO(String email, String password, Cargo role, String name) {
    public RegisterDTO {
        if (role == null) {
            role = Cargo.USER;
        }
    }
}