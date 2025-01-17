const verBalances = document.getElementById("ver-balance");
const verCategorias = document.getElementById("ver-categorias");
const verReportes = document.getElementById("ver-reportes");
const seccionBalances = document.getElementById("seccion-balances");
const seccionCategorias = document.getElementById("seccion-categorias");
const seccionReportes = document.getElementById("seccion-reportes");
const seccionNuevaOperacion = document.getElementById("seccion-agregar-operacion");
const sinReportes = document.getElementById("sin-reportes");
const conReportes = document.getElementById("con-reportes");




//categorias//
const categoriasInput = document.getElementById("categorias-input");
const botonAgregarCategoria = document.getElementById("boton-agregar-categoria");
const listadoCategorias = document.querySelector("#listado-categorias");

verCategorias.addEventListener("click", (e) => {
    seccionCategorias.classList.remove("is-hidden");
    seccionBalances.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    boxOperaciones.classList.add("is-hidden")
});
verBalances.addEventListener("click", (e) => {
    seccionBalances.classList.remove("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    boxOperaciones.classList.add("is-hidden")

});
verReportes.addEventListener("click", (e) => {
    seccionBalances.classList.add("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.remove("is-hidden");
    seccionNuevaOperacion.classList.add("is-hidden");
    boxOperaciones.classList.add("is-hidden")

});



const botonNuevaOperacion = document.getElementById("boton-nueva-operacion");
const seccionAgregarOperacion = document.getElementById("seccion-agregar-operacion");
const formNuevaOperacion = document.getElementById("formulario-nueva-operacion")


botonNuevaOperacion.addEventListener("click", (e) => {
    seccionBalances.classList.add("is-hidden");
    seccionAgregarOperacion.classList.remove("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    formNuevaOperacion.classList.remove("is-hidden")

})

//---------------------------CREAR NUEVA OPERACION-------------------
const descripcionNuevaOperacion = document.getElementById("input-descripcion-nueva-operacion");
const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
const categoriaNuevaOperacion = document.getElementById("categoria-nueva-operacion");
const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");
const botonAgregarNuevaOperacion = document.getElementById("boton-agregar-operacion")
const formularioOperacion = document.getElementById('formulario-operacion')
const boxOperaciones = document.getElementById("operaciones-realizadas");

// --------------------array de objetos(operaciones)----------------
let arrayDeOperaciones = []
console.log(arrayDeOperaciones)

montoNuevaOperacion.onchange = () => {
    console.log(montoNuevaOperacion.value)
}
tipoNuevaOperacion.onchange = (event) => {
    console.log(tipoNuevaOperacion.value)
}
categoriaNuevaOperacion.onchange = (event) => {
    console.log(categoriaNuevaOperacion.value)
}
descripcionNuevaOperacion.onchange = (event) => {
    console.log(descripcionNuevaOperacion.value)
}
fechaNuevaOperacion.oninput = () => {
    console.log(fechaNuevaOperacion.value)
}
botonAgregarNuevaOperacion.addEventListener('click', () => {
    arrayDeOperaciones.push({
        monto: montoNuevaOperacion.value,
        tipo: tipoNuevaOperacion.value,
        categoria: categoriaNuevaOperacion.value,
        descripcion: descripcionNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    })
    console.log(arrayDeOperaciones)

})

const copiaArrayDeOperaciones = [...arrayDeOperaciones]

const mostrarOperacionesEnHTML = (array) => {
    let acc = ``
    array.map((elemento) => {
        dateArray = elemento.fecha.split("-")
        fechaIntefaz = dateArray[2] + "-" + dateArray[1] + '-' + dateArray[0]
        acc = acc + `<div class="columns">
                        <div class="column is-3">
                            <h3 class="has-text-weight-bold">
                            ${elemento.descripcion}
                        </h3>
                    </div>
                    <div class="column is-3">
                        <span class="tag is-primary is-light">
                        ${elemento.categoria}
                        </span>
                    </div>
                    <div class="column has-text-grey">
                        ${fechaIntefaz}
                    </div>
                    <div class="column has-text-weight-bold">
                        ${elemento.monto}
                    </div>
                    <div class="column">
                        ${elemento.tipo}
                    </div>
                 </div>`

    })

    return acc
}


// boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayDeOperaciones)
const boxSinOperaciones = document.getElementById("sin-operaciones")
const boxConOperaciones = document.getElementById('titulos-operaciones')

botonAgregarNuevaOperacion.onclick = () => {
    boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayDeOperaciones)
    seccionBalances.classList.remove("is-hidden");
    seccionAgregarOperacion.classList.add("is-hidden");
    seccionCategorias.classList.add("is-hidden");
    seccionReportes.classList.add("is-hidden");
    boxSinOperaciones.classList.add("is-hidden");
    boxConOperaciones.classList.remove("is-hidden")
        // arrayConvertidoAJSON = JSON.stringify(arrayDeOperaciones, 'arrayDeOperaciones');
        // localStorage.setItem('arrayDeOperaciones', arrayDeOperaciones)
    localStorage.setItem('arrayDeOperaciones', JSON.stringify(arrayDeOperaciones, 'arrayDeOperaciones'));
}



//----------------------Función ocultar o mostrar filtros------------------------

let ocultarFiltro = document.getElementById('click-filtros'),
    boxFiltro = document.getElementById('despliege-filtro'),
    contador = 0;

function cambio() {
    if (contador == 0) {
        ocultarFiltro.innerText = 'Mostrar filtros'
        boxFiltro.classList.add('is-hidden')
        contador = 1;
    } else {
        ocultarFiltro.innerText = 'Ocultar filtros'
        boxFiltro.classList.remove('is-hidden')
        contador = 0;
    }
}
ocultarFiltro.addEventListener('click', cambio, true)

/***********************************************************************************/

/*---------------------------Elementos del DOM-------------------------------------*/
const filtroTipo = document.getElementById("filtro-tipo")
const filtroCategoria = document.getElementById("filtro-categoria")


const filtroFecha = document.getElementById("filtro-fecha")

const ordenar = document.getElementById("filtro-ordenar")


/*------------------------Aplicación de filtros según elección---------------------*/

const aplicarFiltros = () => {
    const tipo = filtroTipo.value
    const filtradoPorTipo = arrayDeOperaciones.filter((elemento) => {
        if (tipo === "todos") {
            return elemento
        }
        return elemento.tipo === tipo
    })

    const categoria = filtroCategoria.value
    const filtradoPorCategoria = filtradoPorTipo.filter((elemento) => {
        if (categoria === "todos") {
            return elemento
        }
        return elemento.categoria === categoria
    })

    const fechaDesde = filtroFecha.value
    filtradoPorFecha = filtradoPorCategoria.filter((elemento) => {

            if (fechaDesde === 0) {
                return elemento
            }
            return elemento.fecha >= fechaDesde
        })
        /*------------------------------Agregado Ordenamiento-----------------------------------*/
    console.log(ordenar.value)
    switch (ordenar.value) {
        case 'recientes':
            filtradoPorFecha = ordernarPorFecha(filtradoPorFecha, 'DESC')
            break
        case 'antiguas':
            filtradoPorFecha = ordernarPorFecha(filtradoPorFecha, 'ASC')
            break
        case 'monto_mayor':
            filtradoPorFecha = ordernarPorMonto(filtradoPorFecha, 'DESC')
            break
        case 'monto_menor':
            filtradoPorFecha = ordernarPorMonto(filtradoPorFecha, 'ASC')
            break
        case 'A/Z':
            filtradoPorFecha = ordernarPorDescripcion(filtradoPorFecha, 'ASC')
            break
        case 'Z/A':
            filtradoPorFecha = ordernarPorDescripcion(filtradoPorFecha, 'DESC')
            break
        default:
    }

    return filtradoPorFecha

}

/*----------------aplicar método sort() para orden del (array) ----------------------------*/

const ordernarPorFecha = (arrayVariable, ordenar) => {
    console.log(arrayVariable)
    return [...arrayVariable].sort((a, b) => {
        const fechaA = new Date(a.fecha)
        const fechaB = new Date(b.fecha)
        return ordenar === 'ASC' ?
            fechaA.getTime() - fechaB.getTime() :
            fechaB.getTime() - fechaA.getTime()
    })
}

const ordernarPorMonto = (arrayVariable, ordenar) => {
    return [...arrayVariable].sort((a, b) => {
        return ordenar === 'ASC' ? a.monto - b.monto : b.monto - a.monto
    })
}

const ordernarPorDescripcion = (arrayVariable, ordenar) => {
    if (ordenar === 'ASC') {
        return [...arrayVariable].sort((a, b) => {
            if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
                return -1
            }
            if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
                return 1
            }
            return 0
        })
    } else {
        return [...arrayVariable].sort((a, b) => {
            if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
                return -1
            }
            if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
                return 1
            }
            return 0
        })
    }

}

/*---------------------------Eventos para el filtro----------------------------------------*/

filtroTipo.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
}

filtroCategoria.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
}
filtroFecha.onchange = () => {
        const arrayFiltrado = aplicarFiltros()
        boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    }
    /*********************************************************************************************/
ordenar.onchange = () => {
        const arrayFiltrado = aplicarFiltros()
        boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    }
    /******************************************************************************************** */

//Si el usuario elige ver fechas (Mas recientes) se aplica sort (b-a)
//Si el usuario elige ver fechas (Menos recientes) se aplica sort (a-b)
//Esto mismo se puede aplicar a monto mayor y menor  



// // -----------------CONVERTIR A JSON-----------
//  const ConvertirAJSON = JSON.stringify(arrayDeOperaciones, 'operaciones');


// // ---------GUARDAR EN LOCAL STORAGE--------
//  localStorage.setItem('operaciones', personaConvertidoAJSON)

// //---------------OBTENER INFO DEL LOCAL STOGARE------------------
// const infoGuardada = localStorage.getItem('operaciones');

// //-----------CONVERTIR DE JSON A JS-------------------
//  const infoGuardadaEnJS = JSON.parse(infoGuardada)


const operaciones = [{
        descripción: "asdasd",
        tipo: "gasto",
        monto: 500,
        categoria: "comida",
    },

    {
        descripción: "asdasd",
        tipo: "ganancia",
        monto: 700,
        categoria: "comida",
    },

    {
        descripción: "asdasd",
        tipo: "ganancia",
        monto: 7090,
        categoria: "comida",
    },


    {
        descripción: "asdasd",
        tipo: "gasto",
        monto: 508880,
        categoria: "comida",
    },

]


console.log(operaciones)

const verificarOperacionesEnReportes = () => {
    const operacionVerificada = operaciones.map((elemento, index) => {

        if (index > 1) {
            conReportes.classList.remove("is-hidden");
            sinReportes.classList.add("is-hidden");

        } else {
            conReportes.classList.add("is-hidden");
            sinReportes.classList.remove("is-hidden");
        }

    })
    return operacionVerificada

}

verificarOperacionesEnReportes()


const mayorGananciaTotal = document.getElementById("mayor-ganancia-total")
const mayorGastoTotal = document.getElementById("mayor-gasto-total")
const mayorBalanceTotal = document.getElementById("mayor-balance-total")



// reportes: categoria con mayor ganancia

const arrayFiltrado = (array, tipo) => {

    const arrayFilter = array.filter((elemento) => {
        return elemento.tipo === tipo
    })
    return arrayFilter
}

const categoriaMayorGanancia = (array) => {
    const arraySort = array.sort((a, b) => {
        return b.monto - a.monto
    }, 0)

    let acc = ""
    for (let i = 0; i < 1; i++) {
        return acc += ` <div class="column is-8 has-text-weight-medium has-text-left">Categoría con mayor ganancia</div>
         <div class="column is-1 tag is-primary is-light has-text-left p-4">${arraySort[0].categoria}</div>
         <div class="column is-3 has-text-weight-bold has-text-success has-text-right"> +$ ${arraySort[0].monto}</div>`
    }
}

const categoriaMayorGasto = (array) => {
    const arraySort = array.sort((a, b) => {
        return b.monto - a.monto

    }, 0)

    let acc = ""
    for (let i = 0; i < 1; i++) {
        return acc += `<div class="column is-8 has-text-weight-medium has-text-left">Categoría con mayor gasto</div>
         <div class="column is-1 tag is-primary is-light has-text-left p-4">${arraySort[0].categoria}</div>
         <div class="column is-3 has-text-weight-bold has-text-danger has-text-right"> -$ ${arraySort[0].monto}</div>`

    }
}

mayorGananciaTotal.innerHTML = categoriaMayorGanancia(arrayFiltrado(operaciones, "ganancia"))
mayorGastoTotal.innerHTML = categoriaMayorGasto(arrayFiltrado(operaciones, "gasto"))

//CATEGORIAS//
let categorias = [
    "Comidas",
    "Servicios",
    "Salidas",
    "Educación",
    "Transporte",
    "Trabajo",
    "Salud",
];
const estructuraHtml = (array) => {
    let acc = ``
    array.map((elemento) => {
        acc = acc + `<div class="columns" >
            <div class="column">
               <div class="columns is-vcentered is-mobile mt-4">
                 <div class="column is-9">
                   <p class="tag is-primary is-light">${elemento}</p>
                 </div>
                 <div class="column is-3">
                   <div class="columns is-justify-content-flex-end is-mobile">
                     <button class="button is-ghost is-small">Editar</button>
                     <button class="button is-ghost is-small">Eliminar</button>
                   </div>
                </div>
              </div>
             </div>
          </div>`


    })
    return acc
}
listadoCategorias.innerHTML = estructuraHtml(categorias);
categoriasInput.onchange = () => {
    console.log(categoriasInput.value)
}
botonAgregarCategoria.onclick = () => {

    categorias.unshift(categoriasInput.value)
    console.log(categorias)
    listadoCategorias.innerHTML = estructuraHtml(categorias);

    const categoriasAJSON = JSON.stringify('categorias', categorias);
    localStorage.setItem("categorias", categoriasAJSON);
    listadoCategorias.innerHTML = estructuraHtml(categorias);

    // agregarCategoriasAlABMDeCategorias();
};

botonAgregarCategoria.addEventListener('click', () => {})


const obtenerCategorias = () => {
    const categoriasGuardadasEnElLocalStorage =
        localStorage.getItem("categorias");
    const categoriasGuardadasJSONaJS = JSON.parse(categoriasGuardadasEnElLocalStorage);
    if (categoriasGuardadasEnElLocalStorage === null) {
        return categorias;
    } else {
        return categoriasGuardadasJSONaJS;
    }
};


//inicialización


// const recuperoValores = () => {
//     const infoGuardada = localStorage.getItem('arrayDeOperaciones');
//     const infoAJS = JSON.parse(infoGuardada)
//     return infoAJS
// }
// const inicializacion = () => {
//     boxOperaciones.innerHTML = mostrarOperacionesEnHTML(recuperoValores)
// }

// document.addEventListener("DOMContentLoaded", inicializacion());
document.onload = () => {
    const infoGuardada = localStorage.getItem('arrayDeOperaciones');
    const infoAJS = JSON.parse(infoGuardada)
    boxOperaciones.innerHTML = mostrarOperacionesEnHTML(infoAJS)
}

// inicializacion()
// window.onload = inicializacion();
// const recuperoValores=()=> {
//     const infoGuardada = localStorage.getItem('arrayDeOperaciones');
//     return JSON.parse(infoGuardada)
//   }
// document.addEventListener("DOMContentLoaded", recuperoValores);
// const agregarCategoriasAlABMDeCategorias = (array) => {
// const categorias = obtenerCategorias();
//     const estructuraHtml = categorias.reduce((acc, elemento) => {
//         return (
//             acc +
//             
//           <div class="columns" >
//             <div class="column">
//               <div class="columns is-vcentered is-mobile mt-4">
//                 <div class="column is-9">
//                   <p class="tag is-primary is-light">${elemento}</p>
//                 </div>
//                 <div class="column is-3">
//                   <div class="columns is-justify-content-flex-end is-mobile">
//                     <button class="button is-ghost is-small">Editar</button>
//                     <button class="button is-ghost is-small">Eliminar</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `
//         );
//     }, ``);
//     
// };
// agregarCategoriasAlABMDeCategorias();