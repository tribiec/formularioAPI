const resolver = (code, message, res) => {
    switch (code) {
        case 200:
            return res.json({ status: 200, message }).status(200);
        case 404:
            return res.json({ status: 404, message }).status(404);
        case 500:
            return res.json({ status: 500, message }).status(500);
        default:
            return res.json({ status: 100, message: "Unknow response code" }).status(100);
    }
}

export default resolver;