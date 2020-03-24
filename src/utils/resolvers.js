const resolver = (code, message, res) => {
    return res.json({ status: code, message: message }).status(code);;
}

export default resolver;