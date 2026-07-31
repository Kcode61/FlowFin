package kauan.projects.demo.Services;


import kauan.projects.demo.Domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
private UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<Despesa> ListarDespesas(User user) {
        return user.getDespesas();
    }
    public List<Receita> ListarReceitas(User user) {
        return user.getReceitas();
    }
    public List<Projeto> ListarProjetos(User user) {
        return user.getProjetos();
    }
    public void deletarDespesa(User user, int despesaId) {
        List<Despesa> despesas = user.getDespesas();
        despesas.removeIf(despesa -> despesa.getId() == despesaId);
        userRepository.save(user);
    }
    public void DeletarReceita(User user, int id) {
        List<Receita> receitas = user.getReceitas();
        receitas.removeIf(receita -> receita.getId() == id);
        userRepository.save(user);
    }
    public void DeletarProjeto(User user, int id) {
        List<Projeto> despesas = user.getProjetos();
        despesas.removeIf(projeto -> projeto.getId() == id);
        userRepository.save(user);
    }
    public User GetUsuarioLogado(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }
    public User SalvarUser(User user) {
        return userRepository.save(user);
    }
    public void DeletarUser(int id) {
        userRepository.deleteById(id);
    }
    public List<User> ListarUsuarios() {
        return userRepository.findAll();
    }
}
