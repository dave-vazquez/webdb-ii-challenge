exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: '1C4PJLCS6FW531235',
          year: '2017',
          make: 'Infiniti',
          model: 'I30',
          mileage: 20000,
          transmissionType: 'Automatic',
          titleStatus: ''
        },
        {
          VIN: '1FMCU9G93EUD59171',
          year: '2016',
          make: 'Ford',
          model: 'Escape',
          mileage: 40000,
          transmissionType: 'Automatic',
          titleStatus: 'Reconstructed'
        },
        {
          VIN: '1VWCV7A39FC033325',
          year: '2014',
          make: 'Volkswagen',
          model: 'Passat',
          mileage: 88000,
          transmissionType: 'Automatic',
          titleStatus: ''
        },
        {
          VIN: '5FNRL38746B077742',
          year: '2007',
          make: 'Honda',
          model: 'Odyssey',
          mileage: 140000,
          transmissionType: 'Manual',
          titleStatus: 'Lemon'
        },
        {
          VIN: '2G2WP542351257328',
          year: '2015',
          make: 'Pontiac',
          model: 'Grand Prix',
          mileage: 90000,
          transmissionType: 'Automatic',
          titleStatus: ''
        }
      ]);
    });
};
