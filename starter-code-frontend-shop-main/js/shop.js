// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }

    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

let subtotalWithDiscountp1;
let subtotalWithDiscountp3;

let totalCounter = 0;
// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    i = 0;
    let productoEnCarritoIndex = -1;

    for (i = 0; i < products.length; i++) {
        //buscar en el array el producto con el mismo id en el que hacemos click(botón)
        if (products[i].id === id) {
            //validar si el producto está o no en el carrito
            let productoEnCarritoIndex = cart.findIndex(function (item) {
                return item.id === id;
            });


            // 2. Add found product to the cart array

            //index != -1 --> producto está dentro del carrito (según su índice) y hay que incrementar la cantidad
            if (productoEnCarritoIndex !== -1) {
                cart[productoEnCarritoIndex].quantity++;
                cart[productoEnCarritoIndex].counter++
                console.log("cantidad incrementada ");
            } else {
                //si index = -1--> producto no está dentro del array carrito y hay que añadirlo
                cart.push({ ...products[i], quantity: 1, counter: 1 });

                console.log("No estaba en el carrito y se ha añadido");

            }

            console.log(products[i].name + " añadido al carrito.");
            //let cartList = cart;
            console.log(cart, "el carrito");
            //console.log(cartList);

            //Añade cantidad al contador del carrito
            //let totalCounter = 0;

            for (let i = 0; i < cart.length; i++) {
                totalCounter += cart[i].counter;
            }

            document.getElementById("count_product").innerHTML = totalCounter;

            //4. Llamar a la función applyPromotionsCart para aplicar descuentos si se cumplen las condiciones

            applyPromotionsCart();


            //3. Llamar a la función calculoTotal para que contabilize el total cada vez que añadimos un producto al carrito:

            calculateTotal();

            //2. Llamar a la función printCart() que imprime los productos en el modalCart (DOM)
            printCart();

            //Llamo a la función para recalcular el totalCounter
            updateTotalCounter();

        }

    }

}

function updateTotalCounter() {
    // Reinicia totalCounter a cero antes de recalcular
    totalCounter = 0;

    // Bucle for para añadir cantidad al contador del carrito
    for (let i = 0; i < cart.length; i++) {
        totalCounter += cart[i].quantity;
    }

    // Actualiza el contador total en la interfaz
    document.getElementById("count_product").innerHTML = totalCounter;
}

// Exercise 2
//Ara implementarem una funció que permeti a l'usuari/ària eliminar l'array generat a l'anterior exercici: buidar el carret.

//En aquesta ocasió, hauràs d'emplenar la funció cleanCart(), la qual ha de reinicialitzar la variable cartList.
function cleanCart() {
    carritoVacio = [];
    //let cartList = cart;
    //console.log(cartList, "la lista del carrito");
    console.log(cart, "carrito sin vaciar")
    //let cartListEliminada = cart.splice(0, cart.length);
    carritoVacio = cart.length = 0;
    console.log(carritoVacio, "Carrito vacío");

    //Vaciar el DOM nuevo

    let listaCarritoProductosDOM = ""; //poner [] probar [];

    for (let j = 0; j < cart.length; j++) {
        listaCarritoProductosDOM = listaCarritoProductosDOM + (`${cart[j].name} + Precio: ${cart[j].price}, Cantidad: ${cart[j].quantity}`);
    }
    console.log("Limpiar el carrito es: ", listaCarritoProductosDOM);
    //Vaciar el Modal
    document.getElementById("cart_list").innerHTML = listaCarritoProductosDOM;
    //Vaciar el Precio total
    document.getElementById("total_price").innerHTML = listaCarritoProductosDOM;

    //Vaciar nº carrito
    //let totalCounter = 0;
    for (let i = 0; i < cart.length; i++) {
        totalCounter += cart[i].counter;
    }

    document.getElementById("count_product").innerHTML = totalCounter;

}

// Exercise 3
// Fantàstic, l'e-commerce va prenent forma!, és el moment de calcular el total de l'import del carretó. 
// S'ha d'implementar un bucle for per anar sumant l'import de tots els productes.
// Calculate total price of the cart using the "cartList" array

//Hay que asociar el calculototal a la función buy para que vaya añadiendo la cantidad de productos y su precio
function calculateTotal() {
    let cartListPrecio = [];

    for (let t = 0; t < cart.length; t++) {
        let precio = cart[t].price; //El precio será el precio original de cada producto
        console.log(precio, "Después de la interación de la función CalculateTotal")
        // let precioSumado = (cart[t].price * cart[t].quantity);
        // cartListPrecio.push(precioSumado);
        // console.log(`Array del precio total de cada producto: SUMA TOTAL? ${cartListPrecio}`);

        //Añadimos ifs para aplicar los precios con descuento si se cumplen las condiciones
        if ((cart[t].name === "cooking oil") && (cart[t].quantity >= 3)) {
            //precio = subtotalWithDiscountp1;
            cartListPrecio.push(subtotalWithDiscountp1); //si entra el if metemos el precio con descuento y con su cantidad dentro del array cartListPrecio
            console.log(cart[t].price, "Ha entrado el primer if del calculo del precio total, precio con descuento producto 1");
            console.log(subtotalWithDiscountp1, "Dentro del if este precio debería ser el precio con descuento");
            //precioSumado = precio * cart[t].quantity;
            //total = total + cart[t].price; // +total
            //console.log(total, "Función calculateTotal, el total con descuento del producto 1 cooking oil");

        } else if ((cart[t].name === "Instant cupcake mixture") && (cart[t].quantity >= 10)) {
            cartListPrecio.push(subtotalWithDiscountp3);
            console.log(cart[t].price, "Ha entrado el segundo if del calculo del precio total, precio con descuento producto 3");
            console.log(subtotalWithDiscountp3, "Ha entrado el 2do if, este es el precio con descuento del producto id = 3");
            //total = total + cart[t].price;

        } else {

            //Creamos variable para guardar el precio total de cada producto (incluidos descuentos si se cumple condición).
            let precioSumado = (precio * cart[t].quantity);
            console.log(precioSumado, "El precio sumado de cada producto su cantidad x su precio");
            //Añadimos todos estos precios de cada producto al array cartListPrecio
            cartListPrecio.push(precioSumado);

        }

    }

    //console.log(cartListPrecio, "array de precios antes de utilizar reduce");

    // Utilizamos el método reduce para sumar todos los precios totales de nuestro array cartListPrecio a 1 solo valor y asignamos el resultado a la variable total

    total = cartListPrecio.reduce(function (acc, precio) {  //Hace una iteración en la que se suma el valor precio de cada elemento y acumula esa suma al acumulador (acc) que contendrá al final de la iteración la suma total de los elementos del array cartListPrecio.
        return acc + precio;
    }, 0);

    //console.log(total, "BIEN???? total del precio de todos los prodcutos")
    // total =  subtotalWithDiscountp1 //+ products[i].price;

    //Mostrarlo en el DOM de precio total:
    document.getElementById("total_price").innerHTML = `${total}`;

}


// Exercise 4
// Per això, ens ha especificat dos tipus de promocions que vol per al seu e-commerce:
// Si l'usuari/ària compra 3 o més ampolles d'oli, el preu del producte es rebaixa un 20%.
// Quan es compren 10 o més productes per a fer pastissos, el preu del producte es rebaixa un 30%.
// En aquest exercici has de completar la funció applyPromotionsCart(), la qual rep l'array cart, modificant el camp subtotalWithDiscount en cas que s'apliqui la promoció. Tot ha de ser dinàmic.
// Ajuda: ja que cada producte del carret té una quantitat, pots validar si es pot aplicar un descompte:
// En cas que un producte tingui descompte, s'ha de guardar el preu total amb descompte en el camp: subtotalWithDiscount.
// Si no s'ha d'aplicar descompte, no fa falta que guardis res.



function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    // Hacer un for que recorra el array cart en busca de los productos con descuento (identificarlos con el name o el id) y a partir de ahí aplicar los descuentos 
    // si se cumple la condición del if (cantidad mínima).


    for (p = 0; p < cart.length; p++) {
        console.log(cart[p].name, "nombre de productos en el array cart, hecho con for (EX4PROMOTIONS)");
        //1.Identificar en el carrito productos que puedan tener promoción (id=1 o id=3);
        if (cart[p].id === 1 && cart[p].quantity >= 3) { // || cart[p].id === 3 // Si carrito con producto con posible promoción (id=1 cooking oil) Y su cantidad >=3 -->APLICAR PROMO
            //Si en carrito hay productos que pueden tener promoción --> comprobar la cantidad de esos productos --> aplicar promoción
            console.log("Ha entrado el if del producto id=1, existe un producto en el carrito con id=1 y por lo tanto posible promoción")
            console.log(cart[p].quantity, "Cantidad en teoria del producto id=1 (cooking oil)");
            console.log(cart[p].price, "El precio de 1 producto");
            //Calculo del precio total de 1 producto
            let precioTotalSinDescuento = (cart[p].price * cart[p].quantity);
            console.log(precioTotalSinDescuento, "Precio total 1 producto sin descuento (precio x cantidad");
            //Calculo del descuento del producto 1
            let cantidadDescuentop1 = (precioTotalSinDescuento * 0.2);
            console.log(cantidadDescuentop1, "La cantidad del descuento del producto 1");
            //Calculo total del precio con descuento (incluida la cantidad)
            subtotalWithDiscountp1 = (precioTotalSinDescuento - cantidadDescuentop1);
            console.log(subtotalWithDiscountp1, "El precio total del producto id=1 (cooking oil) con descuento");

        }

        if (cart[p].id === 3 && cart[p].quantity >= 10) {
            //si producto tiene id=3 y su cantidad >= 10 aplicar descuento del 30%
            console.log("Ha entrado el if del producto id=3, existe un producto en el carrito con id=3 y por lo tanto posible promoción");
            console.log(cart[p].quantity, "Cantidad en teoria del producto id=3??? (instant cupcake mixture)");
            console.log(cart[p].price, "El precio de 1 producto");
            //Calculo del precio total de 1 producto
            let precioTotalSinDescuento = (cart[p].price * cart[p].quantity);
            console.log(precioTotalSinDescuento, "Precio total 1 producto sin descuento (precio x cantidad");
            //Calculo del descuento del producto 3
            let cantidadDescuentop3 = (precioTotalSinDescuento * 0.3);
            console.log(cantidadDescuentop3, "La cantidad del descuento del producto 3");
            //Calculo total del precio con descuento (incluida la cantidad)
            subtotalWithDiscountp3 = (precioTotalSinDescuento - cantidadDescuentop3);
            console.log(subtotalWithDiscountp3, "El precio total del producto con id=3 (instant cupcake mixture) con descuento");

        }
    }

}


// Exercise 5
// Ja has desenvolupat tota la lògica bàsica de l'aplicació, ha arribat el moment de mostrar a l'usuari el carret de la compra.
// El codi encarregat de mostrar el carret de la compra en el modal amb id "cartModal", ha d'incloure's dins de la funció printCart(). Et donem ja creada la maquetació de la taula de productes, només caldrà modificar-la per tal que sigui dinàmica.
// El modal del carret s'obre prement el botó del carret en la part superior dreta de la pantalla:

function printCart() {
    subtotalWithDiscountp1;
    subtotalWithDiscountp3;

    //5. Imprimir productos en el DOM

    let tbody = document.getElementById("cart_list");
    tbody.innerHTML = "";


    for (let j = 0; j < cart.length; j++) {

        /*lISTA PRODUCTOS DEL DOM AUTOMATIZADA PARA CREAR NUEVAS FILAS DE MANERA DINÁMICA*/
        let precioSumado = (cart[j].price * cart[j].quantity);
        console.log(`El precio sumado es de 1 producto, inicia cada vez que añdimos un producto diferente (función buy)`, precioSumado);
        let fila = document.createElement("tr");

        //Nombre Producto

        let nombreCelda = document.createElement("th"); //1. creamos una nueva celda de tipo "th" 
        nombreCelda.scope = "row"; //2. Decimos que atributo scope de la celda será tipo "row"-->sirve para que se aplique a toda la fila
        nombreCelda.textContent = cart[j].name; //3.Asignamos el contenido a la celda creada, en este caso el nombre del producto en el carrito
        fila.appendChild(nombreCelda); //4. La fila creada anteriormente se agrega como hijo de la fila "tr"

        // Precio del producto
        let precioCelda = document.createElement("td");
        precioCelda.textContent = `$${cart[j].price}`;
        fila.appendChild(precioCelda);

        // Cantidad del producto
        let cantidadCelda = document.createElement("td");
        cantidadCelda.textContent = cart[j].quantity; //cambiado qutado counter y puesto
        fila.appendChild(cantidadCelda);


        // Total con descuento (si es necesario)
        //Hacer un if para que si el producto tiene descuento que lo agregue a la fila con ese descuento?
        let totalCelda = document.createElement("td");
        console.log(cart[j].name, "Es el nombre del precio con descuento");
        console.log(subtotalWithDiscountp1, "Precio con descuento función printcart");
        if ((cart[j].name === "cooking oil") && (cart[j].quantity >= 3)) { //|| cart[j].name === "Instant cupcake mixture"
            totalCelda.textContent = `$${subtotalWithDiscountp1}`
            console.log(subtotalWithDiscountp1, "Ha entrado el primer if del descuento, precio con descuento producto 1");

        } else if ((cart[j].name === "Instant cupcake mixture") && (cart[j].quantity >= 10)) {
            totalCelda.textContent = `$${subtotalWithDiscountp3}`

        } else {
            totalCelda.textContent = `$${precioSumado}`
        }

        fila.appendChild(totalCelda);

        //La fila completa se agrega como hijo de la tabla "tbody"
        tbody.appendChild(fila);

    }

}


// ** Nivell II **

// Exercise 7
// Encara no hem proporcionat una funcionalitat essencial a l'usuari o usuària: restar productes del carret.
// Has de completar la funció removeFromCart(), que rep l'identificador del producte per al qual s'ha de decrementar la seva quantitat en una unitat.
// Recorda que si la quantitat del producte a decrementar és 1, has d'eliminar-lo del carret, no reduir la seva quantitat a 0.
// No oblidis actualitzar les promocions.

function removeFromCart(id) {
    // Buscar el producto en el carrito
    let productoEnCarritoIndex = cart.findIndex(function (item) {
        return item.id === id;
    });

    // Si el producto está en el carrito, disminuimos la cantidad
    if (productoEnCarritoIndex !== -1) {
        cart[productoEnCarritoIndex].quantity--;

        // Si la cantidad llega a cero, eliminar el producto del carrito
        if (cart[productoEnCarritoIndex].quantity === 0) {
            cart.splice(productoEnCarritoIndex, 1);
        }

        console.log("Cantidad decrementada y producto eliminado si es 0");
    } else {
        console.log("El producto no está en el carrito");
    }

    updateTotalCounter();

    //4. Llamar a la función applyPromotionsCart para aplicar descuentos si se cumplen las condiciones

    applyPromotionsCart();


    //3. Llamar a la función calculoTotal para que contabilize el total cada vez que añadimos un producto al carrito:

    calculateTotal();

    //  //2. Llamar a la función printCart() que imprime los productos en el modalCart (DOM)
    printCart();

}

function open_modal() {
    printCart();
}
