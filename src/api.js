const baseUrl = window.location.href.match(/localhost/) ? 'http://localhost:3001' : 'https://titillator.superserious.co'

export default function api(path, options) {
  if( path[0] !== '/' ) path = `/${path}`
  if( typeof options.body !== 'string' ) {
    options.body = JSON.stringify(options.body)
  }
  options.headers = Object.assign({}, options.headers, {'Content-Type': 'application/json'})
  if( options.accessToken ) {
    options.headers = Object.assign({}, options.headers, {'X-Access-Token': options.accessToken})
    options.accessToken = undefined
  }

  return fetch(`${baseUrl}${path}`, options).then((response) => {
    if( !response.ok ) { throw response.status }
    return response
  })
}
