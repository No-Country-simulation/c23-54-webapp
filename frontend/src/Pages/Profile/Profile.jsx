import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './Profile.css'
import { ProfileIcon } from '../../Assets'
import UseProfileUser from '../../Hooks/UseProfileUser/UseProfileUser'

const Profile = () => {
    const { FecthProfile } = UseProfileUser()

    const [Profiledata, SetProfileData] = useState();
    useEffect(() => {
        const fecthdataprofile = async () => {
            try {
                const data = await FecthProfile();
                console.log(data)
                SetProfileData(data);
            } catch {

            }
        }
        fecthdataprofile()
    }, [])

    const Experience = ({ experience }) => {
        const [expanded, setExpanded] = useState(false);

        const toggleExpand = () => {
            setExpanded(!expanded);
        };

        return (
            <div className="text-center ">
                <div className='border-h3-profile'>
                    <h3>Experiencia</h3>
                </div>

                <ul className="px-2 ThirdText d-flex flex-column align-items-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {experience?.map((exp, index) => (
                        <li key={index} className="fw-bold" style={{ maxWidth: '200px' }}>
                            <p>
                                <strong>{exp.title}</strong> - <em>{exp.company}</em> ({exp.period})
                            </p>
                            {expanded && (
                                <ul>
                                    {exp.tasks.map((task, taskIndex) => (
                                        <li key={taskIndex}>{task}</li>
                                    ))}
                                </ul>
                            )}

                            <button onClick={toggleExpand} className="btn btn-link">
                                {expanded ? 'Ver menos' : 'Ver más'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    return (
        <div className='Contenido'>

            <nav><Navbar /></nav>

            <main>
                <div className='container d-flex justify-content-center align-items-center bg-Secondary mt-5 profile_container' >
                    <div className="d-flex flex-wrap justify-content-between w-100 my-5">
                        <div className=' d-flex flex-column section1-line flex-fill me-2 align-items-center'>
                            <div>
                                <div className='d-flex justify-content-center'>
                                    <img src={ProfileIcon} className='profile-icon '></img>
                                </div>

                                <div className='text-center border-h3-profile'>
                                    <h3>Datos Personales</h3>
                                </div>
                                <div className='d-flex '>
                                    <p className='ThirdText'>Nombre completo:</p>
                                    <p className=' px-2 PrimaryText fw-bold'>{Profiledata?.name}</p>
                                </div>

                                <div className='d-flex  '>
                                    <p className='ThirdText'>Fehca de nacimiento:</p>
                                    <p className=' px-2 PrimaryText fw-bold '>{Profiledata?.Birthdate}</p>
                                </div>

                                <div className='d-flex '>
                                    <p className='ThirdText'>Direccion:</p>
                                    <p className=' px-2 PrimaryText fw-bold '>{Profiledata?.address}</p>
                                </div>

                                <div className='d-flex'>
                                    <p className='ThirdText'>Ciudad:</p>
                                    <p className=' px-2 PrimaryText fw-bold '>{Profiledata?.City}</p>
                                </div>

                                <div className='d-flex'>
                                    <p className='ThirdText'>Pais:</p>
                                    <p className=' px-2 PrimaryText fw-bold'>{Profiledata?.Country}</p>
                                </div>

                            </div>
                        </div>

                        <div className='section2-line flex-fill mx-2'>
                            <div className='text-center border-h3-profile'>
                                <h3>Datos de Contacto</h3>
                            </div>
                            <div>
                                <div className='d-flex '>
                                    <p className='ThirdText'>Email:</p>
                                    <p className=' px-2 PrimaryText fw-bold'>{Profiledata?.email}</p>
                                </div>

                                <div className='d-flex  '>
                                    <p className='ThirdText'>Nro Celular:</p>
                                    <p className=' px-2 PrimaryText fw-bold '>{Profiledata?.PhoneNumber}</p>
                                </div>

                                <div className='d-flex '>
                                    <p className='ThirdText'>Telefono Fijo:</p>
                                    <p className=' px-2 PrimaryText fw-bold '>{Profiledata?.telephone}</p>
                                </div>

                                <div className='d-flex'>
                                    <p className='ThirdText'>Linkedin:</p>
                                    <a className=' px-2 PrimaryText fw-bold' href={Profiledata?.Linkedin} target='blank'>{Profiledata?.Linkedin}</a>
                                </div>

                                <div className='d-flex'>
                                    <p className='ThirdText'>Sitio Web:</p>
                                    <a className=' px-2 PrimaryText fw-bold' href={Profiledata?.Website} target='blank'>{Profiledata?.Website}</a>
                                </div>
                                <div className='d-flex'>
                                    <p className='ThirdText'>Facebook::</p>
                                    <a className=' px-2 PrimaryText fw-bold' href={Profiledata?.Facebook} target='blank'>{Profiledata?.Facebook}</a>
                                </div>
                                <div className='d-flex'>
                                    <p className='ThirdText'>Instagram:</p>
                                    <a className=' px-2 PrimaryText fw-bold' href={Profiledata?.instagram} target='blank'>{Profiledata?.instagram}</a>
                                </div>
                            </div>

                            <div>
                                <div className='text-center border-h3-profile'>
                                    <h3>Descripccion de aptitudes</h3>
                                </div>

                                <div className='d-flex flex-column'>
                                    <p className='ThirdText'>Habilidades técnicas:</p>
                                    <ul className='px-2 ThirdText'>
                                        {Profiledata?.skills?.map((skill, index) => (
                                            <li key={index} className="fw-bold">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="flex-fill mx-2 ">
                            <Experience experience={Profiledata?.experience} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Profile


