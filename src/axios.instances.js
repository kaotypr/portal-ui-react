import axios from 'axios'

const portalHost = process.env.REACT_APP_API_PORTAL_HOST 
const portalPort = process.env.REACT_APP_API_PORTAL_PORT
const portalProtocol = process.env.REACT_APP_API_PORTAL_PROTOCOL
export const portalBaseURL = `${portalProtocol}://${portalHost}${portalPort}`
export const TokenizedURL = uri => `${portalBaseURL}/api/portal${uri}?jwt=${localStorage.getItem('token')}`

export const portalInstances = axios.create({
  baseURL: `${portalBaseURL}/api/portal`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

portalInstances.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Content-Type'] = 'application/json' 
      config.headers['Authorization'] = `Bearer ${ token }`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const clientHost = process.env.REACT_APP_API_CLIENT_HOST 
const clientPort = process.env.REACT_APP_API_CLIENT_PORT
const clientProtocol = process.env.REACT_APP_API_CLIENT_PROTOCOL
export const clientBaseURL = `${clientProtocol}://${clientHost}${clientPort}`

export const clientInstances = axios.create({
  baseURL: `${clientProtocol}://${clientHost}${clientPort}/api/portal`,
})

export default portalInstances