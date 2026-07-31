package kauan.projects.demo.Controllers;

import kauan.projects.demo.Domain.DTOS.GraficoMensalDTO;
import kauan.projects.demo.Services.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


        private final DashboardService dashboardService;

        public DashboardController(DashboardService dashboardService) {
            this.dashboardService = dashboardService;
        }

        @GetMapping("/grafico-mensal")
        public List<GraficoMensalDTO> graficoMensal(Authentication authentication) {
            return dashboardService.listaFinanceiraDoMes(authentication);
        }
    }
