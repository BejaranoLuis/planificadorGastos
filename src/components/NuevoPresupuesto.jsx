import React, { useState } from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
    const [mensaje, setMensaje] = useState('')


    const handlePresupuesto = (e) => {
        e.preventDefault();
        //SI NO ES NUMERO Y SI ES MENOR DE 0
        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido')
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);

    }


    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            <form
                className='formulario'
                onSubmit={handlePresupuesto}
            >
                <div className='campo'>
                    <label htmlFor="">Definir presupuesto</label>

                    <input
                        className='nuevo-presupuesto'
                        type='number'
                        placeholder='Añade tu presupuesto'
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                        value={presupuesto}
                    />
                </div>

                <input
                    type='submit'
                />


                {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto