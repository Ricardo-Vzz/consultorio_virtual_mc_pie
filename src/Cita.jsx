import Breadcrumbs from './Breadcrums'
import './App.css'
import Navbar from './navbar'

function Cita() {
  return (
    <>
      <div>
        <Navbar />
        
        <h1>Agendar Cita</h1>
        <Breadcrumbs paths={[{ label: 'Agendar Cita', href: '/cita'}]} />
      </div>
    </>
  )
}

export default Cita