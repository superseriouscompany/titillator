const baseUrl = window.location.href.match(/localhost/) ? 'http://localhost:3001' : 'https://titillator.superserious.co'

export default function(path, options) {
  if( path[0] !== '/' ) path = `/${path}`
  if( typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }
  options.headers = Object.assign({}, options.headers, {'Content-Type': 'application/json'})

  return fetch(`${baseUrl}${path}`, options).then((response) => {
    if( !response.ok ) { throw response.status }
    return response
  })
}
