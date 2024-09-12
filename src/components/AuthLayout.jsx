import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children, authentication = "true"}) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {

       /*  if(authStatus === true){
            navigate("/")
        } else{
            navigate("/login")
        } */
        
        if(authentication && authStatus !== authentication) {
            navigate("/login")
        } /* else if (!authentication && authStatus !== authentication){
            navigate("/")
        } */
        setLoading(false)
    },[authStatus, authentication, navigate])
    
  return loading ? <p>Loading...</p> : <>{children}</>
}

export default AuthLayout