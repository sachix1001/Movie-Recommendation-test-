let metadata = require('../data/movies_metadata.json')

metadata = metadata.map(data => {
  return {
    movie_id: data.id,
    genres: data.genres,
    imdb_id:Number(data.imdb_id.slice(2)),
    // title: data.original_title,
    overview:data.overview
  }
})
// console.log(metadata[16384])
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('metadata').del()
    .then(function () {
      // Inserts seed entries
      return knex('metadata').insert(metadata.slice(0,16383));
    });
};
