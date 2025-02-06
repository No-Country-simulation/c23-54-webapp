


export const UserService = async (ID_user) => {

    try {  
        const data = {
            "ID_user": 4,
            "name": "Nestor",
            "email": "nestor@hotmail.com",
            "Birthdate": "08/01/2003",
            "PhoneNumber": "+54 11 123456",
            "telephone": "11987654",
            "Linkedin": "linkedin.com/milink-123",
            "Website": 'Misitioenlanube.netlify.app/index',
            "instagram": "instagram.com/miusuariodeig",
            "Facebook": 'facebook.com/miusuariodefb',
            "phone": "9839393",
            "address": "calle numero",
            "City": 'Rosario',
            "Country": "Argentina",
            "skills": [
                "Programación en JavaScript",
                "Programación en Python",
                "Programación en Java",
                "Manejo de frameworks como React",
                "Manejo de frameworks como Angular",
                "Manejo de frameworks como Spring Boot",
                "Diseño de bases de datos relacionales (MySQL, PostgreSQL)"
            ],
            "experience": [
                {
                    "title": "Desarrollador Full Stack",
                    "company": "TechNow Solutions S.A.",
                    "period": "febrero 2020 - diciembre 2023",
                    "tasks": [
                        "Diseñó y desarrolló sistemas web para la gestión de proyectos utilizando React y Node.js.",
                        "Implementó integraciones con APIs externas para automatización de procesos.",
                        "Lideró un equipo de 4 desarrolladores, logrando reducir los tiempos de desarrollo en un 30%.",
                        "Realizó optimización de bases de datos para mejorar tiempos de consulta en un 25%."
                    ]
                },
                {
                    "title": "Analista de Datos Junior",
                    "company": "DataCore Analytics",
                    "period": "junio 2017 - enero 2020",
                    "tasks": [
                        "Procesó grandes volúmenes de datos utilizando Python y herramientas de visualización como Power BI.",
                        "Automatizó reportes semanales, disminuyendo el tiempo manual de preparación en un 50%.",
                        "Colaboró con el equipo de marketing para analizar datos de clientes y aumentar las conversiones en un 15%."
                    ]
                },
                {
                    "title": "Prácticas Profesionales",
                    "company": "SoftTech Innovators",
                    "period": "enero 2016 - mayo 2017",
                    "tasks": [
                        "Participó en el desarrollo de un sistema de e-commerce utilizando Django.",
                        "Realizó pruebas de calidad para garantizar el funcionamiento óptimo de las aplicaciones.",
                        "Documentó procesos y guías para usuarios finales."
                    ]
                }
            ]
        }

        return data;
    } catch {

    }


}