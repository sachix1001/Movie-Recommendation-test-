
let posters = require('../data/MovieGenre.json')

// create insert data
posters = posters.map(poster => {
  return {
    imdb_id: Number(poster.imdbId),
    title: poster.Title,
    poster: poster.Poster
  }
  // filter 
})
posters = posters.filter(poster => {
  const year = poster.title
  .split(/()/)
  .filter(word =>word.match(/\d+/)).join('')

  return year > 1990 && year < 2020;
  })

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return 
  knex('poster').del()
    .then(function () {
      // Inserts seed entries
      return knex('poster').insert([
       posters
      ]);
    });
};
