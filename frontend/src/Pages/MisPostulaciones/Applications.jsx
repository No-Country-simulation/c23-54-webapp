import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './Applications.css'
import CardApplications from '../../Components/Cards/CardApplications/CardApplications';
const Applications = () => {

    const [selected, setSelected] = useState('Todas');

    return (

        <div className='Contenido'>
            <nav><Navbar /></nav>
            <main className='mp_main '>
                <div className='bg-Secondary  mp_container  col-12 col-sm-10 col-md-10   col-lg-10 my-4'>
                    <div>
                        <h3 className='PrimaryColor'>Mis Postulaciones</h3>
                        <div>
                            <button className={`btn-mipostulacion ${selected === 'Todas' ? 'btn-seleccionado' : ''}`} onClick={() => setSelected('Todas')} >Todas las postulaciones </button>
                            <button className={`btn-mipostulacion ${selected === 'Postulados' ? 'btn-seleccionado' : ''}`} onClick={() => setSelected('Postulados')}> Postulados </button>
                            <button className={`btn-mipostulacion ${selected === 'Finalizados' ? 'btn-seleccionado' : ''}`} onClick={() => setSelected('Finalizados')} >Finalizados</button>
                        </div>

                        <div>
                            <CardApplications/>
                        </div>

                    </div>

                </div>
            </main>

        </div>


    )
}

export default Applications