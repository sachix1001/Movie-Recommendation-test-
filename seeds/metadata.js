let metadata = require('../data/movies_metadata.json')

metadata = metadata
.filter(data => data.popularity > 3)
.map(data => {
  return {
    movie_id: data.id,
    genres: data.genres,
    imdb_id:Number(data.imdb_id.slice(2)),
    overview:data.overview,
    popularity: data.popularity,
  }
})
// pick populer one
// metadata = metadata.filter(data=> data.popularity > 5)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('metadata').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('metadata').insert(metadata);
  //   });
};
