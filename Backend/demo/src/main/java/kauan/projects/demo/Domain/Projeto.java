package kauan.projects.demo.Domain;

import jakarta.persistence.*;
import kauan.projects.demo.Domain.ENUMS.ProjetoStatus;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Projeto {

    @Id
    @GeneratedValue
    private int id;
    private String nome;
    private Double valor;
    private String descricao;
    private LocalDate dataCriacao;
    private ProjetoStatus status;
    private LocalDate prazoFinalizacao;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
