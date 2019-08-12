exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl
      .varchar('VIN', 17)
      .unique()
      .notNullable()
      .primary();
    tbl.integer('year', 4).notNullable();
    tbl.varchar('make', 128).notNullable();
    tbl.varchar('model', 128).notNullable();
    tbl.integer('mileage').notNullable();
    tbl.varchar('transmissionType', 128);
    tbl.varchar('titleStatus', 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
