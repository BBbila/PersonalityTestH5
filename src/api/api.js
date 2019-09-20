import axios from 'axios'
import { CONTEXT } from '../config'

export function albumQuery() {
  const url = `${CONTEXT}/photoapi/v3/albumquery`
  let paramData = {
    params: {
      t: +new Date()
    }
  }
  return axios.get(url, paramData).then(res => {
    return Promise.resolve(res.data)
  }, res => {
    return Promise.reject(res.data)
  })
}


export function spaceQuery() {
  const url = `${CONTEXT}/netdisk/v2/queryspace`
  let paramData = {
    params: {
      portal: true,
      t: +new Date()
    }
  }
  return axios.get(url, paramData).then(res => {
    return Promise.resolve(res.data)
  }, res => {
    return Promise.reject(res.data)
  })
}


export function addAlbum(paramData) {
  const url = `${CONTEXT}/photoapi/v3/albumadd`
  return axios.post(
    url,
    paramData,
  ).then(res => {
    return Promise.resolve(res.data)
  }, res => {
    return Promise.reject(res.data)
  })
}


export function photoDel(paramData) {
  const url = `${CONTEXT}/photoapi/v5/photodel`
  return axios.post(
    url,
    paramData,
  ).then(res => {
    return Promise.resolve(res.data)
  }, res => {
    return Promise.reject(res.data)
  })
}


