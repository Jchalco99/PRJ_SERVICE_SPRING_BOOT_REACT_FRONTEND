import React, { useState, useEffect } from 'react';
import ProductoService from '../services/ProductoService';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const AddProductoComponent = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrUpdateProducto = (e) => {
        e.preventDefault();
        const producto = { nombre, precio, descripcion, cantidad, categoria, imagenUrl };

        if (id) {
            ProductoService.updateProducto(id, producto)
                .then(() => {
                    console.log(producto);
                    navigate('/productos');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            ProductoService.createProducto(producto)
                .then(() => {
                    console.log(producto);
                    navigate('/productos');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            ProductoService.getProductoById(id)
                .then((response) => {
                    setNombre(response.data.nombre);
                    setPrecio(response.data.precio);
                    setDescripcion(response.data.descripcion);
                    setCantidad(response.data.cantidad);
                    setCategoria(response.data.categoria);
                    setImagenUrl(response.data.imagenUrl);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const titulo = () => {
        if (id) {
            return <h2 className="text-center">Actualizar Producto</h2>;
        } else {
            return <h2 className="text-center">Registrar Producto</h2>;
        }
    };

    return (
        <div>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {titulo()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del producto"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Precio:</label>
                                    <input
                                        type="number"
                                        placeholder="Precio del producto"
                                        className="form-control"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Descripción:</label>
                                    <textarea
                                        placeholder="Descripción del producto"
                                        className="form-control"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Cantidad:</label>
                                    <input
                                        type="number"
                                        placeholder="Cantidad disponible"
                                        className="form-control"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Categoría:</label>
                                    <input
                                        type="text"
                                        placeholder="Categoría del producto"
                                        className="form-control"
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">URL de la Imagen:</label>
                                    <input
                                        type="text"
                                        placeholder="URL de la imagen del producto"
                                        className="form-control"
                                        value={imagenUrl}
                                        onChange={(e) => setImagenUrl(e.target.value)}
                                    />
                                </div>
                                <div className="botones">
                                    <button className="btn btn-danger" onClick={(e) => saveOrUpdateProducto(e)}>
                                        Guardar
                                    </button>
                                    <Link to="/productos" className="btn btn-primary">
                                        Cancelar
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductoComponent;
