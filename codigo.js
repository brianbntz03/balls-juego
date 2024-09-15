const contenedor = document.querySelector('.contenedor')
//definir medidas
const altoTablero = 300
const anchoTablero = 570
const altoBloque = 20
const anchoBloque = 100

//definir posicion Usuario
const posicionInicialUsuario = [230,10]
let posicionActualUsuario = posicionInicialUsuario
//Definir posicion de la bola
const posicionInicialBola = [270,40]
let posicionActualBola = posicionInicialBola
//definir particularidad de la bola
let xDireccionBola = 2
let yDireccionBola = 2
let diametro = 20
// definir tiempo
let timerID
//definir clase de bloque
class Bloque{
    constructor(ejeX, ejeY){
        this.bottomLeft = [ejeX, ejeY]
        this.bottomRigth = [ejeX + anchoBloque, ejeY]
        this.topLeft = [ejeX, ejeY + altoBloque]
        this.topRigth = [ejeX + anchoBloque, ejeY + altoBloque]  
    }
}
//definir todos los bloques
const bloques = [
    new Bloque(10, 250),
    new Bloque(120, 250),
    new Bloque(230, 250),
    new Bloque(340, 250),
    new Bloque(450, 250),
    new Bloque(10, 220),
    new Bloque(120, 220),
    new Bloque(230, 220),
    new Bloque(340, 220),
    new Bloque(450, 220),
    new Bloque(10, 190),
    new Bloque(120, 190),
    new Bloque(230, 190),
    new Bloque(340, 190),
    new Bloque(450, 190),   
]   
// funcion añadir bloque
function addBloques(){
    for(let i = 0; i < bloques.length; i++){
        const bloque = document.createElement('div')
        bloque.classList.add('bloque')
        bloque.style.left = bloques[i].bottomLeft[0] + 'px'
        bloque.style.bottom = bloques[i].bottomLeft[1] + 'px'
        contenedor.appendChild(bloque)   
    }
}
//Añadir los bloques al juego
addBloques()
//definir usuario
function dibujarusuario(){
    usuario.style.left = posicionActualUsuario[0] + 'px'
    usuario.style.bottom = posicionActualUsuario[1] + 'px'
}
//añadir usuario
const usuario = document.createElement('div')
usuario.classList.add('usuario')
contenedor.appendChild(usuario)
dibujarusuario()                    
//mover al usuario por el tablero
function moverUsuario(e){
    switch(e.key){
        case 'ArrowLeft':
            if(posicionActualUsuario[0] > 0){
                posicionActualUsuario[0] -= 10
                dibujarusuario()    
            }
            break
        case 'ArrowRight':
            if(posicionActualUsuario[0] < (anchoTablero - anchoBloque)){
                posicionActualUsuario[0] += 10
                dibujarusuario()
            }
            break
    }
}
//añadir evento escuchado para el documento
document.addEventListener('keydown', moverUsuario)

//dibujar la bola
function dibujarbola(){
    bola.style.left = posicionActualBola[0]+ 'px'   
    bola.style.bottom = posicionActualBola[1]+ 'px'
}   
//añadir bola al tablero
const bola = document.createElement('div')
bola.classList.add('bola')
contenedor.appendChild(bola)
dibujarbola()
//Funcion de ejecutar al juego
function moverBola(){
    posicionActualBola[0] += xDireccionBola
    posicionActualBola[1] += yDireccionBola
    dibujarbola()
    revisarColisiones()
    gameover()
    //todas las funciones
}
//intervalo que se ejecuta cada 20 milsegundos 
timerID = setInterval(moverBola, 20)
//definir la funcion que revia la colision
function revisarColisiones(){
    //colision con bloques
    for (let i = 0; i < bloques.length; i++){
        if( (posicionActualBola[0] > bloques[i].bottomLeft[0] && posicionActualBola[0] < bloques[i].bottomRigth[0]) &&
            ((posicionActualBola[1]  + diametro) > bloques[i].bottomLeft[1] && posicionActualBola[1] < bloques[i].topLeft[1])
        ){
            const todosLosBloques = Array.from(document.querySelectorAll('.bloque'))
            todosLosBloques[i].classList.remove('bloque')
            bloques.splice(i,1)
            cambiarDireccion()
        }
    }

//colision con las paredes
if(
    posicionActualBola[0] >= (anchoTablero - diametro) ||
    posicionActualBola[1] >= (altoTablero - diametro) ||
    posicionActualBola[0] <= 0 ||
    posicionActualBola[1] < 0   
){  
    cambiarDireccion()
}
//revision colision con usuario
if((posicionActualBola[0] > posicionActualUsuario[0] && posicionActualBola[0] < posicionActualUsuario[0] + anchoBloque) && 
    (posicionActualBola[1] > posicionActualUsuario[1] && posicionActualBola[1] < posicionActualUsuario[1] + altoBloque)
    ){
        cambiarDireccion()
    }

}
// funcion de terminar el juego si la bola toca el suelo
function gameover(){
    if(posicionActualBola [1] <= 0){
        clearInterval(timerID)
        document.removeEventListener('keydown', moverUsuario)
    }
}

// funcion de cambiar la direccion 
function cambiarDireccion(){
    if(xDireccionBola === 2 && yDireccionBola === 2){
        yDireccionBola = -2
        return
    }
    if(xDireccionBola === 2 && yDireccionBola === -2){
        xDireccionBola = -2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === -2){
        yDireccionBola = 2
        return
    }
    if(xDireccionBola === -2 && yDireccionBola === 2){
        xDireccionBola = 2
        return
    }
}