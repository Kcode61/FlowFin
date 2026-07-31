package kauan.projects.demo.Services;

import kauan.projects.demo.Domain.DTOS.GraficoMensalDTO;
import kauan.projects.demo.Domain.Despesa;
import kauan.projects.demo.Domain.Receita;
import kauan.projects.demo.Domain.User;
import kauan.projects.demo.Domain.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {
    private UserService userService;

    public DashboardService(UserService userService) {
        this.userService = userService;
    }

    public List<GraficoMensalDTO> listaFinanceiraDoMes(Authentication authentication) {
        List<GraficoMensalDTO> grafico = new ArrayList<>();
        LocalDate hoje = LocalDate.now();
        int anoAtual = hoje.getYear();
        User user = userService.GetUsuarioLogado(authentication);
        List<Receita> listaDeReceita = userService.ListarReceitas(user);
        List<Despesa> listaDeDespesa = userService.ListarDespesas(user);
        for (int mes = 1; mes <= 12; mes++) {
            int finalMes = mes;
            List<Despesa> despesasDoMes = listaDeDespesa.stream().filter(despesa -> despesa.getDataCriacao().getMonthValue() == finalMes && despesa.getDataCriacao().getYear() == anoAtual).toList();
            List<Receita> receitasDoMes = listaDeReceita.stream().filter(receita -> receita.getDataCriacao().getMonthValue() == finalMes && receita.getDataCriacao().getYear() == anoAtual
                    )
                    .toList();
            double somaReceitas = receitasDoMes.stream().mapToDouble(Receita::getValor).sum();
            double somaDespesas = despesasDoMes.stream().mapToDouble(Despesa::getValor).sum();
            String nomeMes = switch (mes) {
                case 1 -> "Jan";
                case 2 -> "Fev";
                case 3 -> "Mar";
                case 4 -> "Abri";
                case 5 -> "Mai";
                case 6 -> "Jun";
                case 7 -> "Jul";
                case 8 -> "Ago";
                case 9 -> "Set";
                case 10 -> "Out";
                case 11 -> "Nov";
                case 12 -> "Dez";
                default -> throw new IllegalStateException("Unexpected value: " + mes);
            };
            grafico.add(new GraficoMensalDTO(nomeMes, somaReceitas, somaDespesas));
        }

        return grafico;
    }
}
