const dbService = require('../services/dbService');

exports.newModel = async (req, res, next)=>{
    try {
        console.log(req.body)
        model = await dbService.newModel(req.body) //deve essere un oggetto {nome: , def: , user_id: }
      } catch (error) {
        next(error);
      }
      res.status(200).json(model);
}

exports.models = async (req, res, next)=>{
    try {
        models = await dbService.getModels(req.body.user_id)
      } catch (error) {
        next(error)
      }
      res.status(200).json(models);
}