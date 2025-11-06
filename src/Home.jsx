import './App.css'
import Breadcrumbs from './Breadcrums'
import Navbar from './navbar'

function Home() {
  return (
    <>
      <div>
        <Navbar />

        <h1>Home</h1>
        <Breadcrumbs paths={[{ label: 'Inicio', href: '/' }]} />
      </div>
    </>
  )
}

export default Home
