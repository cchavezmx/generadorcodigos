import './App.css';
import { useForm } from 'react-hook-form'
import { useMachine } from '@xstate/react'
import McBettyMachine from './context/McBettyMachine'


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

    console.log(payload)
    send("RESERVADO", { data: payload })

  }

  const { reservado } = state.context

  return (
    <div className="App">
      <header className="App-header">
        
        <div className="card">
        <h1>Generar un nuevo número</h1>
          <form onSubmit={handleSubmit(handledData)}>
            <input
              id="ALTERNO"
              required={errors.ALTERNO}
              { ...register("ALTERNO", { required: true })}
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
            <input 
              id="DESCRIPCION"
              required={errors.DESCRIPCION}
              { ...register("DESCRIPCION", { required: true })}
              type="text"
              placeholder="Agrega una Descripcion"
              
            />
            <input 
              id="UMED"
              required={errors.UMED}
              { ...register("UMED", { required: true })}
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

      {console.log(reservado)}
      </header>
    </div>
  );
}

export default App;
