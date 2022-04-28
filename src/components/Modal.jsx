import React, { useEffect, useState } from 'react'
import Mensaje from './Mensaje';
import cerrarBtn from './../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
            setId(gastoEditar.id);
        }
    }, [gastoEditar])


    const ocultarModal = () => {
        setAnimarModal(false);
        setGastoEditar({})
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setGastoEditar({});
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son necesarios');

            setTimeout(() => {
                setMensaje('');
            }, 1000);

            return;
        }

        guardarGasto({ nombre, cantidad, categoria, id, fecha });
    }



    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={cerrarBtn}
                    alt="btnCerrar"
                    onClick={ocultarModal}
                />
            </div>

            <form
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
                onSubmit={handleSubmit}
            >
                <legend>{
                    gastoEditar.nombre ? 'Editar gasto' : 'Nuevo Gasto'
                }</legend>

                {mensaje && <Mensaje tipo='error'> {mensaje} </Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre gasto</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añade La cantidad del gasto: ej. 300'
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Cantidad</label>
                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}

                />
            </form>

        </div>
    )
}

export default Modal