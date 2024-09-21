
const csrftoken_router = (req, res) => {

    const token = req.csrfToken();
    console.log('CSRF Token: ' + token);

    res.cookie('XSRF-TOKEN', token, {
        httpOnly: false, 
        secure: true, 
        sameSite: 'Strict' 
    });
    res.status(200).json({ csrfToken: req.csrfToken() });
};

export default csrftoken_router