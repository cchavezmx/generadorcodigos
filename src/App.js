import './index.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import McBettyMachine from './context/McBettyMachine'

import Buscador from './component/Buscador'
import Ultimos from './component/Ultimos';
import Tabla from './component/Tabla';

function App() {
  

  const { handleSubmit, register, formState: { errors }} = useForm()
  const [ state, send ] = useMachine(McBettyMachine)

  const handledData = (data) => {
    const payload = {
      ALTERNO: data.ALTERNO.toUpperCase(),
      AUTOR: data.AUTOR.toUpperCase(),
      DESCRIPCION: data.DESCRIPCION.toUpperCase(),
      UMED: data.UMED.toUpperCase()
    }

    send("RESERVADO", { data: payload })

  }

  const { reservado } = state.context

  const [ dataTabla, setDataTabla ] = useState([])

  return (
    <div className="App">
         <h1>Catálogo ITA</h1>
      <div className="App__principal">
      <div className="side__bar">
            <Ultimos />
      </div>
      <div className="App-header">
        {/* <nav>
            
        </nav> */}
        
        <div className="card">
        <h1>Generar un nuevo número</h1>
          <form onSubmit={handleSubmit(handledData)}>
            <input
              id="ALTERNO"
              { ...register("ALTERNO", { required: false })}
              type="text"
              placeholder="Código Alterno"
              
            />
            <input 
              id="AUTOR"
              required={errors.AUTOR}
              { ...register("AUTOR", { required: true })}
              type="text"
              placeholder="Autor"
              
            />
            { errors.AUTOR && <small>*Obligatorio</small> }
            <input 
              id="DESCRIPCION"
              { ...register("DESCRIPCION", { required: false })}
              type="text"
              placeholder="Agrega una Descripcion"
              
            />
            <input 
              required={errors.UMED}
              { ...register("UMED", { required: false })}
              type="text"
              placeholder="Unidad de Medida"
            />
            <button type="submit">
              Reservar
            </button>
          </form>

        </div>

       { 
          state.matches("success") &&
          <div className="response">
            <span style={{ textAlign: "center" }}>
                Tu codigo asignado es:
            </span>
              <p>{`CODIGO: ${reservado?.CODIGO}`}</p>
              <p>{`DESCRIPCION: ${reservado?.DESCRIPCION}`}</p>
              <p>{`AUTOR: ${reservado?.AUTOR}`}</p>
              <p>{`ALTERNO: ${reservado?.ALTERNO}`}</p>
          </div>
      }
      </div>     
    </div>
    <Buscador setDataTabla={setDataTabla} />
    <Tabla dataTabla={dataTabla} />
    </div>
  );
}

export default App;
