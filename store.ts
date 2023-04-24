import axios, { AxiosInstance } from 'axios'

export const http: (req?: Request) => AxiosInstance = req => {
  return axios.create({
    headers: { 'Content-Type': 'application/json' }
  })
}