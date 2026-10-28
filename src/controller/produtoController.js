import * as clienteService from '../services/clienteService.js';
import Joi from 'joi';

export const produtoCreateSchema = Joi.object({
  nomeProduto:  Joi.string().required(),
  descricao:Joi.string().required(),
  tipo:Joi.string().required(),
  valor:Joi.string().required(),
  imagem:Joi.string().required()
});


export const produtoUpdateSchema= Joi.object({
  nomeProduto:  Joi.string(),
  descricao:Joi.string(),
  tipo:Joi.string(),
  valor:Joi.string(),
  imagem:Joi.string()
});



export const listarProduto = async (req, res) => {
    try {
        const {nomeProduto,tipo,valor} = req.query;

        const produto = await produtoService.findAll(nomeProduto,tipo,valor);
        res.json(produto); 
    } catch (err){
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }   
    };

    export const adicionarProduto = async (req, res) => {
      try {
        const novoCliente = await produtoService.create(req.body);
        res.status(201).json({ message: 'produto adicionado com sucesso', data: novoProdto });
      } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'produto já cadastrado.' });
        }
        res.status(500).json({ error: 'Erro ao adicionar produto' });
      }
    };
    
    export const atualizarProduto = async (req, res) => {
      try {
        const { nomeProduto } = req.params;
        const updated = await produtoService.update(nomeProduto, req.body);
        if (!updated) {
          return res.status(404).json({ error: 'produto não encontrado' });
        }
        res.status(200).json({ message: 'produto atualizado com sucesso' });
      } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
      }
    };

    export const deletarProduto = async (req, res) => {
      try {
        const { cpf } = req.params;
        const deleted = await produtoService.remove(nomeProduto);
        if (!deleted) {
          return res.status(404).json({ error: 'produto não encontrado' });
        }
        res.status(200).json({ message: 'produto deletado com sucesso' });
      } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro ao deletar produto' });
      }
    };
    
