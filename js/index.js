
tinymce.init({
    selector: '#descripcion-txt',
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });
  

const pokemones = [];
const eliminarPokemon = async function(){
  let res = await Swal.fire({
    title:`Desea enviar al profesor oak el pokemon ${pokemones[this.nro].nombre}?`,
    showCancelButton:true,
    confirmButtonText:"Si, enviar!"

  })

  if (res.isConfirmed){
    pokemones.splice(this.nro,1);
    cargarTabla();
    Swal.fire("Pokemon enviado al profesor oak!");
  }else{
    Swal.fire("Operacion cancelada");
  }
}

const cargarTabla = ()=>{

  let tbody = document.querySelector("#tabla-tbody");
  tbody.innerHTML = "";

  for(let i = 0; i < pokemones.length; ++i){

    let p = pokemones[i];
    let tr = document.createElement("tr");
    let tdNro = document.createElement("td");
    tdNro.innerText = (i+1);
    let tdNombre = document.createElement("td");
    tdNombre.innerText = p.nombre;
    if (p.legendario) {
      tdNombre.classList.add("text-warning");
    }
    let tdTipo = document.createElement("td");
    let icono = document.createElement("i");

    switch (p.tipo) {
        case "planta":
          icono.classList.add("fas", "fa-leaf", "text-success", "fa-3x");
          break;
        
        case "fuego":
          icono.classList.add("fas", "fa-fire", "text-danger", "fa-3x");
          break;

        case "agua":
          icono.classList.add("fas", "fa-tint", "text-primary", "fa-3x");
          break;
        
        case "electrico":
          icono.classList.add("fas", "fa-bolt", "text-warning", "fa-3x");
          break;
        
        case "hielo":
          icono.classList.add("fas", "fa-snowflake", "text-info", "fa-3x");
          break;

        case "lucha":
          icono.classList.add("fas", "fa-fist-raised", "fa-3x");
          break;
        
        case "veneno":
          icono.classList.add("fas", "fa-skull-crossbones", "fa-3x");
          break;
        
        case "tierra":
          icono.classList.add("fas", "fa-mountain", "fa-3x");
          break;

        case "volador":
          icono.classList.add("fas", "fa-dove", "fa-3x");
          break;
        
        case "psiquico":
          icono.classList.add("fas", "fa-brain", "fa-3x");
          break;
        
        case "bicho":
          icono.classList.add("fas", "fa-bug", "fa-3x");
          break;
        
        case "roca":
          icono.classList.add("fas", "fa-gem", "fa-3x");
          break;
        
        case "fantasma":
          icono.classList.add("fas", "fa-ghost", "fa-3x");
          break;
        
        case "dragon":
          icono.classList.add("fas", "fa-dragon", "fa-3x");
          break;
        
        case "siniestro":
          icono.classList.add("fas", "fa-pastafarianism", "fa-3x");
          break;
        
        case "acero":
          icono.classList.add("fas", "fa-square", "fa-3x");
          break;
        
        case "hada":
          icono.classList.add("fas", "fa-hat-wizard", "fa-3x");
          break;


        default:
          icono.classList.add("fas", "fa-star", "fa-3x");
          break;
    }

    tdTipo.appendChild(icono);
    let tdDesc = document.createElement("td");
    tdDesc.innerHTML = p.descripcion;
    let tdAcciones = document.createElement("td");
    tdAcciones.classList.add("text-center");
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Eliminar";
    boton.nro = i;
    boton.addEventListener("click", eliminarPokemon);
    tdAcciones.appendChild(boton);

    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
    
  }

};

document.querySelector("#registrar-btn").addEventListener("click", ()=>{

    let nombre = document.querySelector("#nombre-txt").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();
    let legendario = document.querySelector("#legendario-si").checked;
    let tipo = document.querySelector("#tipo-select").value;

    let pokemon = {};
    pokemon.nombre = nombre;
    pokemon.descripcion = descripcion;
    pokemon.legendario = legendario;
    pokemon.tipo = tipo;

    pokemones.push(pokemon);
    cargarTabla();
    Swal.fire("Exito!","Pokemon registrado", "success");
    
});

document.querySelector('#limpiar-btn').addEventListener("click", () => {

  document.querySelector("#nombre-txt").value = "";
  //document.querySelector("#descripcion-txt").value = "";
  tinymce.get("descripcion-txt").setContent("");
  document.querySelector("#legendario-no").checked = true;
  document.querySelector("#tipo-select").value = "normal";



});