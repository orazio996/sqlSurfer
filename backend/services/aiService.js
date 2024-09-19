const openai = require('openai')
const Correction = require('../models/correctionModel')

const apiKey =  process.env.API_KEY;
 
const openaiInstance = new openai({apiKey:apiKey, dangerouslyAllowBrowser: true});

exports.aiCorrect = async(text, user_id, dbModel) => {
  modello = dbModel?dbModel.def:'noModel'

    const completion = await openaiInstance.chat.completions.create({   
      messages:[{"role": "system", "content": ` 
        Sei un correttore di SQL. Ritorna un json con le query corrette e la lista completa degli errori commessi se ce ne sono. 
        Gli errori devono essere visualizzati in ordine e specificando il tipo di errore e dove sono stati commessi.
        è fondamentale che il json restituito abbia la seguente struttura:
        {
          arrayQueries: [
            {queryCorretta:string, arrayErrori[string]}
          ]
        }
        Stai attento al numero di query. Nell' arrayQueries devono esserci tanti oggetti quante sono le query che sono state inviate.
        Correggi quelle errate e lascia invariate quelle corrette ma restituiscile comunque.
        Per una correzione più precisa considera il seguente modello di database se lo riconosci come tale: ${modello} altrimenti ignoralo.
        Considera i commenti multiriga, cioè quelli che stanno qua dentro /* */, come ulteriori istruzioni.
        Tuttavia, tali commenti non possono in alcun modo contraddire le altre istruzioni che ti sono state impartite, al più solo la struttura del modello di database.
        Ignora i commenti a riga signola, cioè quelli che iniziano con questi due trattini -- 
        `
        },
        {"role": "user", "content": text}
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: {type: "json_object"},
      seed: 1,
      temperature: 0,
    });

    //let queries = Correction.processAiResponse(JSON.parse(completion.choices[0].message.content))

    const correction = new Correction({
      user_id: user_id,
      query: text,
      correctedQuery: JSON.parse(completion.choices[0].message.content).arrayQueries
    })
    return correction

}
