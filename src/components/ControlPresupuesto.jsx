import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto}) => {
    const [porcentaje, setPorcentaje] = useState(0)
    //DINERO DISPONIBLE
    const [disponible, setDisponible] = useState(0)
    //DINERO GASTADO
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        //FUNCION REDUCTORA DEVUELVE COMO RESULTADO UN UNICO VALOR
        //(valor previo, valor actual)
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //CALCULAR EL PORCENTAJE GASTADO
        const porcentajeGastado = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible);
        setGastado(totalGastado);

        setTimeout(() => {
            setPorcentaje(porcentajeGastado);
        }, 900);
    }, [gastos])

    const handleResetApp = () => {
        setPresupuesto(0);
        setGastos([]);
        setIsValidPresupuesto(false);
        
    }



    const formateoPresupuesto = (presupuesto) => {
        return presupuesto.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    }



    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}   
                />
            </div>

            <div className='contenido-presupuesto'>
                <button 
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formateoPresupuesto(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formateoPresupuesto(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formateoPresupuesto(gastado)}
                </p>
            </div>
        </div>
    );
}

export default ControlPresupuesto