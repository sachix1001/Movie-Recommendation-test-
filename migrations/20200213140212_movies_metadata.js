exports.up = function(knex) {
  return knex.schema
  // .createTable("keywords", table => {
  //   table.increments('id').primary()
  //   table.integer("movie_id").notNullable()
  //   table.text("keywords");
  // })
  // .createTable("poster", table => {
  //   table.increments('id').primary()
  //   table.integer('imdb_id').notNullable()
  //   table.text("title")
  //   table.text('poster')
  // })
  // .createTable("metadata", table => {
  //   table.increments('id').primary()
  //   table.integer("movie_id").notNullable()
  //   table.text("genres");
  //   table.integer('imdb_id')
  //   // .foreign('imdb_id').references('poster')
  //   table.text('overview')
  //   table.text('popularity')
  // })

  .createTable("movies", table => {
    table.increments('id').primary()
    table.integer("movie_id").notNullable()
    table.text("genres");
    table.integer('imdb_id')
    table.text('popularity')
    table.text('overview')
    table.text("title")
    table.text('poster')
    table.text("keywords");
  })


};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable("movies")
  // .dropTable("keywords")
  // .dropTable("poster");
};
