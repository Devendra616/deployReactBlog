import {useEffect, useState} from 'react'
import { Container,PostForm } from '../components'
import appwriteService from '../appWrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost] = useState(null)
    const params = useParams()
    const {slug} = params    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect( () => {      
      
        if(slug) {
            const abortController = new AbortController()
            const signal = abortController.signal
            setLoading(true)
            appwriteService.getPost(slug, signal)
            .then((post) => {
                if(post) {
                   setPost(post)
                }
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                setLoading(false)
            })
            // if component is unmounted before getPost promise,
            //  cancel the request to prevent memory leak
            return () => abortController.abort()

        } else {
            navigate('/')
            return;        
        }
    },[slug, navigate])

    if(loading) {
        return <div>Loading ...</div>;
    } 
    if(error) {
         <p className="text-red-600 mt-8 text-center">{error}</p>
    }

  return post ? (
    <div className='py-8'>
        <Container >
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost