// const csvToJson = require('convert-csv-to-json')

// const InputPoster = 'credits.csv'
// let Outputposter = 'credits.json'

// csvToJson.fieldDelimiter(',').getJsonFromCsv(InputPoster);
// csvToJson.generateJsonFileFromCsv(InputPoster, Outputposter)

const csvFilePath = "credits.csv";
const csv = require("csvtojson");

const converter=csv({escape:'['})

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})