exports.up = function(knex) {
  return knex.schema
  .createTable("keywords", table => {
    table.increments('id').primary()
    table.integer("movie_id").notNullable()
    table.text("keywords");
  })
  .createTable("poster", table => {
    table.increments('id').primary()
    table.integer('imdb_id').notNullable()
    table.text("title")
    table.text('poster')
  })
  .createTable("metadata", table => {
    table.increments('id').primary()
    table.integer("movie_id").notNullable()
    table.text("genres");
    table.integer('imdb_id')
    // .foreign('imdb_id').references('poster')
    // table.text('title')
    table.text('overview')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable("metadata")
  .dropTable("keywords")
  .dropTable("poster");
};
