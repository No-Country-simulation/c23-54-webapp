import React, { useContext, useEffect, useState } from 'react'
import UseMyapplications from '../../../Hooks/JobApplication/UseMyapplications'
import './CardApplications.css'
import img_aprobada from "../../../Assets/imagenes/Aprobada.png"
import img_pendiente from "../../../Assets/imagenes/Pendiente.png"
import img_rechazada from "../../../Assets/imagenes/Rechazada.png"
import img_revision from "../../../Assets/imagenes/Revision.png"
import img_vista from "../../../Assets/imagenes/Vista.png"
import { EllipsisVertical, Eye, Trash } from 'lucide-react'
import { AuthContext } from '../../../Context/AuthContext'
import { Link } from 'react-router-dom'
import { UseDelteApplication } from '../../../Hooks/JobApplication/UseDelteApplication'

const CardApplications = ({ filter }) => {
  const {idUser} = useContext(AuthContext)
  const { FetchMyApplications } = UseMyapplications();
  const [data, setData] = useState();
  const [openId, setOpenId] = useState(null);
  const {DelteApplication} = UseDelteApplication();
  useEffect(() => {
    const fetchData = async () => {
      if (idUser) {  
        const response = await FetchMyApplications(filter, idUser);
        setData(response);
      }
    };
    fetchData();
  }, [filter, idUser]); 

  const DeleteHandler = async(ID_application) =>{
      try{
        await DelteApplication(ID_application);
        const response = await FetchMyApplications(filter, idUser);
        setData(response);
      }catch{

      }

  }
  return (

    <div>

      {data?.map((item) => (
        <div className='Myapplications_container my-3 ' key={item.ID_application}>
          <div className=' Myapplications-title col-6 '>
            <h5 className='PrimaryColor'>{item.JobOffer?.title}</h5>
          </div>

          <div className='Myapplications-estado col-6   d-flex  '>

            <img
              className='Myaaplications-img '
              src={
                item.ApplicationStatus?.status === 'Pendiente' ? img_pendiente :
                  item.ApplicationStatus?.status === 'Aprobada' ? img_aprobada :
                    item.ApplicationStatus?.status === 'Rechazada' ? img_rechazada :
                      item.ApplicationStatus?.status === 'En revisión' ? img_revision :
                        item.ApplicationStatus?.status === 'Vista' ? img_vista :
                          null
              }
              alt={item.ApplicationStatus?.status}
            />
            <div className='col-7 col-sm-4 col-md-3 col-lg-3 '>
              <h5 className='PrimaryColor '>{item.ApplicationStatus?.status}</h5>
              {new Date(item.application_date).toLocaleDateString('es-ES', {
                month: 'long',
                day: 'numeric',
              })}            </div>
            <div>
              <EllipsisVertical onClick={() => (setOpenId((prevId) => (prevId === item.ID_application ? null : item.ID_application)))} />
            </div>
            {openId === item.ID_application &&
              <div className='Myapplications_Display px-3 py-1 mx-3' >
                <button className='Myapplications_Display_icon bg-transparent p-0 m-0 border-0' onClick={()=>{DeleteHandler(item.ID_application)}} >
                  <Trash width='20px' />
                  <p>Eliminar</p>
                </button>
                <Link className='Myapplications_Display_icon text-black text-decoration-none' to={`/ver/oferta_trabajo/${item.JobOffer?.ID_offer}`}>
                  <Eye width='20px' />
                  <p>Ver aviso</p>
                </Link>
              </div>
            }
          </div>
        </div>
      ))}

    </div>
  )
}


export default CardApplications;