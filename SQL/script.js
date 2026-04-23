document.addEventListener('DOMContentLoaded', () => {
    //Referencias a los paneles
    const btnInicio = document.getElementById('btn-inicio');
    const btnInventario = document.getElementById('btn-inventario');
    const panelInicio = document.getElementById('panel-inicio');
    const panelInventario = document.getElementById('panel-inventario');

    //Referencias al Modal
    const modal = document.getElementById('modal-producto');
    const btnAbrirModal = document.getElementById('btn-abrir-modal');
    const btnCancelar = document.getElementById('btn-cancelar');
    const btnGuardar = document.getElementById('btn-guardar-sql');

    //NAVEGACIÓN ENTRE PANELES
    btnInicio.onclick = () => {
        panelInicio.style.display = 'block';
        panelInventario.style.display = 'none';
        btnInicio.classList.add('active');
        btnInventario.classList.remove('active');
    };

    btnInventario.onclick = () => {
        panelInicio.style.display = 'none';
        panelInventario.style.display = 'block';
        btnInicio.classList.remove('active');
        btnInventario.classList.add('active');
        cargarProductos();
    };

    //MODAL
    btnAbrirModal.onclick = () => modal.style.display = 'flex';
    btnCancelar.onclick = () => modal.style.display = 'none';

    //GUARDAR EN SQL
    btnGuardar.onclick = async () => {
        // Obtenemos los valores. ¡Revisa que estos IDs existan en tu HTML!
        const nombre = document.getElementById('nombre-prod').value;
        const stock = document.getElementById('stock-prod').value;
        const precio = document.getElementById('precio-prod').value;
        const categoria = document.getElementById('categoria-prod').value;
        const estado = document.getElementById('estado-prod').value;

        if (!nombre || !stock || !precio) {
            alert("Por favor rellena todos los campos");
            return;
        }

        const datos = {
            Nombre: nombre,
            Stock: parseInt(stock),
            Precio: parseFloat(precio),
            Categoria: categoria,
            Estado: estado
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/api/productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                alert("¡Guardado con éxito en la base de datos!");
                modal.style.display = 'none';
                cargarProductos(); // Refresca la tabla
            } else {
                const err = await response.json();
                alert("Error del servidor: " + err.error);
            }
        } catch (error) {
            alert("Error crítico: No hay conexión con el servidor Python (app.py)");
            console.error(error);
        }
    };
});

//Función para cargar la tabla
async function cargarProductos() {
    const tabla = document.getElementById('cuerpo-tabla-inventario');
    try {
        const res = await fetch('http://127.0.0.1:5000/api/productos');
        const productos = await res.json();
        tabla.innerHTML = "";
        productos.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td><input type="checkbox" checked></td>
                    <td>${p.Nombre}</td>
                    <td>${p.Categoria}</td>
                    <td>$${p.Precio}</td>
                    <td>${p.Stock}</td>
                </tr>`;
        });
    } catch (e) { console.error("Error al cargar tabla", e); }
}