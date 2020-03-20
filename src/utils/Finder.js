const Finder = (data, id) => {
    const look = (_data, id) => {
        const resp = [];
        _data.forEach(e => {
            if (e.id === id) {
                resp.push(e);
            } else if (e.childrens) {
                resp.push(...look(e.childrens, id));
            }
        });
        return resp;
    };
    return look(data, id);
};

export default Finder;