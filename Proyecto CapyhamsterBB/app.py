import pyodbc
from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, jsonify, request  

app = Flask(__name__)
CORS(app)

def get_db_connection():
    server = 'Emiliano' 
    database = 'CapyHamsterBB'  
    username = 'sa'    
    password = '1234'    
    
    conn_str = (
        f'DRIVER={{SQL Server}};'
        f'SERVER={server};'
        f'DATABASE={database};'
        f'UID={username};'
        f'PWD={password};'
    )
    
    return pyodbc.connect(conn_str)

@app.route('/api/productos', methods=['GET'])
def obtener_productos():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT Nombre, Categoria, Precio, Stock FROM Producto"
        cursor.execute(query)
        
        columnas = [column[0] for column in cursor.description]
        resultados = []
        for fila in cursor.fetchall():
            resultados.append(dict(zip(columnas, fila)))
        
        conn.close()
        return jsonify(resultados)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Agrega esto a tu archivo app.py
@app.route('/api/productos', methods=['POST'])
def agregar_producto():
    nuevo_producto = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = """
            INSERT INTO Producto (Nombre, Categoria, Precio, Stock, Activo)
            VALUES (?, ?, ?, ?, ?)
        """
        
        activo = 1 if nuevo_producto.get('Estado') == 'Activo' else 0
        
        cursor.execute(query, (
            nuevo_producto['Nombre'],
            nuevo_producto['Categoria'], 
            nuevo_producto['Precio'],
            nuevo_producto['Stock'],
            activo
        ))
        
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Producto guardado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)