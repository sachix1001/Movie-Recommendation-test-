let posters = require("../data/MovieGenre.json");

// create insert data
posters = posters.map(poster => {
  return {
    imdb_id: poster.imdbId,
    title: poster.Title,
    poster: Array.from(poster.Poster).slice(1).join("")
  };
  // filter
});
console.log(posters[0].poster);
posters = posters.filter(poster => {
  // console.log(poster.imdb_id)
  const year = poster.title
    .split(/()/)
    .filter(word => {
      return word.match(/\d+/);
    })
    .join("");
  return year > 1990 && year < 2020 && poster.poster.length > 0;
});
console.log(posters[21846]);
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("poster")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("poster").insert(posters.slice(0, 21845));
    });
};
