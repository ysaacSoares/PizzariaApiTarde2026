import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt ';
import * as clienteService from '../services/clienteService';
export const login = async (req, res) => {
    const { cpf, senha } = req.body;
    try {
        const clientes = await clienteService.findAll(cpf);
        const cliente = clientes[0];
        if (!cliente) {
            return res.status(401).json({ message: "Credenciais inválidas " });
        }
        // 2.comparar a senha enviada com hash salvo no banco

        const senhaValida = await bcrypt.compare(senha, cliente.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: "Credenciais invalidas " });

        }
        // 3. Gerar o token JWT
        // o 'payload' são as informações que queremos guadar no token

        const payload = { cpf: cliente.cpf, email: cliente.email };

        // o token é a assinado com a nossa chave secreta do .env 

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h' // token expira em 1 hora    
        });

        // 4. enviar o token para p cliente 

        res.json({ message: "Login bem-sucedido", token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
};