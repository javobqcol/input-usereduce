import { useContext, useEffect, useRef, useState } from 'react'
import "./LogiForm.css"
import axios from '../../api/axios'
import { authContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import { initialStateLogin } from '../../hooks/actions'
const LOGIN_URL = 'api/login'

export const LoginForm = () => {
  const userRef = useRef()
  const errRef= useRef()
  const { auth, setAuth } = useContext(authContext)
  const navigate = useNavigate()

  const [user, setUser] = useState(initialStateLogin)
  const {email, password, errMsg, success} = user

  useEffect(() => {
    userRef.current.focus()
  }, [])
  
  useEffect(() => {
   setUser({...user, errMsg:""})
  }, [email, password])

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUser({...user, [name]: value});
  };
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      const response = await axios.post(LOGIN_URL, 
        {email, password}
      )
      console.log("r=",response?.data.tokenSession)
      console.log(setAuth, auth)
      const tokenSession = response?.data.tokenSession
      const role = response?.data.role
      setAuth({ email, password, role, tokenSession} )
      setUser({...user, success:true, email:"", password: ""})
      navigate('/products')
    } catch (error) {
      if (!error?.response){
        setUser({...user, errMsg:"No server Response"})
      }else if(error.respone?.status===400){
        setUser({...user, errMsg:"Missing email or password"})
      } else if(error.response?.status===401){
        setUser({...user, errMsg:"Unauthorized"})
      } else {
        setUser({...user, errMsg:"Login Failed"})
      }
    }
  }


  return (
    <> 
      {success ? (
        <section>
          <h1>YouAre Logged in</h1>
          <br/>
          <p>
            <a href="#">Goto Home</a>
          </p>
        </section>
      ):(
      <section className='screen'>
        <section className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Email" autoComplete='off' ref={userRef} id='inputEmail' name='email' value={email} onChange={onInputChange} required/>
              <i className="icon fa-solid fa-user"></i>
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" autoComplete='off' id='inputpassword' name='password' value={password} onChange={onInputChange}required />
              <i className="icon fa-solid fa-lock"></i>
            </div>
            <div className="remember-forgot">
              <label><input type="checkbox"/>Remember me</label>
              <a href="·">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className="register-link">
              <p>Dont have an account? <a href="·">Register</a> 
              </p>
            </div>
            <div className="error-section">
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"> {errMsg}
              </p>
            </div>
          </form>
        </section>
      </section>
    )}
    </>
  )
}
