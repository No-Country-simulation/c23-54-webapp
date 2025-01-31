import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './Applications.css'
import CardApplications from '../../Components/Cards/CardApplications/CardApplications';
const Applications = () => {

    const [filter, setFilter] = useState(null);
    return (   

        <div className='Contenido'>
            <nav><Navbar /></nav>
            <main className='mp_main '>
                <div className='bg-Secondary  mp_container  col-12 col-sm-10 col-md-10   col-lg-10 my-4'>
                    <div>
                        <h3 className='PrimaryColor'>Mis Postulaciones</h3>
                        <div>
                            <button className={`btn-mipostulacion ${filter === null ? 'btn-seleccionado' : ''}`} onClick={() => setFilter(null)} >Todas las postulaciones </button>
                            <button className={`btn-mipostulacion ${filter === true ? 'btn-seleccionado' : ''}`} onClick={() => setFilter(true)}> Postulados </button>
                            <button className={`btn-mipostulacion ${filter === false ? 'btn-seleccionado' : ''}`} onClick={() => setFilter(false)} >Finalizados</button>
                        </div>

                        <div>
                            <CardApplications filter={filter} />
                        </div>

                    </div>

                </div>
            </main>

        </div>


    )
}

export default Applications