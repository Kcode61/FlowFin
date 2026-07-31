package kauan.projects.demo.Domain;

import jakarta.persistence.*;
import kauan.projects.demo.Domain.ENUMS.ReceitaCategoria;
import kauan.projects.demo.Domain.ENUMS.ReceitaStatus;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Receita {
    @Id
    @GeneratedValue
    private int id;

    private String descricao;
    private Double valor;
    private LocalDate dataCriacao;
    private ReceitaCategoria categoria;
    private String clienteNome;
    private ReceitaStatus receitaStatus;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
