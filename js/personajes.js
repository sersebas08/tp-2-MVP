import CONST from "./constant.js";

export const buscarPersonajesNombres = () => `query {
 characters( filter: { name: "" }) {
    results {
      id  
      name
      image
      species
      status
      origin{
        name
      }
      location {
        name
      }
    }
  }
}`
export function buscarPersonajes() {

    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: buscarPersonajesNombres()
        })
    }
    fetch(`https://rickandmortyapi.com/graphql?query=${buscarPersonajesNombres()}`, options)
        .then(function(response){
            return response.json();})
        .then(function (data){
            leerPersonajes(data);
            /*console.log('simpsonas data: ', data);*/
        })
        .catch(function (err){
            console.log("este es el error", err);})
}

function leerPersonajes(data){
    let appi = data.data.characters.results;
   /* console.log('esta es mi appi personajes ', appi);*/
    let images = '';

    for (let i = 0; i < appi.length; i++) {
        images += `<div class="divPersonajesHome">
                        <div class="personajes">
                             <picture class="w-full p-2">
                               <source media="(min-width: 751px)" srcset="${appi[i].image}">
                               <source media="(min-width: 380px)" srcset="${appi[i].image}">
                               <img src="${appi[i].image}" class="img " alt="Mi imagen responsive">
                             </picture>
                             <div class="divSelect">
                                 <h3 class="personaje__h3">${appi[i].name}</h3>
                                 <h4 class="personaje__h4">${appi[i].species}</h4>
                                 <div class="divSelec__divBotones">
                                    <p class="btnFavorito m-2"><i class="bi bi-star-fill mr-2 perri2"></i></p>
                                    <p class="btnMeGusta m-2"><i class="bi bi-heart-fill mr-2 perri"></i></p>
                                    <p class="btnVerMas m-2"><i class="bi bi-eye-fill mr-2 perri3"></i></p>
                                 </div>
                             </div>
                        </div>
                        <div  class="personajes__div hidden">
                            <picture class="w-9/12 p-2">
                              <source media="(min-width: 751px)" srcset="${appi[i].image}">
                              <source media="(min-width: 380px)" srcset="${appi[i].image}">
                              <img src="${appi[i].image}" class="img " alt="Mi imagen responsive">
                            </picture>
                            <div class="personajes__div">
                                <ul class="personajes__divUl">
                                    <li><span class="uno">Status</span>${appi[i].status}</li>
                                    <li><span class="uno">Specie</span>${appi[i].species}</li>
                                    <li><span class="uno">Nombre</span>${appi[i].name}</li>
                                    <li><span class="uno">Ubicacion</span>${appi[i].location.name}</li>
                                </ul>
                            </div>
                            <button id="btnVolve" class="btn__uno">Volver a Home</button>
                        </div>
                    </div>`;

    }
    CONST.divVista.innerHTML = `<div class="phil">${images}</div>`;
    let estadoFavorito = 0;
    let estado = 0;
    /*const favorito = document.querySelector('.perri2');*/
    let btnFavorito = document.querySelectorAll('.btnFavorito');
    let btnMegusta = document.querySelectorAll('.btnMeGusta');
    let btnVerMas = document.querySelectorAll('.btnVerMas');
    let personajes = document.querySelectorAll('.personajes');
    let personajesDiv = document.querySelector('.personajes__div');
    let btnVolve = document.querySelectorAll('#btnVolve');
    btnVerMas.forEach(function (itemns) {
        itemns.addEventListener('click', function (){
            console.log('hola mundo');
            personajes.forEach(function (ite){
                ite.classList.add('hidden');
                personajesDiv.classList.remove('hidden');

            })


            /*CONST.divPersonajes.classList.add('hidden');
            CONST.divEpisodios.classList.add('hidden');*/
        });
    })
    btnVolve.forEach(function (itenss){
        itenss.addEventListener('click', function (){
            personajes.forEach(function (ite){
                ite.classList.remove('hidden');
                personajesDiv.classList.add('hidden')
            })
        })
    })
    btnFavorito.forEach(function (item){

        /*console.log('este es mi item: ', item);*/
        item.addEventListener('click', function (){

            if (estadoFavorito === 0){
                item.style.color = '#C5C52CFF';
                estadoFavorito = 1;
                onSubmit(data);
                setTimeout(function (){
                    CONST.estado.innerHTML = '';
                    CONST.estado.style.backgroundColor = '';
                }, 2000);
                CONST.estado.innerHTML = 'Guardado en Favorito';
                CONST.estado.style.position = 'fixed';
                CONST.estado.style.backgroundColor = '#d0e995';
            } else {

                item.style.color = '';
                estadoFavorito = 0;

            }

        });
    })
    btnMegusta.forEach(function (items){
        /*console.log('este es mi item: ', item);*/
        items.addEventListener('click', function (){
            if (estado === 0){
                items.style.color = '#f81224';
                estado = 1;
                setTimeout(function (){
                    CONST.estado.innerHTML = '';
                    CONST.estado.style.backgroundColor = '';
                }, 1000);
                CONST.estado.innerHTML = 'Te gusta!! ';
                CONST.estado.style.position = 'fixed';
                CONST.estado.style.backgroundColor = '#d0e995';
            } else {
                items.style.color = '';
                estado = 0;

            }
        });
    })
  /*  btn();*/
}


let db;

export function init(){
    db = new Dexie("tp-2-pwa");
    /*CONST.input = '';
    CONST.philip = '';*/
    let btnFavorito = document.querySelectorAll('.btnFavorito');
    btnFavorito.forEach(function (itemns){
        /*console.log( itemns.dataset.name);*/
        itemns.addEventListener('click', onSubmit);
        refreshView();
    })
    /*document.body.addEventListener('submit', onSubmit);*/
    document.body.addEventListener('click', onClick);
    console.log('ejecutamos init() =>  itemns');
    db.version(1).stores({todo: '_id'});
    db.open()
        .then(refreshView);
}

function onSubmit(data){
    /*e.preventDefault();*/
    let appi = data.data.characters.results;
   /* let date;
    for (let elementos of appi) {
        console.log('elementos: ', elementos.name);
         date = {
            name: elementos.name
        }
        return date;
    }*/
    /*const valorImput = 'hola mundo';*//*
    console.log('data submit this:', this);*/
    db.todo.put({appi, _id: String(Date.now())})
        .then(function (){
            CONST.input.value = '';
        })
        .then(refreshView)

}
export function onClick(e){
    let id;
    if(e.target.hasAttributes("id") && e.target.classList.contains("bi-trash")){
        e.preventDefault();
        id = e.target.getAttribute("id");
        db.todo.where("_id").equals(id).delete()
            .then(refreshView)
    }
}

export function refreshView(){
    return db.todo.toArray()
        .then(function (todos){
            console.log('todos:', todos);
            let html = '';

            for (let i=0; i < todos.length; i++){
                html += `<div class="personajesFavoritos">
                                <h2 class="divPersonajesFavoritos__h3">${todos[i].appi[i].name}</h2>
                                <picture class="w-full p-3">
                                  <source media="(min-width: 751px)" srcset="${todos[i].appi[i].image}">
                                  <source media="(min-width: 380px)" srcset="${todos[i].appi[i].image}">
                                  <img src="${todos[i].appi[i].image}" class="img " alt="Mi imagen responsive">
                                </picture>
                                <div class="personajes__div">
                                    <ul class="personajes__divUl">
                                        <li><span class="uno">Species: </span>${todos[i].appi[i].species}</li>
                                        <li><span class="uno">Status: </span>${todos[i].appi[i].status}</li>
                                        <li><span class="uno">Origen: </span>${todos[i].appi[i].origin.name}</li>
                                        <li><span class="uno">Ubicacion: </span>${todos[i].appi[i].location.name}</li>
                                    </ul>
                                </div>
                                 <div class="divSelectFavoritos">
                                    <!--<button class="btnFavorito m-2" type="button"><i class="bi bi-star-fill mr-2 perri2"></i></button>-->
                                    <!--<p class="btnMeGusta m-2"><i class="bi bi-heart-fill mr-2 perri"></i></p>-->
                                    <h3 class="divSelect__h2"><button id="${todos[i]._id}" class="btn btn-link bi bi-trash"></button>Borrar</h3>
                                </div>
                        </div>`;
            }
            CONST.philipVersion.innerHTML = html;
        })
}

