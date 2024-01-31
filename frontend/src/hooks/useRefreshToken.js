import axios from '../api/axios'
import { useAuth } from './useAuth'
const REFRESH_URL="/api/v1/auth/refresh"
export const useRefreshToken = () => {
  const {setAuth } = useAuth()
  const refresh = async() =>{
    const response = await axios.post(REFRESH_URL, {
      withCredentials:true
    })
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.token)
      return {...prev,token: response.data.token}
    })
    return response.data.token
  }
  return refresh
}
