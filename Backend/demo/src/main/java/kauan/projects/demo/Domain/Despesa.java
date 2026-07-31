package kauan.projects.demo.Domain;

import jakarta.persistence.*;
import kauan.projects.demo.Domain.ENUMS.DespesaCategoria;
import kauan.projects.demo.Domain.ENUMS.DespesaPagamento;
import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Despesa {
        @Id
        @GeneratedValue
        private Long id;
        private DespesaCategoria categoria;
        private DespesaPagamento despesaPagamento;
        private LocalDate dataCriacao;
        private String descricao;

        private Double valor;
        @ManyToOne
        @JoinColumn(name = "user_id")
        @JsonIgnore
        private User user;
}
