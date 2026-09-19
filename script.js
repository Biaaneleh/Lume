// ========================================
// NAVEGAÇÃO ENTRE AS PÁGINAS
// ========================================

// Criei as referências das duas páginas do site

const paginaInicial = document.getElementById("pagina-inicial");
const paginaLume = document.getElementById("pagina-lume");

const botaoInicio = document.querySelector(".nav-inicio");
const botaoLume = document.querySelector(".nav-lume");


// Criei o botão da Página Inicial para voltar para a Home

botaoInicio.addEventListener("click", function () {

    paginaInicial.style.display = "block";
    paginaLume.style.display = "none";

    botaoInicio.classList.add("ativo");
    botaoLume.classList.remove("ativo");

});


// Criei o botão Lume para abrir a conversa

botaoLume.addEventListener("click", function () {

    paginaInicial.style.display = "none";
    paginaLume.style.display = "block";

    botaoLume.classList.add("ativo");
    botaoInicio.classList.remove("ativo");

});


// Deixei a Página Inicial ativa ao abrir o site

botaoInicio.classList.add("ativo");


// Criei o botão principal da Página Inicial

const botaoConversar = document.querySelector(".botao-conversar");

botaoConversar.addEventListener("click", function () {

    paginaInicial.style.display = "none";
    paginaLume.style.display = "block";

    botaoLume.classList.add("ativo");
    botaoInicio.classList.remove("ativo");

});


// ========================================
// ELEMENTOS DA CONVERSA
// ========================================

const historico = document.querySelector(".historico-conversa");
const campoPergunta = document.querySelector(".campo-pergunta input");
const botaoEnviar = document.querySelector(".campo-pergunta button");
const campoPerguntaContainer = document.querySelector(".campo-pergunta");

const botaoEncerrar = document.querySelector(".botao-encerrar");
const tituloLume = document.getElementById("titulo-lume");


// ========================================
// CONFIGURAÇÕES DA CONVERSA
// ========================================

// Defini cinco minutos para encerramento automático por inatividade

const TEMPO_INATIVIDADE = 5 * 60 * 1000;


// Criei uma chave para guardar o estado da conversa no navegador

const CHAVE_CONVERSA = "lume_conversa";

let temporizadorInatividade = null;


// ========================================
// CONTEÚDO DAS CATEGORIAS
// ========================================

// Organizei as cinco categorias e suas quatro perguntas

const conteudoCategorias = {

    "Comunicação": [

        {
            pergunta: "Como posso me comunicar de forma mais clara?",
            resposta: "Uma comunicação clara pode envolver o uso de frases objetivas e informações organizadas. Quando uma orientação tiver várias etapas, pode ser útil apresentá-las uma de cada vez.\n\nTambém é importante perguntar à pessoa qual forma de comunicação funciona melhor para ela, pois cada pessoa pode ter preferências diferentes."
        },

        {
            pergunta: "Por que algumas pessoas podem precisar de mais tempo para responder?",
            resposta: "Cada pessoa possui seu próprio ritmo para compreender uma informação, organizar seus pensamentos e formular uma resposta.\n\nDar alguns instantes para que a pessoa responda pode facilitar a comunicação. Evite interromper, completar sua fala ou interpretar o silêncio imediatamente como falta de interesse ou compreensão."
        },

        {
            pergunta: "É melhor falar ou escrever?",
            resposta: "Não existe uma forma de comunicação que seja melhor para todas as pessoas.\n\nAlgumas pessoas podem preferir conversar verbalmente, enquanto outras podem se sentir mais confortáveis utilizando mensagens ou textos. Quando houver dúvida, pergunte qual forma de comunicação é mais confortável para a pessoa."
        },

        {
            pergunta: "O que posso fazer quando não entendo o que a pessoa quis dizer?",
            resposta: "Peça que a pessoa explique ou reformule o que quis dizer. Você também pode repetir o que entendeu e perguntar se sua interpretação está correta.\n\nO mais importante é evitar fazer suposições ou completar a fala da pessoa por ela. Uma comunicação aberta pode ajudar vocês a chegarem a um entendimento."
        }

    ],


    "Sensorial": [

        {
            pergunta: "O que é sobrecarga sensorial?",
            resposta: "A sobrecarga sensorial pode acontecer quando uma pessoa recebe uma quantidade ou intensidade de estímulos maior do que consegue processar confortavelmente.\n\nSons, luzes, cheiros, movimentação e contato físico podem estar entre os estímulos envolvidos. A experiência varia de pessoa para pessoa."
        },

        {
            pergunta: "Como posso ajudar alguém que está sobrecarregado?",
            resposta: "Sempre que possível, procure reduzir os estímulos do ambiente e ofereça à pessoa um espaço mais tranquilo para que ela possa se reorganizar.\n\nPergunte se ela precisa de alguma coisa e respeite sua resposta. Nem sempre a melhor forma de ajudar será a mesma para todas as pessoas."
        },

        {
            pergunta: "Por que determinados ambientes podem ser desconfortáveis?",
            resposta: "Os ambientes podem reunir diferentes estímulos, como sons, luzes, cheiros, movimentação e contato físico.\n\nAlgumas pessoas podem apresentar maior sensibilidade a determinados estímulos. Por isso, um ambiente considerado confortável para uma pessoa pode ser desconfortável para outra."
        },

        {
            pergunta: "Devo tocar na pessoa para tentar ajudá-la?",
            resposta: "Não necessariamente. O contato físico pode ser desconfortável para algumas pessoas, especialmente durante uma situação de sobrecarga.\n\nAntes de tocar ou abraçar alguém, pergunte se ela deseja esse tipo de contato e respeite sua resposta."
        }

    ],


    "Rotina": [

        {
            pergunta: "Por que mudanças inesperadas podem ser difíceis?",
            resposta: "Mudanças inesperadas podem exigir que a pessoa reorganize aquilo que estava esperando ou planejando. Quando possível, comunicar alterações com antecedência pode facilitar a adaptação à nova situação.\n\nTambém pode ser útil explicar de forma clara o que mudou e o que acontecerá a partir daquele momento."
        },

        {
            pergunta: "Como posso avisar sobre uma mudança de planos?",
            resposta: "Avise a pessoa assim que souber da mudança e explique de maneira clara o que será diferente.\n\nQuando possível, informe o motivo da alteração, o novo plano e o que acontecerá a partir daquele momento. Dar essas informações pode ajudar a pessoa a se preparar para a mudança."
        },

        {
            pergunta: "Como posso ajudar na organização de uma rotina?",
            resposta: "Uma rotina pode ser organizada utilizando listas, horários, lembretes, calendários ou outras ferramentas visuais.\n\nO formato mais adequado depende das preferências de cada pessoa. Por isso, pergunte qual forma de organização pode ser mais útil antes de decidir por ela."
        },

        {
            pergunta: "O que fazer quando uma atividade planejada não puder acontecer?",
            resposta: "Explique a situação de forma clara e, quando possível, apresente as alternativas disponíveis.\n\nEvite simplesmente substituir a atividade sem comunicar a mudança. Informar o que aconteceu e quais serão os próximos passos pode facilitar a adaptação à nova situação."
        }

    ],


    "Funções Executivas": [

        {
            pergunta: "O que são funções executivas?",
            resposta: "Funções executivas são habilidades relacionadas a processos como planejamento, organização, atenção, gerenciamento do tempo e realização de tarefas.\n\nElas ajudam a pessoa a iniciar, organizar, acompanhar e concluir atividades do dia a dia."
        },

        {
            pergunta: "Por que uma tarefa simples pode parecer difícil?",
            resposta: "Uma tarefa aparentemente simples pode envolver várias etapas de planejamento, organização e execução.\n\nPara algumas pessoas, iniciar ou organizar essas etapas pode exigir um esforço maior. Isso não significa necessariamente falta de interesse ou vontade de realizar a atividade."
        },

        {
            pergunta: "Como posso ajudar alguém a organizar uma tarefa?",
            resposta: "Uma estratégia possível é dividir a tarefa em etapas menores e apresentar uma etapa de cada vez.\n\nTambém podem ser utilizados recursos como listas, checklists, lembretes ou calendários. O mais importante é identificar qual forma de organização funciona melhor para aquela pessoa."
        },

        {
            pergunta: "Cobrar repetidamente ajuda?",
            resposta: "Nem sempre. Cobranças constantes podem aumentar a pressão sem resolver a dificuldade envolvida na realização da tarefa.\n\nPode ser mais útil entender qual etapa está dificultando a atividade e pensar em uma forma prática de facilitar sua execução."
        }

    ],


    "Convivência": [

        {
            pergunta: "Como respeitar diferentes formas de interação?",
            resposta: "Nem todas as pessoas demonstram interesse, atenção ou afeto da mesma maneira. Algumas podem preferir interações mais objetivas ou ter diferentes formas de participar de uma conversa.\n\nRespeitar essas diferenças significa evitar exigir que todas as pessoas sigam o mesmo padrão de interação."
        },

        {
            pergunta: "Como oferecer ajuda sem ser invasivo?",
            resposta: "Pergunte primeiro se a pessoa precisa de ajuda e respeite sua resposta.\n\nCaso ela aceite, pergunte qual tipo de ajuda seria mais útil. Dessa forma, você evita fazer suposições sobre o que ela precisa e permite que ela participe da decisão."
        },

        {
            pergunta: "O que devo fazer se não souber como agir?",
            resposta: "Quando não souber o que fazer, uma boa alternativa é perguntar diretamente à pessoa sobre suas preferências ou necessidades.\n\nEm vez de presumir o que ela precisa, uma comunicação aberta pode ajudar vocês a encontrar uma forma de interação mais confortável e adequada."
        },

        {
            pergunta: "Por que é importante respeitar as preferências individuais?",
            resposta: "Pessoas neurodivergentes não possuem todas as mesmas necessidades, características ou preferências.\n\nConhecer e respeitar as particularidades de cada pessoa ajuda a construir uma comunicação mais acessível e uma convivência mais respeitosa."
        }

    ]

};


// ========================================
// PALAVRAS-CHAVE DAS CATEGORIAS
// ========================================

// Criei palavras-chave para identificar o assunto da pergunta inicial

const palavrasCategorias = {

    "Comunicação": [
        "comunicação", "comunicar", "falar", "conversa",
        "conversar", "mensagem", "escrever", "responder",
        "resposta", "explicar", "entender", "compreender",
        "diálogo", "pergunta", "linguagem"
    ],

    "Sensorial": [
        "sensorial", "sobrecarga", "estímulo", "estímulos",
        "barulho", "som", "ruído", "luz", "iluminação",
        "cheiro", "odor", "toque", "tocar", "ambiente",
        "desconforto", "sensibilidade", "sensível"
    ],

    "Rotina": [
        "rotina", "mudança", "mudanças", "imprevisto",
        "inesperado", "planos", "planejamento", "horário",
        "horários", "agenda", "organização", "organizar",
        "alteração", "adaptar", "adaptação"
    ],

    "Funções Executivas": [
        "tarefa", "tarefas", "planejamento", "planejar",
        "atenção", "concentração", "concentrar", "foco",
        "tempo", "prazo", "começar", "iniciar", "terminar",
        "concluir", "etapas", "prioridade", "prioridades",
        "produtividade"
    ],

    "Convivência": [
        "convivência", "conviver", "interação", "interagir",
        "social", "socialização", "ajudar", "ajuda", "respeito",
        "respeitar", "preferência", "preferências", "colega",
        "colegas", "família", "familiar", "trabalho",
        "comportamento", "relacionamento", "contato"
    ]

};


// ========================================
// IDENTIFICAÇÃO DE CATEGORIA
// ========================================

// Criei a função que compara as palavras da pergunta com as categorias

function identificarCategoria(pergunta) {

    const texto = pergunta.toLowerCase();

    let melhorCategoria = null;
    let maiorPontuacao = 0;


    for (const categoria in palavrasCategorias) {

        let pontuacao = 0;


        palavrasCategorias[categoria].forEach(function (palavra) {

            if (texto.includes(palavra)) {

                pontuacao++;

            }

        });


        if (pontuacao > maiorPontuacao) {

            maiorPontuacao = pontuacao;

            melhorCategoria = categoria;

        }

    }


    return melhorCategoria;

}


// ========================================
// CONTROLE DO ESTADO DA CONVERSA
// ========================================

// Criei o estado inicial da conversa

let estadoConversa = {

    ativa: true,

    ultimaInteracao: Date.now(),

    categoriaAtual: null,

    etapa: "inicial"

};


// ========================================
// SALVAR CONVERSA
// ========================================

// Criei uma função para guardar o estado e o histórico no navegador

function salvarConversa() {

    const dados = {

        estado: estadoConversa,

        historico: historico.innerHTML,

        inputVisivel: campoPerguntaContainer.style.display !== "none",

        titulo: tituloLume.textContent,

        textoBotao: botaoEncerrar.textContent

    };


    localStorage.setItem(

        CHAVE_CONVERSA,

        JSON.stringify(dados)

    );

}


// ========================================
// REGISTRAR INTERAÇÃO
// ========================================

// Atualizei o horário sempre que o usuário interage com o Lume

function registrarInteracao() {

    estadoConversa.ultimaInteracao = Date.now();

    estadoConversa.ativa = true;

    salvarConversa();

    iniciarTemporizador();

}


// ========================================
// TEMPORIZADOR DE INATIVIDADE
// ========================================

// Criei o temporizador de cinco minutos

function iniciarTemporizador() {

    clearTimeout(temporizadorInatividade);


    if (!estadoConversa.ativa) {

        return;

    }


    const tempoPassado =
        Date.now() - estadoConversa.ultimaInteracao;


    const tempoRestante =
        TEMPO_INATIVIDADE - tempoPassado;


    if (tempoRestante <= 0) {

        encerrarPorInatividade();

        return;

    }


    temporizadorInatividade = setTimeout(

        encerrarPorInatividade,

        tempoRestante

    );

}


// ========================================
// ROLAGEM DA CONVERSA
// ========================================

// Criei a rolagem automática somente quando o conteúdo ultrapassa o espaço disponível

function rolarConversaParaBaixo() {

    if (historico.scrollHeight > historico.clientHeight) {

        historico.scrollTop = historico.scrollHeight;

    }

}


// ========================================
// CRIAR BALÃO DO LUME
// ========================================

// Criei uma função para adicionar mensagens do Lume

function adicionarMensagemLume(texto) {

    const mensagem = document.createElement("div");

    mensagem.classList.add("mensagem-lume");

    mensagem.textContent = texto;

    historico.appendChild(mensagem);

    rolarConversaParaBaixo();

}


// ========================================
// CRIAR BALÃO DO USUÁRIO
// ========================================

// Criei uma função para adicionar mensagens escolhidas pelo usuário

function adicionarMensagemUsuario(texto) {

    const mensagem = document.createElement("div");

    mensagem.classList.add("mensagem-usuario");

    mensagem.textContent = texto;

    historico.appendChild(mensagem);

    rolarConversaParaBaixo();

}


// ========================================
// CRIAR LISTA DE OPÇÕES
// ========================================

// Criei uma função para montar listas de opções seguindo a identidade visual do projeto

function criarListaOpcoes(opcoes, classe, callback) {

    const container = document.createElement("div");

    container.classList.add(classe);


    opcoes.forEach(function (opcao) {

        const botao = document.createElement("button");

        botao.textContent = opcao;

        container.appendChild(botao);


        botao.addEventListener("click", function () {

            // Desativei as opções depois que uma escolha foi realizada

            opcoes.forEach(function (item) {

                const botoes =
                    container.querySelectorAll("button");

                botoes.forEach(function (botaoLista) {

                    botaoLista.disabled = true;

                });

            });


            // Destaquei a opção selecionada em aqua

            botao.classList.add("selecionado");


            // Registrei a interação do usuário

            registrarInteracao();


            // Transformei a escolha em balão do usuário

            adicionarMensagemUsuario(opcao);


            // Executei a próxima etapa da conversa

            callback(opcao);

        });

    });


    historico.appendChild(container);

    rolarConversaParaBaixo();


    return container;

}


// ========================================
// MOSTRAR CONFIRMAÇÃO DA CATEGORIA
// ========================================

// Criei a pergunta para confirmar a categoria identificada

function mostrarConfirmacao(categoria) {

    estadoConversa.categoriaAtual = categoria;

    estadoConversa.etapa = "confirmacao";

    salvarConversa();


    const lista = criarListaOpcoes(

        ["Sim", "Não"],

        "botoes-confirmacao",

        function (escolha) {

            if (escolha === "Sim") {

                mostrarPerguntasDaCategoria(categoria);

            } else {

                mostrarListaCategorias();

            }

        }

    );


    return lista;

}


// ========================================
// MOSTRAR LISTA DE CATEGORIAS
// ========================================

// Criei a lista de cinco categorias para quando a primeira identificação estiver incorreta

function mostrarListaCategorias() {

    estadoConversa.etapa = "categorias";

    salvarConversa();


    adicionarMensagemLume(

        "Poxa, parece que não entendi o que você precisa. Posso te ajudar com as seguintes categorias:"

    );


    criarListaOpcoes(

        [
            "Comunicação",
            "Sensorial",
            "Rotina",
            "Funções Executivas",
            "Convivência",
            "Nenhuma das anteriores"
        ],

        "botoes-categorias",

        function (escolha) {

            if (escolha === "Nenhuma das anteriores") {

                mostrarNenhumaDasAnteriores();

                return;

            }


            estadoConversa.categoriaAtual = escolha;

            mostrarPerguntasDaCategoria(escolha);

        }

    );

}


// ========================================
// MOSTRAR PERGUNTAS DA CATEGORIA
// ========================================

// Criei a lista de quatro perguntas de cada categoria

function mostrarPerguntasDaCategoria(categoria) {

    estadoConversa.categoriaAtual = categoria;

    estadoConversa.etapa = "perguntas";

    salvarConversa();


    adicionarMensagemLume(

        "Eu posso te ajudar com a categoria " +
        categoria +
        ". O que deseja saber?"

    );


    const perguntas =
        conteudoCategorias[categoria].map(function (item) {

            return item.pergunta;

        });


    perguntas.push("Nenhuma das anteriores");


    criarListaOpcoes(

        perguntas,

        "botoes-perguntas",

        function (escolha) {

            if (escolha === "Nenhuma das anteriores") {

                mostrarNenhumaDasAnteriores();

                return;

            }


            mostrarResposta(categoria, escolha);

        }

    );

}


// ========================================
// MOSTRAR RESPOSTA
// ========================================

// Criei a função que localiza a resposta da pergunta escolhida

function mostrarResposta(categoria, pergunta) {

    const item =
        conteudoCategorias[categoria].find(function (item) {

            return item.pergunta === pergunta;

        });


    if (!item) {

        return;

    }


    estadoConversa.etapa = "resposta";

    salvarConversa();


    adicionarMensagemLume(item.resposta);


    // Coloquei as opções para continuar ou encerrar

    adicionarMensagemLume(
        "Posso ajudar com outra dúvida?"
    );


    criarListaOpcoes(

        [
            "Sim",
            "Encerrar conversa"
        ],

        "botoes-finais",

        function (escolha) {

            if (escolha === "Sim") {

                iniciarNovaPergunta();

            } else {

                encerrarManualmente();

            }

        }

    );

}


// ========================================
// NENHUMA DAS ANTERIORES
// ========================================

// Criei o fluxo para quando a informação procurada não estiver disponível

function mostrarNenhumaDasAnteriores() {

    estadoConversa.etapa = "nenhuma";

    salvarConversa();


    adicionarMensagemLume(

        "Poxa, parece que ainda não tenho informações referentes à sua pergunta. Deseja tentar uma nova pergunta ou encerrar?"

    );


    criarListaOpcoes(

        [
            "Tentar nova pergunta",
            "Encerrar conversa"
        ],

        "botoes-finais",

        function (escolha) {

            if (escolha === "Tentar nova pergunta") {

                iniciarNovaPergunta();

            } else {

                encerrarManualmente();

            }

        }

    );

}


// ========================================
// INICIAR NOVA PERGUNTA
// ========================================

// Criei o retorno para a pergunta inicial sem apagar o histórico

function iniciarNovaPergunta() {

    estadoConversa.ativa = true;

    estadoConversa.etapa = "inicial";

    estadoConversa.categoriaAtual = null;

    registrarInteracao();


    campoPerguntaContainer.style.display = "flex";

    campoPergunta.value = "";

    campoPergunta.focus();

}


// ========================================
// ENVIAR PERGUNTA INICIAL
// ========================================

// Criei o envio da pergunta digitada pelo usuário

function enviarPergunta() {

    const pergunta = campoPergunta.value.trim();


    if (pergunta === "") {

        return;

    }


    registrarInteracao();


    // Transformei a pergunta digitada em balão do usuário

    adicionarMensagemUsuario(pergunta);


    // Escondi o campo de texto depois da primeira pergunta

    campoPerguntaContainer.style.display = "none";


    // Identifiquei a categoria relacionada à pergunta

    const categoria =
        identificarCategoria(pergunta);


    if (categoria) {

        adicionarMensagemLume(

            "Sua dúvida parece estar relacionada à categoria " +
            categoria +
            ". Está correto?"

        );


        mostrarConfirmacao(categoria);

    } else {

        adicionarMensagemLume(

            "Poxa, ainda não consegui identificar o assunto da sua dúvida."

        );


        mostrarListaCategorias();

    }


    campoPergunta.value = "";

}


// ========================================
// BOTÃO DE ENVIO
// ========================================

// Coloquei o clique do botão para enviar a pergunta

botaoEnviar.addEventListener(

    "click",

    enviarPergunta

);


// ========================================
// ENTER PARA ENVIAR
// ========================================

// Permiti que a primeira pergunta também seja enviada usando Enter

campoPergunta.addEventListener(

    "keydown",

    function (evento) {

        if (evento.key === "Enter") {

            evento.preventDefault();

            enviarPergunta();

        }

    }

);


// ========================================
// DESTAQUE DO BOTÃO DE ENVIO
// ========================================

// Fiz o botão de envio ficar aqua quando existe texto digitado

campoPergunta.addEventListener("input", function () {

    if (campoPergunta.value.trim() !== "") {

        botaoEnviar.classList.add("ativo");

    } else {

        botaoEnviar.classList.remove("ativo");

    }

});


// ========================================
// ENCERRAMENTO MANUAL
// ========================================

// Criei o encerramento escolhido pelo usuário

function encerrarManualmente() {

    clearTimeout(temporizadorInatividade);


    estadoConversa.ativa = false;

    estadoConversa.etapa = "encerrada-manualmente";


    historico.innerHTML = "";


    tituloLume.textContent =
        "Foi um prazer te ter por aqui, volte sempre";


    botaoEncerrar.textContent = "REINICIAR";

    botaoEncerrar.classList.add("reiniciar");


    campoPerguntaContainer.style.display = "none";


    salvarConversa();

}


// ========================================
// ENCERRAMENTO POR INATIVIDADE
// ========================================

// Criei o encerramento automático depois de cinco minutos sem interação

function encerrarPorInatividade() {

    clearTimeout(temporizadorInatividade);


    estadoConversa.ativa = false;

    estadoConversa.etapa = "encerrada-inatividade";


    historico.innerHTML = "";


    adicionarMensagemLume(

        "Esta conversa foi encerrada por inatividade."

    );


    tituloLume.textContent =
        "Foi um prazer te ter por aqui, volte sempre";


    botaoEncerrar.textContent = "REINICIAR";

    botaoEncerrar.classList.add("reiniciar");


    campoPerguntaContainer.style.display = "none";


    salvarConversa();

}


// ========================================
// REINICIAR CONVERSA
// ========================================

// Criei o reinício completo da conversa

function reiniciarConversa() {

    clearTimeout(temporizadorInatividade);


    localStorage.removeItem(CHAVE_CONVERSA);


    estadoConversa = {

        ativa: true,

        ultimaInteracao: Date.now(),

        categoriaAtual: null,

        etapa: "inicial"

    };


    historico.innerHTML = "";


    adicionarMensagemLume(

        "como posso te ajudar hoje?"

    );


    tituloLume.textContent =
        "Olá eu sou o Lume.";


    campoPerguntaContainer.style.display = "flex";

    campoPergunta.value = "";

    botaoEnviar.classList.remove("ativo");


    botaoEncerrar.textContent = "ENCERRAR";

    botaoEncerrar.classList.remove("reiniciar");


    registrarInteracao();

}


// ========================================
// BOTÃO ENCERRAR / REINICIAR
// ========================================

// Fiz o mesmo botão assumir a função de encerrar ou reiniciar

botaoEncerrar.addEventListener("click", function () {

    if (estadoConversa.ativa) {

        encerrarManualmente();

    } else {

        reiniciarConversa();

    }

});


// ========================================
// RECUPERAR CONVERSA
// ========================================

// Recuperei a conversa salva quando a página é recarregada

function recuperarConversa() {

    const dadosSalvos =
        localStorage.getItem(CHAVE_CONVERSA);


    if (!dadosSalvos) {

        iniciarTemporizador();

        return;

    }


    try {

        const dados =
            JSON.parse(dadosSalvos);


        estadoConversa = dados.estado;


        historico.innerHTML =
            dados.historico;


        campoPerguntaContainer.style.display =
            dados.inputVisivel
                ? "flex"
                : "none";


        tituloLume.textContent =
            dados.titulo;


        botaoEncerrar.textContent =
            dados.textoBotao;


        if (!estadoConversa.ativa) {

            botaoEncerrar.classList.add("reiniciar");

            return;

        }


        botaoEncerrar.classList.remove("reiniciar");


        iniciarTemporizador();


        setTimeout(function () {

            rolarConversaParaBaixo();

        }, 50);


        reconectarBotoes();

    } catch (erro) {

        console.error(
            "Não foi possível recuperar a conversa.",
            erro
        );

        reiniciarConversa();

    }

}


// ========================================
// RECONECTAR BOTÕES APÓS RECARREGAR
// ========================================

// Reconectei os botões da conversa depois de um recarregamento

function reconectarBotoes() {

    const botoes =
        historico.querySelectorAll("button");


    botoes.forEach(function (botao) {

        const texto =
            botao.textContent.trim();


        botao.addEventListener(
            "click",
            function () {

                registrarInteracao();


                // Mantive o comportamento das opções salvas após o recarregamento

                if (
                    texto === "Sim" ||
                    texto === "Não"
                ) {

                    const categoria =
                        estadoConversa.categoriaAtual;


                    adicionarMensagemUsuario(texto);


                    botao.disabled = true;

                    botao.classList.add("selecionado");


                    if (texto === "Sim") {

                        mostrarPerguntasDaCategoria(categoria);

                    } else {

                        mostrarListaCategorias();

                    }

                }

            }

        );

    });

}


// ========================================
// INICIALIZAÇÃO
// ========================================

// Iniciei o estado salvo quando o site é aberto

recuperarConversa();