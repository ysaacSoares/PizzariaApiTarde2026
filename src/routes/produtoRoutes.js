import express from 'express';
import * as produtoController from '../controller/produtoController.js';

import { produtoCreateSchema, produtoUpdateSchema } from '../controller/produtoController.js';

import validate from '../midddleware/validate.js';

import authMiddleware from '../midddleware/authmiddlewares.js';
const router = express.Router();

router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);

 router.use(authMiddleware);
 router.get('/', produtoController.listarProduto);

 router.put('/:nomeProduto', validate(produtoCreateSchema), produtoController.atualizarProduto);

 router.delete('/:nomeProduto', produtoController.deletarProduto);


 export default router;