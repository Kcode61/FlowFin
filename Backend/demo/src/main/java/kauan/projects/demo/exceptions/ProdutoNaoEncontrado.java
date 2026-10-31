package kauan.projects.demo.exceptions;

public class ProdutoNaoEncontrado extends RuntimeException {
  public ProdutoNaoEncontrado(String message) {
    super(message);
  }
}
