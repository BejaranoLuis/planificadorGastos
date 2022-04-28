import { useEffect, useRef, useState } from "react"
import Filtro from "./components/Filtro";
import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import IconoNuevoGasto from './img/nuevo-gasto.svg';


function App() {
    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    );
    const [gastoEditar, setGastoEditar] = useState({});
    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setModal(true);
            setTimeout(() => {
                setAnimarModal(true);
            }, 500);
        }

    }, [gastoEditar])



    const handleNuevoGasto = () => {
        setGastoEditar({});
        setModal(true);
        setTimeout(() => {
            setAnimarModal(true);
        }, 500);
    }

    const guardarGasto = (gasto) => {
        if (gasto.id) {
            //ACTUALIZAR GASTO
            const gastosActualizados = gastos.map((gastoState) => gasto.id === gastoState.id ? gasto : gastoState);
            setGastos(gastosActualizados)
        } else {
            //NUEVO GASTO
            gasto.id = generarId();
            gasto.fecha = Date.now();
            setGastos([...gastos, gasto]);
        }

        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const eliminarGasto = (id) => {
        const gastosActualizados = gastos.filter((gastoState) => gastoState.id !== id);
        setGastos(gastosActualizados);
    }

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0);
    }, [presupuesto])

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
    }, [gastos])

    useEffect(() => {
        if(filtro){
            const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);
            setGastosFiltrados(gastosFiltrados);
        }
        
    }, [filtro])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

        if (presupuestoLS > 0) {
            setIsValidPresupuesto(presupuestoLS);
        }
    }, [])




    return (
        <div className={modal ? 'fijar' : ''}>
            <Header
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                isValidPresupuesto={isValidPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
                gastos={gastos}
            />

            {isValidPresupuesto && (
                <>
                    <main>
                        <Filtro 
                            filtro={filtro}
                            setFiltro={setFiltro}
                        />
                        <ListadoGastos
                            gastos={gastos}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                            filtro={filtro}
                            gastosFiltrados={gastosFiltrados}
                        />
                    </main>

                    <div className="nuevo-gasto">
                        <img src={IconoNuevoGasto} alt="nuevo gasto" onClick={handleNuevoGasto} />
                    </div>
                </>


            )}

            {modal && (
                <Modal
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                />
            )}
        </div>
    )
}

export default App
