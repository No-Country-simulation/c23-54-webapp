import React, { useEffect, useState } from 'react'
import UseMyapplications from '../../../Hooks/Myapplications/UseMyapplications'
import './CardApplications.css'
import img_aprobada from "../../../Assets/imagenes/Aprobada.png"
import img_pendiente from "../../../Assets/imagenes/Pendiente.png"
import img_rechazada from "../../../Assets/imagenes/Rechazada.png"
import img_revision from "../../../Assets/imagenes/Revision.png"
import img_vista from "../../../Assets/imagenes/Vista.png"
import { EllipsisVertical, Eye, Trash } from 'lucide-react'

const CardApplications = () => {

  const { FetchMyaaplications, data } = UseMyapplications();
  const [openId, setOpenId] = useState(null); // Estado para almacenar la ID de la oferta seleccionada

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetchMyaaplications();

    }
    fetchData();
  }, [])
  return (
    <div>

      {data?.map((item) => (
        <div className='Myapplications_container my-3 ' key={item.id}>
          <div className=' Myapplications-title col-6 '>
            <h5 className='PrimaryColor'>{item.title}</h5>
          </div>

          <div className='Myapplications-estado col-6   d-flex  '>

            <img
              className='Myaaplications-img '
              src={
                item.estado === 'Pendiente' ? img_pendiente :
                  item.estado === 'Aprobada' ? img_aprobada :
                    item.estado === 'Rechazada' ? img_rechazada :
                      item.estado === 'En revisión' ? img_revision :
                        item.estado === 'Vista' ? img_vista :
                          null
              }
              alt={item.estado}
            />
            <div className='col-7 col-sm-4 col-md-3 col-lg-3 '>
              <h5 className='PrimaryColor '>{item.estado}</h5>
              <p className='Myapplications_text'>{item.fecha}</p>
            </div>
            <div>
            <EllipsisVertical onClick={() => (setOpenId((prevId) => (prevId === item.id ? null : item.id)))} />
            </div>
            {openId === item.id &&
              <div className='Myapplications_Display px-3 py-1 mx-3' >
                <div className='Myapplications_Display_icon'>
                  <Trash width='20px' />
                  <p>Eliminar</p>
                </div>
                <div className='Myapplications_Display_icon'>
                  <Eye width='20px' />
                  <p>Ver aviso</p>
                </div>
              </div>
            }
          </div>
        </div>
      ))}


    </div>
  )
}

export default CardApplications;