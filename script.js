const display = document.getElementById("display");
const historico = document.getElementById("historico");


// =====================================
// ATUALIZAR DISPLAY
// =====================================

function animarDisplay(classe = "display-pop") {

    display.classList.remove(
        "display-pop",
        "resultado",
        "erro"
    );

    void display.offsetWidth;

    display.classList.add(classe);
}


// =====================================
// ADICIONAR
// =====================================

function adicionar(valor) {

    if (display.value === "Erro") {
        display.value = "";
    }

    if (
        display.value === "0" &&
        valor !== "."
    ) {
        display.value = valor;
    } else {
        display.value += valor;
    }

    animarDisplay();
}


// =====================================
// LIMPAR
// =====================================

function limpar() {

    display.value = "0";
    historico.textContent = "";

    animarDisplay();
}


// =====================================
// APAGAR
// =====================================

function apagar() {

    if (
        display.value.length <= 1 ||
        display.value === "Erro"
    ) {
        display.value = "0";
    } else {
        display.value =
            display.value.slice(0, -1);
    }

    animarDisplay();
}


// =====================================
// PORCENTAGEM
// =====================================

function porcentagem() {

    try {

        const valor =
            eval(display.value) / 100;

        display.value = valor;

        animarDisplay();

    } catch {

        mostrarErro();

    }
}


// =====================================
// CALCULAR
// =====================================

function calcular() {

    try {

        if (
            display.value === "" ||
            display.value === "Erro"
        ) {
            return;
        }

        const expressao =
            display.value;

        const resultado =
            eval(expressao);

        historico.textContent =
            expressao
                .replace(/\*/g, "×")
                .replace(/\//g, "÷")
            + " =";

        display.value = resultado;

        animarDisplay("resultado");

    } catch {

        mostrarErro();

    }
}


// =====================================
// ERRO
// =====================================

function mostrarErro() {

    display.value = "Erro";

    animarDisplay("erro");

    setTimeout(() => {

        if (display.value === "Erro") {
            display.value = "0";
        }

    }, 900);
}


// =====================================
// EFEITO RIPPLE
// =====================================

function criarRipple(botao, event) {

    const ripple =
        document.createElement("span");

    ripple.classList.add("ripple");

    const rect =
        botao.getBoundingClientRect();

    const x =
        (event.clientX || rect.left + rect.width / 2)
        - rect.left;

    const y =
        (event.clientY || rect.top + rect.height / 2)
        - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    botao.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}


// =====================================
// BOTÕES
// =====================================

const botoes =
    document.querySelectorAll("button");

botoes.forEach(botao => {

    botao.addEventListener("click", event => {

        criarRipple(botao, event);

        const tecla =
            botao.dataset.key;

        if (!tecla) return;

        if (tecla === "Enter") {
            calcular();
        }

        else if (tecla === "Escape") {
            limpar();
        }

        else if (tecla === "Backspace") {
            apagar();
        }

        else if (tecla === "%") {
            porcentagem();
        }

        else {
            adicionar(tecla);
        }

    });

});


// =====================================
// TECLADO
// =====================================

document.addEventListener(
    "keydown",
    event => {

        const tecla =
            event.key;

        const botao =
            document.querySelector(
                `button[data-key="${CSS.escape(tecla)}"]`
            );

        // Efeito físico
        if (botao) {

            botao.classList.add(
                "pressionado"
            );

            setTimeout(() => {

                botao.classList.remove(
                    "pressionado"
                );

            }, 120);
        }


        // Números
        if (
            tecla >= "0" &&
            tecla <= "9"
        ) {

            adicionar(tecla);

        }


        // Operadores
        else if (
            tecla === "+" ||
            tecla === "-" ||
            tecla === "*" ||
            tecla === "/"
        ) {

            adicionar(tecla);

        }


        // Decimal
        else if (
            tecla === "." ||
            tecla === ","
        ) {

            adicionar(".");

        }


        // Enter
        else if (
            tecla === "Enter" ||
            tecla === "="
        ) {

            calcular();

        }


        // Backspace
        else if (
            tecla === "Backspace"
        ) {

            apagar();

        }


        // Escape
        else if (
            tecla === "Escape"
        ) {

            limpar();

        }


        // Porcentagem
        else if (
            tecla === "%"
        ) {

            porcentagem();

        }

    }
);