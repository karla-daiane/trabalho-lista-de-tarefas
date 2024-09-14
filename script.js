const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const buttonNovaTarefa = document.querySelector('.button-nova-tarefa');
const containerListaTarefas = document.querySelector('.container-lista-tarefas');
const containerListaVazia = document.querySelector('.container-lista-vazia');


const adicionarTarefa = () => {
    const inputValido = inputNovaTarefa.value.trim().length > 0;
    if (!inputValido) {
        return inputNovaTarefa.placeholder = "❗Insira uma tarefa";
    }

    containerListaVazia.remove();
    containerListaTarefas.classList.remove('ocultar');

    const conteudoTarefa = document.createElement('div');
    conteudoTarefa.classList.add('tarefa');

    const textoTarefa = document.createElement('p');
    textoTarefa.innerText = inputNovaTarefa.value;

    textoTarefa.addEventListener('click', () => concluirTarefa(textoTarefa));

    const iconeDeletar = document.createElement('i');
    iconeDeletar.classList.add('bi');
    iconeDeletar.classList.add('bi-trash3-fill');

    iconeDeletar.addEventListener('click', () => deletarTarefa(conteudoTarefa, textoTarefa));

    conteudoTarefa.appendChild(textoTarefa);
    conteudoTarefa.appendChild(iconeDeletar);
    containerListaTarefas.appendChild(conteudoTarefa);
    inputNovaTarefa.placeholder = "Adicionar nova tarefa";
    inputNovaTarefa.value = "";
}

const concluirTarefa = (textoTarefa) => {
    const tarefas = containerListaTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.firstChild.isSameNode(textoTarefa)) {
            tarefa.firstChild.classList.toggle('concluido');
        }
    }
}

const deletarTarefa = (conteudoTarefa, textoTarefa) => {
    const tarefas = containerListaTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.firstChild.isSameNode(textoTarefa))
            conteudoTarefa.remove();
    }
}

buttonNovaTarefa.addEventListener('click', () => adicionarTarefa());