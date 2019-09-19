import axios from 'axios'
// import { Message } from 'genesis-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({
  baseURL: '',
  timeout: 15000
})

let start = 0
let done = 0

// request interceptor
service.interceptors.request.use(
  config => {
    start++
    NProgress.start()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    done++
    if (start === done) {
      NProgress.done()
    }
    return response
  },
  error => {
    done = start = 0
    NProgress.done()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
