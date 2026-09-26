 const ruleta = document.getElementById("ruleta");
const girar = document.getElementById("girar");
const resultado = document.getElementById("resultado");

let opciones = [];
let rotacionActual = 0;
let girando = false;
let numeroDeGiro = 0;

// Números que podrán salir en el sexto giro
const numerosPermitidos = [25, 87, 143, 256, 399];


// ==========================
// NÚMEROS DEL 1 AL 500
// ==========================

opciones = Array.from(
    { length: 500 },
    (_, i) => i + 1
);


// ==========================
// COLORES
// ==========================

const colores = [
    "#ef6a6a",
    "#63c7c4",
    "#f0d65a",
    "#6d72d9",
    "#e59a9a",
    "#79bd8f",
    "#f39c5a",
    "#8e7cc3"
];


// ==========================
// CREAR RULETA
// ==========================

function crearRuleta() {

    const cantidad = opciones.length;
    const angulo = 360 / cantidad;

    ruleta.innerHTML = `
        <div class="centro">🎯</div>
    `;


    // Crear colores
    let gradiente = "";

    for (let i = 0; i < cantidad; i++) {

        const inicio = i * angulo;
        const fin = (i + 1) * angulo;

        gradiente +=
            `${colores[i % colores.length]} ${inicio}deg ${fin}deg`;

        if (i < cantidad - 1) {
            gradiente += ", ";
        }
    }


    ruleta.style.background =
        `conic-gradient(${gradiente})`;


    resultado.textContent =
        "Ruleta lista: números del 1 al 500";
}


// ==========================
// GIRAR
// ==========================

girar.addEventListener("click", () => {

    if (girando) return;

    girando = true;
    girar.disabled = true;


    const cantidad = opciones.length;
    const angulo = 360 / cantidad;


    // Elegir número ganador
   numeroDeGiro++;

let ganador;

if (numeroDeGiro <= 5) {

    // GIROS 1 AL 5
    // Cualquier número del 1 al 500
    ganador = Math.floor(
        Math.random() * cantidad
    );

} else {

    // GIRO 6 EN ADELANTE
    // Solamente números de nuestra lista
    const numeroElegido =
        numerosPermitidos[
            Math.floor(
                Math.random() * numerosPermitidos.length
            )
        ];

    ganador = numeroElegido - 1;
}


    // Centro de la sección ganadora
    const anguloGanador =
        ganador * angulo + angulo / 2;


    // Posición de la flecha
    const posicionFlecha = 90;


    // Rotación actual
    const posicionActual =
        ((rotacionActual % 360) + 360) % 360;


    // Calcular cuánto debe girar
    let diferencia =
        posicionFlecha -
        (anguloGanador + posicionActual);


    diferencia =
        ((diferencia + 360) % 360);


    // 5 vueltas
    const vueltas = 5 * 360;


    rotacionActual +=
        vueltas + diferencia;


    ruleta.style.transform =
        `rotate(${rotacionActual}deg)`;


    // Esperar a que termine
    setTimeout(() => {

        resultado.innerHTML =
            `🎉 Número ganador: <strong>${opciones[ganador]}</strong>`;

        girando = false;
        girar.disabled = false;

    }, 4000);

});


// ==========================
// INICIAR
// ==========================

crearRuleta();