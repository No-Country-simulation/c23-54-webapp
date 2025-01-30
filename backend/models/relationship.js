const City = require('./city');
const Country = require('./country');
const JobOffer = require('./jobOffer')
const JobCategory = require('./jobCategory')
const Modality = require('./modality')
const User = require('./user');
const JobApplication = require('./jobApplication');
const ApplicationStatus = require('./applicationStatus');

// Country, City
Country.hasMany(City, {
    foreignKey: 'ID_country',
    sourceKey: 'ID_country'
});
City.belongsTo(Country, {
    foreignKey: 'ID_country',
    targetKey: 'ID_country'
});

// Joboffer, user, modality, jobcategory

Modality.hasMany(JobOffer, {
    foreignKey: 'ID_modality',
    sourceKey: 'ID_modality'
})

JobOffer.belongsTo(Modality, {
    foreignKey: 'ID_modality',
    sourceKey: 'ID_modality',
})

JobCategory.hasMany(JobOffer, {
    foreignKey: 'ID_job_category',
    sourceKey: 'ID_job_category'
})

JobOffer.belongsTo(JobCategory, {
    foreignKey: 'ID_job_category',
    sourceKey: 'ID_job_category',
})

User.hasMany(JobOffer, {
    foreignKey: 'ID_user',
    sourceKey: 'ID_user'
})

JobOffer.belongsTo(User, {
    foreignKey: 'ID_user',
    sourceKey: 'ID_user',
})

City.hasMany(JobOffer, {
    foreignKey: 'ID_city',
    sourceKey: 'ID_city'
})

JobOffer.belongsTo(City, {
    foreignKey: 'ID_city',
    sourceKey: 'ID_city',
})

// jobApplication, user, offer, applicationStatus

JobApplication.belongsTo(User, {
    foreignKey: 'ID_user',
    sourceKey: 'ID_user'
})

User.hasMany(JobApplication, {
    foreignKey: 'ID_user',
    sourceKey: 'ID_user'
})

JobApplication.belongsTo(JobOffer, {
    foreignKey: 'ID_offer',
    sourceKey: 'ID_offer'
})

JobOffer.hasMany(JobApplication, {
    foreignKey: 'ID_offer',
    sourceKey: 'ID_offer'
})

JobApplication.belongsTo(ApplicationStatus, {
    foreignKey: 'ID_application_status',
    sourceKey: 'ID_application_status'
})

ApplicationStatus.hasMany(JobApplication, {
    foreignKey: 'ID_application_status',
    sourceKey: 'ID_application_status'
})




module.exports = {
    City,
    Country,
    JobCategory,
    JobOffer,
    User,
    Modality,
    JobApplication,
    ApplicationStatus
};
