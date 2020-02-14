let allData = require("../data/allData.json");
allData = allData
  .map(data => {
    return {
      movie_id: data.movie_id,
      genres: data.genres,
      imdb_id: data.imdb_id,
      popularity: data.popularity,
      overview: data.overview,
      title: data.title,
      poster: data.poster,
      keywords: data.keywords
    };
  });

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("movies")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("movies").insert(allData);
    });
};
