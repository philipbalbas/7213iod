const regex = /^(https?:\/\/)?((?:www\.)?(?:[\w+\-\.]*\.[a-z]{1,6})\/?)((?:[\w\-\.]*\/?){1,6})(?:\?((?:[\w]+\=[\w]+)(?:\&(?:[\w]+\=[\w]+))*))?$/m

const store = (state, emitter) => {
  state.url = {
    original: '',
    protocol: '',
    hostname: '',
    pathname: '',
    queries: '',
    params: {}
  }

  state.tempParam = {
    key: '',
    value: ''
  }
  state.error = ''

  emitter.on('editUrl', text => {
    state.url.original = text.trim()

    const urlBreakdown = regex.exec(state.url.original)

    // console.log(state.url, text)
    if (urlBreakdown) {
      if (urlBreakdown[4]) {
        const queries = urlBreakdown[4]
        const params = queries
          .split('&')
          .map(item => item.split('='))
          .map(item => ({ [item[0]]: item[1] }))
        state.url.params = params
      }

      state.url.protocol = urlBreakdown[1] ? urlBreakdown[1] : ''
      state.url.hostname = urlBreakdown[2] ? urlBreakdown[2] : ''
      state.url.pathname = urlBreakdown[3] ? urlBreakdown[3] : ''
      state.url.queries = urlBreakdown[4] ? urlBreakdown[4] : ''
      emitter.emit('render')
    }
    if (!text.length) {
      state.url = {
        original: '',
        protocol: '',
        hostname: '',
        pathname: '',
        queries: '',
        params: {}
      }
    }
  })

  emitter.on('editProtocol', text => {
    const { hostname = '', pathname = '', queries = '' } = state.url
    state.url.protocol = text
    state.url.original = `${text}${hostname}${pathname}${queries}`
  })

  emitter.on('editHostname', text => {
    const { protocol = '', pathname = '', queries = '' } = state.url
    state.url.hostname = text
    state.url.original = `${protocol}${text}${pathname}${queries}`
  })

  emitter.on('editPathname', text => {
    const { protocol = '', hostname = '', queries = '' } = state.url
    state.url.pathname = text
    if (state.url.hostname.endsWith('/')) {
      state.url.original = `${protocol}${hostname}${text}${queries}`
    } else {
      state.url.hostname = `${state.url.hostname}/`
      state.url.original = `${protocol}${hostname}${text}${queries}`
    }
    emitter.emit('render')
  })

  emitter.on('editParam', (key, value, index) => {
    const updatedParams = state.url.params.map((item, i) => {
      if (i === index) {
        return { [key]: value }
      }
      return item
    })

    const updatedQueries = updatedParams
      .map(item => Object.entries(item)[0])
      .map(item => item.join('='))
      .join('&')

    state.url.params = updatedParams
    state.url.queries = updatedQueries

    state.url.original = `${state.url.protocol}${state.url.hostname}${
      state.url.pathname
    }?${state.url.queries}`

    emitter.emit('render')
  })

  emitter.on('deleteParam', param => {
    const [key, value] = Object.entries(param)[0]
    const updatedParams = state.url.params.filter(
      item => Object.entries(item)[0][0] !== key
    )
    const updatedQueries = updatedParams
      .map(item => Object.entries(item)[0])
      .map(item => item.join('='))
      .join('&')

    state.url.params = updatedParams
    state.url.queries = updatedQueries

    if (!state.url.queries.length) {
      state.url.original = `${state.url.protocol}${state.url.hostname}${
        state.url.pathname
      }`
    } else {
      state.url.original = `${state.url.protocol}${state.url.hostname}${
        state.url.pathname
      }?${state.url.queries}`
    }

    emitter.emit('render')
  })

  emitter.on('testUrl', text => {
    if (!regex.test(text)) {
      state.error = 'Please enter a valid URL'
      emitter.emit('render')
    } else {
      state.error = ''
      emitter.emit('render')
    }
  })

  emitter.on('addTempKey', key => {
    state.tempParam.key = key
  })

  emitter.on('addTempValue', value => {
    state.tempParam.value = value
  })

  emitter.on('addParam', () => {
    if (state.tempParam.key.length && state.tempParam.value.length) {
      const newParam = {
        [state.tempParam.key]: state.tempParam.value
      }

      const updatedParams = state.url.params.length
        ? [...state.url.params, newParam]
        : [newParam]

      const updatedQueries = updatedParams
        .map(item => Object.entries(item)[0])
        .map(item => item.join('='))
        .join('&')

      state.url.params = updatedParams
      state.url.queries = updatedQueries
      state.tempParam = {}

      state.url.original = `${state.url.protocol}${state.url.hostname}${
        state.url.pathname
      }?${state.url.queries}`

      emitter.emit('render')
    }
  })
}

module.exports = store
