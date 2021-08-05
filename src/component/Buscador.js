import { useEffect, useMemo, useState } from 'react'
import { useMachine } from '@xstate/react'
import McBettyMachine from '../context/McBettyMachine'


const Buscador = ({setDataTabla}) => {

  const [keyword, setKyword] = useState(undefined)
  const [state, send] = useMachine(McBettyMachine)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(e.target)
    send("BUSCADOR", { query: keyword })
  }

  console.log(keyword)

  const busquedaData = useMemo(() => {
      if(state.matches("success")){
        return state.context.busqueda || []
      }

  }, [state])

  useEffect(() => {
    setDataTabla(busquedaData)
  },[busquedaData, setDataTabla])

  return(
    <div className="nav__search">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Busqueda en descripción"
          type="search"
          value={keyword}
          id="search_autor"
          onChange={(e) => setKyword(e.target.value)}
          />
        <button type="submit">
          Buscar 
        </button>
      </form>
    </div>
  )
}


export default Buscador