let urlApi = "https://apijade.herokuapp.com/api/v1/products" //declaramos la variable con la url para evitar mas llamados

$(function () {//funcion que escucha cuando el DOM este listo
    $.ajax({//metodo ajax para enviar la solicitud de obtener los productos y listarlos
        method: "GET",
        url: urlApi,
        success: function (data) {
            $('tbody').append("<tr><th>Id</th><th>Name</th><th>Price</th><th>Borrar</th></tr>")
            data.forEach(function (product) {//incluimos el id en la fila para buscarlo
                $('tbody').append(`<tr  id="${product.id}">
                                 <td>${product.id}</td>
                                 <td>${product.name}</td>
                                 <td>${product.price}</td>
                                 <td><button class="btn btn-danger p-1 delete">Borrar</button></td>
                                 </tr>`);
            });
        }
    })

    $('#send').click(function(e){//evento del boton
        e.preventDefault()//previene el envio del formulario
        name = $("#name").val()//obtenemos los valores de los input
        price = $("#price").val() //obtenemos los valores de los input



        // console.log($name)
        // console.log($price)

        $.ajax({//ajax para envio de los datos
            method: "POST",
            url: urlApi,
            data: JSON.stringify({name: name, price: price}),//declaramos el objeto json que vamos a enviar
            contentType: "application/JSON",
            success: function (response) { //añadimos a la tabla
                $('tbody').append(`<tr id="${response.id}> // incluimos el id en la fila para poderlo buscar
                                 <td">${response.id}</td>
                                 <td>${response.name}</td>
                                 <td>${response.price}</td>
                                 <td><button class="btn btn-danger mt-2 delete">Borrar</button></td>
                                 </tr>`);
            }
        });

    })

    $('tbody').on("click",".delete",function(e){//event delegation, se hace para que el evento este en el tbody, pero escuche el boton que tiene la clase .delete

            //this entonces se convierte en el boton
            $padre = $(this).closest("tr") // se captura el mas cercano que tenga el tag tr

        console.log($padre)
        $.ajax({//metodo ajax para borrado
            method:"delete",
            url: urlApi+"/"+$padre.attr('id'), // se concatena el id a la url
            data: {_method: 'delete'},
            success: function(){
                alert('Eliminado')
                $padre.remove()// se elimina de la lista
            }
        })
    })

    
})