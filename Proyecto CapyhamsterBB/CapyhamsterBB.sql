create database CapyhamsterBB;

-- Crear la tabla Productos simplificada
CREATE TABLE Producto (
    IdProducto INT PRIMARY KEY IDENTITY(1,1), -- ID autoincrementable
    Nombre NVARCHAR(100) NOT NULL,            -- Nombre del producto
    Categoria NVARCHAR(50) NOT NULL,          -- Categoría escrita directamente (ej: 'Abarrotes')
    Precio DECIMAL(18, 2) NOT NULL,           -- Precio con dos decimales
    Stock INT NOT NULL DEFAULT 0,             -- Cantidad disponible
    Activo BIT DEFAULT 1                      -- 1 para Activo, 0 para Inactivo
);

-- Ejemplo de cómo insertar datos en esta nueva estructura
INSERT INTO Producto (Nombre, Categoria, Precio, Stock, Activo)
VALUES ('Shampoo Control Caspa 400ml', 'Cuidado Personal y Farmacia', 89.00, 44, 1);

INSERT INTO Producto (Nombre, Categoria, Precio, Stock, Activo)
VALUES ('Smart TV 50 Pulgadas 4K', 'Electrónica y Tecnología', 7499.00, 15, 1);

SELECT * FROM Producto;
