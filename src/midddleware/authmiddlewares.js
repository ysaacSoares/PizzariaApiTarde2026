
import jwt, { decode } from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const authHeader = req.herders.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido." });
    }

    const parts = authHeader.split('');
    if (parts.length !== 2) {
        return res.status(401).json({ message: "Token em fomato inválido" });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token mal formatado." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "token inválido ou expirado." });
        }

        req.userCpf = decoded.userCpf;
        req.userEmail = decoded.email;
        return next();

    });

}
export default authMiddleware;
