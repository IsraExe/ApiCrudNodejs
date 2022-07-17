const capitalizeProperties = function(req) {
    const nomeParametroPrimeiraLetra = Object.keys(req.query).toString().charAt(0).toUpperCase()
    const nomeParametro = nomeParametroPrimeiraLetra + Object.keys(req.query).toString().slice(1).toLowerCase()
    return nomeParametro;
}

export default capitalizeProperties