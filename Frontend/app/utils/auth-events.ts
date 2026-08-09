export const AUTH_CHANGE_EVENT = "auth-change";

export function emitirMudancaDeAuth() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function adicionarListenerMudancaDeAuth(listener: EventListener) {
  window.addEventListener(AUTH_CHANGE_EVENT, listener);
}

export function removerListenerMudancaDeAuth(listener: EventListener) {
  window.removeEventListener(AUTH_CHANGE_EVENT, listener);
}
