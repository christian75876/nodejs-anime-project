
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({messge: "Ocurrió un error en el servidor"});
};

export default errorHandler;