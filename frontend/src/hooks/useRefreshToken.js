import axios from '../api/axios'
import { useAuth } from './useAuth'
const REFRESH_URL="/api/v1/auth/refresh"
export const useRefreshToken = () => {
  const {setAuth, auth } = useAuth()
  const refresh = async() =>{
    try {
      const response = await axios.get(REFRESH_URL, {
        withCredentials: true
      })
    setAuth(prev => {
      return {...prev,token: response.data.token}
    })
    return response.data.token
        
    } catch (error) {
      return error    
    }
  }
  return refresh
}
