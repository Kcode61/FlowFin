package kauan.projects.demo.Controllers;


import kauan.projects.demo.Domain.*;
import kauan.projects.demo.Domain.DTOS.*;
import kauan.projects.demo.Domain.ENUMS.ProjetoStatus;
import kauan.projects.demo.Domain.ENUMS.ReceitaStatus;
import kauan.projects.demo.Services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    private DespesaDTO toDespesaDTO(Despesa despesa) {
        return new DespesaDTO(despesa.getId(), despesa.getCategoria(), despesa.getDespesaPagamento(), despesa.getDataCriacao(), despesa.getDescricao(), despesa.getValor());
    }

    private ReceitaDTO toReceitaDTO(Receita receita) {
        return new ReceitaDTO(receita.getId(), receita.getDescricao(), receita.getValor(), receita.getDataCriacao(), receita.getCategoria(), receita.getClienteNome(), receita.getReceitaStatus());
    }

    private ProjetoDTO toProjetoDTO(Projeto projeto) {
        return new ProjetoDTO(projeto.getId(), projeto.getNome(), projeto.getValor(), projeto.getDescricao(), projeto.getDataCriacao(), projeto.getStatus(), projeto.getPrazoFinalizacao());
    }

    @GetMapping("/users")
    public UsuariosDTO listarUsuarios() {
        return userService.ListarUsuarios();
    }

    @GetMapping("/me")
    public UserDTO buscarUsuarioLogado(Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        return new UserDTO(user.getId(), user.getNome(), user.getEmail(), user.getCargo());
    }

    @DeleteMapping("/me")
    public void deletarUsuario(Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        userService.DeletarUser(user.getId());
    }

    @PostMapping("/despesa/me")
    public DespesaDTO adicionarDespesa(Authentication authentication, @Valid @RequestBody DespesaRequestDTO despesaRequest) {

        User user = userService.GetUsuarioLogado(authentication);
        Despesa despesa = new Despesa();
        despesa.setCategoria(despesaRequest.categoria());
        despesa.setDespesaPagamento(despesaRequest.despesaPagamento());
        despesa.setDataCriacao(despesaRequest.dataCriacao());
        despesa.setDescricao(despesaRequest.descricao());
        despesa.setValor(despesaRequest.valor());
        despesa.setUser(user);

        user.getDespesas().add(despesa);

        User userSalvo = userRepository.save(user);

        Despesa despesaSalva = userSalvo.getDespesas().get(userSalvo.getDespesas().size() - 1);

        return toDespesaDTO(despesaSalva);
    }

    @PostMapping("/receita/me")
    public ReceitaDTO adicionarReceita(Authentication authentication, @Valid @RequestBody ReceitaRequestDTO receitaRequest) {
        User user = userService.GetUsuarioLogado(authentication);
        Receita receita = new Receita();
        receita.setDescricao(receitaRequest.descricao());
        receita.setValor(receitaRequest.valor());
        receita.setDataCriacao(receitaRequest.dataCriacao());
        receita.setCategoria(receitaRequest.categoria());
        receita.setClienteNome(receitaRequest.clienteNome());
        receita.setReceitaStatus(receitaRequest.receitaStatus());
        receita.setUser(user);

        user.getReceitas().add(receita);

        User salvo = userRepository.save(user);

        Receita receitaSalva = salvo.getReceitas().get(salvo.getReceitas().size() - 1);
        return toReceitaDTO(receitaSalva);
    }

    @PostMapping("/projeto/me")
    public ProjetoDTO adicionarProjeto(Authentication authentication, @RequestBody Projeto projeto) {
        User user = userService.GetUsuarioLogado(authentication);
        projeto.setUser(user);
        user.getProjetos().add(projeto);
        userService.SalvarUser(user);
        return toProjetoDTO(projeto);
    }

    @DeleteMapping("/receita/me/{id}")
    public void deletarReceita(Authentication authentication, @PathVariable int id) {
        User user = userService.GetUsuarioLogado(authentication);
        userService.DeletarReceita(user, id);
    }

    @PatchMapping("/projeto/me/{id}")
    public ResponseEntity<ProjetoDTO> atualizarProjeto(@PathVariable int id, @RequestBody ProjetoStatus projetoStatus, Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        List<Projeto> projetos = user.getProjetos();
        for (Projeto projetoDaLista : projetos) {
            if (projetoDaLista.getId() == id) {
                projetoDaLista.setStatus(projetoStatus);
                userService.SalvarUser(user);
                return ResponseEntity.ok(toProjetoDTO(projetoDaLista));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/receita/me/{id}")
    public ResponseEntity<ReceitaDTO> atualizarReceita(@PathVariable int id, @RequestBody ReceitaStatus receitaStatus, Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        List<Receita> receitas = user.getReceitas();
        for (Receita receitasDaLista : receitas) {
            if (receitasDaLista.getId() == id) {
                receitasDaLista.setReceitaStatus(receitaStatus);
                userService.SalvarUser(user);
                return ResponseEntity.ok(toReceitaDTO(receitasDaLista));
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/despesa/me/{id}")
    public void deletarDespesa(@PathVariable int id, Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        userService.deletarDespesa(user, id);
    }

    @GetMapping("/receitas/me")
    public List<ReceitaDTO> listarReceitas(Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        return userService.ListarReceitas(user).stream().map(this::toReceitaDTO).toList();
    }

    @GetMapping("/despesas/me")
    public List<DespesaDTO> listarDespesas(Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        return userService.ListarDespesas(user).stream().map(this::toDespesaDTO).toList();
    }

    @DeleteMapping("/projeto/me/{id}")
    public void deletarProjeto(Authentication authentication, @PathVariable int id) {
        User user = userService.GetUsuarioLogado(authentication);
        userService.DeletarProjeto(user, id);
    }

    @GetMapping("/projetos/me")
    public List<ProjetoDTO> listarProjetos(Authentication authentication) {
        User user = userService.GetUsuarioLogado(authentication);
        return userService.ListarProjetos(user).stream().map(this::toProjetoDTO).toList();
    }


}
