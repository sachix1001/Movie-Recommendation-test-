let keywords = require('../data/keywords.json')
keywords = keywords.map(keyword => {
  return {
    movie_id: keyword.id,
    keywords: keyword.keywords
  }
})
// Filter if keywords are empty
.filter(keyword=>keyword.keywords.length > 4)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('keywords').del()
    .then(function () {
      // Inserts seed entries
      return knex('keywords').insert(keywords);
    });
};
