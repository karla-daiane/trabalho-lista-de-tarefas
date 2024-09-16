const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const buttonNovaTarefa = document.querySelector('.button-nova-tarefa');
const containerListaTarefas = document.querySelector('.container-lista-tarefas');
const containerListaVazia = document.querySelector('.container-lista-vazia');

buttonNovaTarefa.addEventListener('click', () => adicionarTarefa());

inputNovaTarefa.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        adicionarTarefa();
    }
});

window.onload = () => carregarTarefas();

const carregarTarefas = () => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));

    if (tarefasArmazenadas.length > 0) {
        containerListaVazia.classList.add('ocultar');
        containerListaTarefas.classList.remove('ocultar');

        for (const tarefa of tarefasArmazenadas) {
            exibirTarefa(tarefa.description, tarefa.concluida);
        }
    }
}

const adicionarTarefa = () => {
    const inputValido = inputNovaTarefa.value.trim().length > 0;

    if (!inputValido) {
        return inputNovaTarefa.placeholder = "❗Insira uma tarefa";
    }

    exibirTarefa(inputNovaTarefa.value);

    inputNovaTarefa.placeholder = "Adicionar nova tarefa";
    inputNovaTarefa.value = "";

    atualizarLocalStorage();
}

const exibirTarefa = (texto, estaConcluida) => {
    
    const conteudoTarefa = document.createElement('div');
    conteudoTarefa.classList.add('tarefa');

    const textoTarefa = document.createElement('p');
    textoTarefa.innerText = texto;

    if (estaConcluida) {
        textoTarefa.classList.add('concluido');
    }

    textoTarefa.addEventListener('click', () => concluirTarefa(textoTarefa));

    const iconeDeletar = document.createElement('i');
    iconeDeletar.classList.add('bi');
    iconeDeletar.classList.add('bi-trash3-fill');

    iconeDeletar.addEventListener('click', () => deletarTarefa(conteudoTarefa, textoTarefa));

    conteudoTarefa.appendChild(textoTarefa);
    conteudoTarefa.appendChild(iconeDeletar);
    containerListaTarefas.appendChild(conteudoTarefa);
    
    containerListaVazia.classList.add('ocultar');
    containerListaTarefas.classList.remove('ocultar');
}

const concluirTarefa = (textoTarefa) => {
    const tarefas = containerListaTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.firstChild.isSameNode(textoTarefa)) {
            tarefa.firstChild.classList.toggle('concluido');
        }
    }
    atualizarLocalStorage();
}

const deletarTarefa = (conteudoTarefa, textoTarefa) => {
    const tarefas = containerListaTarefas.childNodes;

    for (const tarefa of tarefas) {
        if (tarefa.firstChild.isSameNode(textoTarefa))
            conteudoTarefa.remove();
    }
    atualizarLocalStorage();

    if (containerListaTarefas.children.length === 0) {
        containerListaVazia.classList.remove('ocultar');
        containerListaTarefas.classList.add('ocultar');
    }
}

const atualizarLocalStorage = () => {
    const tarefas = containerListaTarefas.childNodes;

    const tarefasLocalStorage = [... tarefas].map(tarefa => {
        const conteudoTarefa = tarefa.firstChild;
        const concluida = conteudoTarefa.classList.contains('concluido');

        return {description: conteudoTarefa.innerText, concluida};
    })

    localStorage.setItem('tarefas', JSON.stringify(tarefasLocalStorage));
};
