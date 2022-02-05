//import styles from '../styles/Home.module.scss'
import { useRouter } from 'next/router'
import { Button, Container } from 'react-bootstrap'

export default function Home() {
  const router = useRouter()

  return (
    <div className='wrapper home-wrapper'>
      <div className='info'>
        <h1>Brewery Database</h1>
        <Container lg={3}>
          <p>Welcome!</p>
          <p>
            Here you can get public information on breweries, cideries,
            brewpubs, and bottleshops, from all over the world! Pick from the list
            or search for breweries for details!
          </p>
        </Container>
      </div>
      <Button
        variant='outline-warning'
        size='lg'
        onClick={() => router.push('/breweries')}
      >
        Show more &raquo;
      </Button>
    </div>
  )
}
