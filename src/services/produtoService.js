import db from '../db/db.js';

export const findAll = async  (valor,tipo, nomeProduto) => {

let sql = 'SELECT * FROM produto';

const conditions = [];
const values = [];

if (valor){
    conditions.push('valor >= ?');
    values.push(valor)
}

if (tipo){
conditions.push('LOWER (tipo) LIKE ?');
values.push(`%${tipo.toLowerCase()}%`);
}


if (nomeProduto){
conditions.push('LOWER (nomeProduto) LIKE ?');
values.push(`%${nomeProduto.toLowerCase()}%`);
}
 await db.query('INSERT INTO produto SET ?', produto );

return produto;
};
const [result] = await db.query('UPDATE produto SET ? WHERE nomeProduto = ?', [nomeProduto,produto]);
  return result.affectedRows > 0;

  export const remove = async (nomeProduto) => {
    const [result] = await db.query('DELETE FROM produto WHERE nomeProduto = ?', [nomeProduto]);
    return result.affectedRows > 0 ;
  };

