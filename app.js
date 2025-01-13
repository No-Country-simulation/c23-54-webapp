const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./backend/routes/userRoutes');
const actionRoutes = require('./backend/routes/actionRoutes');
const applicationStatusRoutes = require('./backend/routes/applicationStatusRoutes');
const changeHistoryRoutes = require('./backend/routes/changeHistoryRoutes');
const cityRoutes = require('./backend/routes/cityRoutes');
const countryRoutes = require('./backend/routes/countryRoutes');
const entityRoutes = require('./backend/routes/entityRoutes');
const jobApplicationRoutes = require('./backend/routes/jobApplicationRoutes');
const jobCategoryRoutes = require('./backend/routes/jobCategoryRoutes');
const jobOfferRoutes = require('./backend/routes/jobOfferRoutes');
const modalityRoutes = require('./backend/routes/modalityRoutes');
const notificationRoutes = require('./backend/routes/notificationRoutes');
const roleRoutes = require('./backend/routes/roleRoutes');
const userRoleRoutes = require('./backend/routes/userRoleRoutes');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/applicationStatuses', applicationStatusRoutes);
app.use('/api/changeHistories', changeHistoryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/entities', entityRoutes);
app.use('/api/jobApplications', jobApplicationRoutes);
app.use('/api/jobCategories', jobCategoryRoutes);
app.use('/api/jobOffers', jobOfferRoutes);
app.use('/api/modalities', modalityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/roles', roleRoutes);
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
