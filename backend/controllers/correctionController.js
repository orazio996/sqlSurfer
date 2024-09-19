const aiService = require('../services/aiService');
const dbService = require('../services/dbService');

let correction;
let cronologia;
const keywords = [
  'SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'INNER JOIN', 'LEFT JOIN', 
  'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN', 'JOIN', 'ON', 'HAVING', 'LIMIT', 
  'OFFSET', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 
  'ALTER', 'DROP', 'ADD', 'AND', 'OR', '--'
];

exports.correct = async (req, res, next) => {
  try {
    correction = await aiService.aiCorrect(req.body.query, req.body.id, req.body.model);
  } catch (error) {
    next(error);
  }
  next()
};

exports.formatCorrection = (req, res, next) => {

  let queries = correction.query.split(';');
  let formattedQueries = formatQueries(queries);
  // Unisci di nuovo le query, separandole con un punto e virgola e una nuova riga
  correction.query =  formattedQueries.join(';\n\n');

  queries = correction.correctedQuery.map(obj => 
    obj.queryCorretta + '\n\n/*\n' + obj.arrayErrori.join(';\n').toString() + '\n*/'
  );
  formattedQueries = formatQueries(queries);
  correction.correctedQuery =  formattedQueries.join(';\n\n') + ';';
  next()
}


  function formatQueries(queries){
    return queries.map(query => {
      let formattedQuery = query;

      // Inserisce una nuova riga prima delle parole chiave principali
      keywords.forEach(keyword => {
          const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
          formattedQuery = formattedQuery.replace(regex, `\n${keyword}`);
      });

      // Indenta le righe successive per migliorare la leggibilità
      formattedQuery = formattedQuery.split('\n').map(line => {
          if (keywords.some(keyword => line.trim().toUpperCase().startsWith(keyword))) {
              return line;
          }
          return '  ' + line;
      }).join('\n');

      // Rimuove eventuali spazi eccessivi
      formattedQuery = formattedQuery.replace(/\n\s*\n/g, '\n').trim();
      return formattedQuery;
    });
  }

exports.saveCorrection = async (req, res, next)=>{
  try {
    await dbService.saveCorrection(correction)
  } catch (error) {
    next(error);
  }
  res.status(200).json(correction);
}


exports.cronologia = async (req, res, next)=>{
  try {
    cronologia = await dbService.getCronologia(req.body.user_id)
  } catch (error) {
    next(error)
  }
  res.status(200).json(cronologia);
}
