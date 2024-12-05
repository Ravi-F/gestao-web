export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // O usuário está autenticado, continue para a próxima rota
    }
    // O usuário não está autenticado, redirecione para a página de login
    res.redirect('/login');
};