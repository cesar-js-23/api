var express = require('express');
const { pedirTodas, pedir, crear, actualizar, eliminar  } = require('../db/pedidos');
var router = express.Router();
const { body, validationResult } = require('express-validator');

// let metas = [
//   {
//     id: "1",
//     detalles: "Correr por 30 minutos",
//     periodo: "día",
//     eventos: 1,
//     icono: "🏃",
//     meta: 52,
//     plazo: "2030-01-01",
//     completado: 5,
//   },
//   {
//     id: "2",
//     detalles: "Leer libros",
//     periodo: "año",
//     eventos: 6,
//     icono: "📚",
//     meta: 12,
//     plazo: "2030-01-01",
//     completado: 1,
//   },
//   {
//     id: "3",
//     detalles: "Viajar a parques nacionales",
//     periodo: "mes",
//     eventos: 1,
//     icono: "✈️",
//     meta: 60,
//     plazo: "2030-01-01",
//     completado: 40,
//   }
// ]

/* GET users listing. */

const table = "metas";

router.get('/', function(req, res, next) {
  // res.send(metas);
  pedirTodas(table,(err,metas) => {
    if(err){
      return next(err);
    }
    res.send(metas);
  });
});

router.get('/:id',function(req,res,next){
  // const id = req.params.id;
  // const meta = metas.find(item => item.id === id);
  // if(!meta){
  //   return res.sendStatus(404);
  // }
  // res.send(meta);
  const id = req.params.id;
  pedir(table,id,(err,meta) => {
    if(err){
      return next(err);
    }
    if(!meta.length){
      return res.sendStatus(404);
    }
    res.send(meta[0]);
  });
});

router.post('/',
body('detalles').isLength({ min : 5}),
body('periodo').not().isEmpty(),
function(req,res,next){  
  // const meta = req.body;
  // metas.push(meta);
  // res.status(201);
  // res.send(meta);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const nuevaMeta = req.body;
  crear(table,nuevaMeta,(err,meta) => {
    if(err){
      return next(err);
    }
    res.send(meta);   
  });
});

router.put('/:id',function(req,res,next){
  // const id = req.params.id;
  // const meta = req.body;  
  // if(!meta){
  //   return res.sendStatus(404);
  // }
  // const indice = metas.findIndex(item => item.id === id);
  // // const indice2 = metas.find(item => item.id === id);
  // if(indice === -1){
  //   return res.sendStatus(404);
  // }
  // metas[indice] = meta;
  // res.send(meta);
  const id = req.params.id;
  const body = req.body; 
  if(body.id != id){
    return res.sendStatus(409);
  }

  pedir(table,id,(err,meta) => {
    if(err){
      return next(err);
    }
    if(!meta.length){
      return res.sendStatus(404);
    }
    actualizar(table,body,id,(err,meta) => {
      if(err){
        return next(err);
      }
      res.send(meta);   
    });
  })
  
});


router.delete('/:id',function(req,res,next){
//   const id = req.params.id; 
//   const indice = metas.findIndex(item => item.id === id);
//   // const indice2 = metas.find(item => item.id === id);
//   if(indice === -1){
//     return res.sendStatus(404);
//   }
//   // delete metas[indice];
//   metas.splice(indice,1);
//   res.sendStatus(204);
// });
  const id = req.params.id; 
  pedir(table,id,(err,meta) => {
    if(err){
      return next(err);
    }
    if(!meta.length){
      return res.sendStatus(404);
  }

  eliminar(table,id,(err,meta) => {   
    res.sendStatus(204);
  });
});


  

 });

module.exports = router;
