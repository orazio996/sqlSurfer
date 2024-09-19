
class Correction{
   
    id;
    user_id;
    query;
    correctedQuery;
    syntax;
    logic;
    timestamp;


/*
    constructor(id, user_id, query, correctedQuery, syntax,logic, timestamp){
        this.id = id;
        this.user_id = user_id;
        this.query = query;
        this.correctedQuery = correctedQuery;
        this.syntax = syntax;
        this.logic = logic;
        this.timestamp = timestamp;
    }
*/
    constructor(correction){
        this.user_id = correction.user_id;
        this.query = correction.query;
        this.correctedQuery = correction.correctedQuery;
        if(correction.syntax) this.syntax = correction.syntax;
        if(correction.logic) this.logic = correction.logic;
    }

    static processAiResponse (jsonData) {
        let queries = []; 

        for(let i=0; i<jsonData.arrayQueries.length; i++){
            queries.push(jsonData.arrayQueries[i].queryCorretta)
        }

        return queries;
    }
  

}

module.exports = Correction;