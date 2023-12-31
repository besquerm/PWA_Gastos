var restante = 0;

const guardarPresupuesto=()=>{
    let presupuesto = parseInt(document.querySelector("#presupuestoInicial").value);
    if(presupuesto < 1 || isNaN(presupuesto)){
        mostrarError("#msj-error-pregunta", "MONTO NO VALIDO")
        return;
    }

    localStorage.setItem("presupuesto", presupuesto);
    localStorage.setItem("gastos", JSON.stringify([]));
    actualizarVista();

}

const actualizarVista=()=>{
    let presupuesto = localStorage.getItem("presupuesto");
    restante = presupuesto;

    let divPregunta = document.querySelector("#pregunta");
    let divGastos = document.querySelector("#divGastos");
    let divControlGastos = document.querySelector("#divControlGastos");
    divGastos.style.display = "none";

    let controlGastos = `<div class="gastos-realizados">
                            <h2>Listado de Gastos</h2>
                            <div class="alert alert-primary">
                                Presupuesto:${presupuesto}
                            </div>
                            <div class="alert alert-success">
                                Restante: ${presupuesto}
                            </div>
                         </div>`

    divControlGastos.innerHTML=controlGastos

    if(!presupuesto){
        divPregunta.style.display = "block";
    }
    else{
        divPregunta.style.display = "none";
        divGastos.style.display = "block"
        divControlGastos.innerHTML=controlGastos
    }
}

const agregarGasto=()=>{
    let tipoGasto = document.querySelector("#tipoGasto").value;
    let cantidad = parseInt(document.querySelector("#cantidad").value);

    if(cantidad < 1 || isNaN(cantidad) || tipoGasto.trim()===""){
        mostrarError("#msj_error_creargasto", "ERROR AL CREAR GASTO");
        return;
    }

    if(cantidad>restante){
        mostrarError("#msj_error_creargasto", "GASTO MAYOR A RESTANTE");
        return;
    }

    let nuevoGasto={
        tipoGasto,
        cantidad
    }

    let gastos = JSON.parse(localStorage.getItem("gastos"));
    gastos.push(nuevoGasto);
    localStorage.setItem("gastos",JSON.stringify(gastos));
    document.querySelector("#formGastos").reset();

    refrescarLista();
}

const refrescarLista=()=>{
    let presupuesto = localStorage.getItem("presupuesto");
    let gastos = JSON.parse(localStorage.getItem("gastos"));

    let totalGastos = 0;
    let listadoHTML = ``;
    gastos.map(gasto=>{
        listadoHTML+=`<li class="gastos">
                        <p>${gasto.tipoGasto} 
                        <span class="gasto">$ ${gasto.cantidad}</span>
                        </p>
                       </li>`;
            totalGastos+=parseInt(gasto.cantidad);
        });

        restante = presupuesto - totalGastos;

        let divControlGastos = document.querySelector("#divControlGastos")
        divControlGastos.innerHTML = ``;

        if((presupuesto/4)>restante){
            clase = "alert-danger";
        }else if((presupuesto/2)>restante){
            clase = "alert-warning";
        }else{
            clase = "alert-success";
        }

        divControlGastos.innerHTML = `<div class="gastos-realizados">
                                        <h2>LIstado de Gastos</h2>
                                        ${listadoHTML}
                                        <div class="alert alert-primary">
                                        Presupuesto:$ ${presupuesto}</div>
                                        <div class=${clase}>
                                        Presupuesto:$ ${restante}</div>
                                      </div>`

}

const reiniciarPresupuesto=()=>{
    localStorage.clear();
    location.reload(true);
}

const mostrarError=(elemento, mensaje)=>{
    divError = document.querySelector(elemento);
    divError.innerHTML = `<p class="alert-danger">${mensaje}</p>`;
    setTimeout(()=>{ divError.innerHTML = ``;}, 2000);
}
