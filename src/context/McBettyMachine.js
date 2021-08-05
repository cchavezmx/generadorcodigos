import { assign, createMachine } from 'xstate'

// export const BaserURL = 'https://quiet-castle-61424.herokuapp.com/api/v1'
export const BaserURL = 'http://localhost:3000/api/v1'

const fetchReserva = async(ctx, event) => {
  
  const query = await new Promise((resolve) => {
    resolve(
      fetch(`${BaserURL}/mcbetty/codigo100`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data)
      })
    )
  })
    .then(res => res.json())
    .then(res => res.message)

    return query
}

const fletchUltimos = async () => {

  // TODO METER EN LOS PARAMS EL SKIP
  const query = await new Promise((resolve) => {
    resolve(
      fetch(`${BaserURL}/mcbetty/ultimos?skip=80`)
    )
  })
  .then(res => res.json())
  .then(res => res.message)
  return query

}

const fletchTextSearch = async (ctx, event) => {

  console.log(event.query)

  // TODO METER EN LOS PARAMS EL SKIP
  const query = await new Promise((resolve) => {
    resolve(
      fetch(`${BaserURL}/mcbetty/find?text=${event.query}`)
    )
  })
  .then(res => res.json())
  .then(res => res.message)
  return query

}

const McBettyMachine = createMachine({
  id: "principal",
  initial: 'iddle',
  context: {
    reservado: [],
    ultimos: [],
    busqueda: []

  },
  states: {
    success: {},
    error: {},
    iddle: {},
    reservado: {
      invoke: {
        src: fetchReserva,
        onDone: {
          target: 'success',
          actions: assign({
            reservado: (ctx, event) =>  event.data
          })
        },
        onError: {
          target: 'error'
        }
      }
    },
    ultimos: {
      invoke: {
        src: fletchUltimos,
        onDone: {
          target: 'success',
          actions: assign({
            ultimos: (ctx, event) =>  event.data
          })
        },
        onError: {
          target: 'error'
        }
      }
    },
    buscar: {
      invoke: {
        src: fletchTextSearch,
        onDone: {
          target: 'success',
          actions: assign({
            busqueda: (ctx, event) =>  event.data
          })
        },
        onError: {
          target: 'error'
        }
      }
    }


  },
  on: {
    RESERVADO: 'reservado',
    ULTIMOS_AGRAGADOS: 'ultimos',
    BUSCADOR: 'buscar'

  }
})

export default McBettyMachine