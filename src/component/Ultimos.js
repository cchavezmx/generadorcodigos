import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import McBettyMachine from '../context/McBettyMachine'


const Ultimos = () => {

  const [state, send] = useMachine(McBettyMachine)
  useEffect(() => {
    send("ULTIMOS_AGRAGADOS")
  }, [send])

  const { ultimos } = state.context

  return(
    <>
    <h1>Utimos Registros</h1>
    <div className="registros window__scroll">
      
      <div>
        { state.matches("success")  && 
          Object.values(ultimos).map(doc => {
           return (
           <div className="lista__utlimos">
              <p>
                CODIGO: { doc.CODIGO }
              </p>
              <p>
                AUTOR: { doc.AUTOR }
              </p>
              <p>
                DESC: { doc.DESCRIPCION }
              </p>
            </div>
          )
            
          })
        }
      </div>
    </div>
    </>
  )
}


export default Ultimos