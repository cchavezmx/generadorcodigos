import { assign, createMachine } from 'xstate'

export const BaserURL = 'https://quiet-castle-61424.herokuapp.com/api/v1'

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

const McBettyMachine = createMachine({
  id: "principal",
  initial: 'iddle',
  context: {
    reservado: []

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
    }


  },
  on: {
    RESERVADO: 'reservado'
  }
})

export default McBettyMachine