const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const actionRoutes = require('./routes/actionRoutes');
const applicationStatusRoutes = require('./routes/applicationStatusRoutes');
const changeHistoryRoutes = require('./routes/changeHistoryRoutes');
const cityRoutes = require('./routes/cityRoutes');
const countryRoutes = require('./routes/countryRoutes');
const entityRoutes = require('./routes/entityRoutes');
const jobApplicationRoutes = require('./routes/jobApplicationRoutes');
const jobCategoryRoutes = require('./routes/jobCategoryRoutes');
const jobOfferRoutes = require('./routes/jobOfferRoutes');
const modalityRoutes = require('./routes/modalityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const AuthRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', AuthRoutes.routes);
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes.routes);
app.use('/api/applicationStatuses', applicationStatusRoutes.routes);
app.use('/api/changeHistories', changeHistoryRoutes.routes);
app.use('/api/cities', cityRoutes.routes);
app.use('/api/countries', countryRoutes.routes);
app.use('/api/entities', entityRoutes.routes);
app.use('/api/jobApplications', jobApplicationRoutes.routes);
app.use('/api/jobCategories', jobCategoryRoutes.routes);
app.use('/api/jobOffers', jobOfferRoutes.routes);
app.use('/api/modalities', modalityRoutes.routes);
app.use('/api/notifications', notificationRoutes.routes);
app.use('/api/roles', roleRoutes.routes);
app.use('/api/userRoles', userRoleRoutes);

// Rutas de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API');
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
