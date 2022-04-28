import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formateoFecha } from '../helpers'
import iconoAhorro from './../img/icono_ahorro.svg'
import iconoCasa from './../img/icono_casa.svg'
import iconoComida from './../img/icono_comida.svg'
import iconoGastos from './../img/icono_gastos.svg'
import iconoOcio from './../img/icono_ocio.svg'
import iconoSalud from './../img/icono_salud.svg'
import iconoSuscripciones from './../img/icono_suscripciones.svg'


const diccionarioIconos = {
    ahorro: iconoAhorro,
    comida: iconoComida,
    casa: iconoCasa,
    gastos: iconoGastos,
    ocio: iconoOcio,
    salud: iconoSalud,
    suscripcion: iconoSuscripciones
}


const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
    const { categoria, nombre, cantidad, fecha, id } = gasto

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction 
                onClick={() => eliminarGasto(gasto.id)}
                destructive={true}
            >
                Eliminar
            </SwipeAction>  
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                //La parte principal
                leadingActions={leadingActions()}
                //La parte trasera
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className='contenido-gasto'>
                        <img
                            src={diccionarioIconos[categoria]}
                        />

                        <div className='descripcion-gasto'>
                            <p className='categoria'>
                                {categoria}
                            </p>
                            <p className='nombre-gasto'>
                                {nombre}
                            </p>
                            <p className='fecha-gasto'>
                                Agregado el: {' '}
                                <span>{formateoFecha(fecha)}</span>
                            </p>
                        </div>
                    </div>
                    <p className='cantidad-gasto'>$ {cantidad}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto