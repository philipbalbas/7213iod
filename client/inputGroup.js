const html = require('choo/html')

const styles = require('./styles')
const input = require('./input')
const strike = require('./strike')

const inputGroup = (url, emit) => {
  return html`
    <div>
      ${input(
        url.protocol,
        'Protocol',
        editInput,
        'editProtocol',
        'http:// or https://'
      )}
      ${strike()}
      ${input(
        url.hostname,
        'Hostname',
        editInput,
        'editHostname',
        'www.example.com/'
      )}
      ${strike()}
      ${input(
        url.pathname,
        'Pathname',
        editInput,
        'editPathname',
        'path/to/url/'
      )}
    </div>
    `

  function editInput(value, type) {
    emit(type, value)
    emit('testUrl', url.original)
  }
}

module.exports = inputGroup
