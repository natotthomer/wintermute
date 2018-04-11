const encodePayload = data => {
  let payload = ''

  Object.keys(data).forEach((element, index) => {
    if (index > 0) {
      payload += '&'
    }
    payload += element + '=' + data[element]
  })

  return payload
}

const fetcher = (url, options) => {
  let body = '', headers

  if (options.method === 'POST') {
    body = options.payload ? encodePayload(options.payload) : ''
    headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  } else {
    body = {},
    headers = new Headers({
      'Content-Type': 'application/json'
    })
  }

  return fetch(url, { // must match 'Content-Type' header
    body: body,
    credentials: 'include', // include, same-origin, *omit
    headers: headers,
    method: options.method
  })
    .catch(error => console.error(error))
}

export default fetcher
