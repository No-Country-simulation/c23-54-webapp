


export const MyapplicationsService = async () =>{
        // LLAMADA A LA API
    try{

        //DATOS DE PRUEBA 
        const data = [
            {
                id: 1,
                title: 'Desarrolladora principal front-end REACT, VUE',
                estado: 'Pendiente',
                fecha: '11 de enero'
            },
            {
                id: 2,
                title: 'Ingeniera de Software Full Stack',
                estado: 'Vista',
                fecha: '14 de marzo'
            },
            {
                id: 3,
                title: 'Especialista en optimización de interfaces',
                estado: 'En revisión',
                fecha: '24 de junio'
            },
            {
                id: 4,
                title: 'Arquitecta de Software Front-End',
                estado: 'Aprobada',
                fecha: '8 de enero'
            },
            {
                id: 5,
                title: 'Diseñadora UI/UX para aplicaciones web',
                estado: 'Rechazada',
                fecha: '27 de diciembre'
            }
        ];

        return data;
        


    }catch(error){

    }
}