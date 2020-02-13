let posters = require("../data/MovieGenre.json");
const {metadata} = require('./metadata')
// create insert data
const ids = metadata.map(data => data.imdb_id);

posters = posters
.map(poster => {
  return {
    imdb_id: poster.imdbId,
    title: poster.Title,
    poster: Array.from(poster.Poster).slice(1).join("")
  };
  // filter
})
// .filter(data => {
//   console.log(data.imdb_id)
//   return ids.includes(data.imdb_id)});
// posters = posters.filter(poster => {
//   // console.log(poster.imdb_id)
//   const year = poster.title
//     .split(/()/)
//     .filter(word => {
//       return word.match(/\d+/);
//     })
//     .join("");
//   return year > 1990 && year < 2020 && poster.poster.length > 0;
// });



exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("poster")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("poster").insert(posters.slice(0, 21845));
    });
};
