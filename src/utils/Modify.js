const Modify = (data, id, value) => {
    const look = (_data, id) => {
        const resp = [];
        _data.forEach(e => {
            if (e.id === id) {
                let temp = e;
                temp = {...e, ...value }
                resp.push(temp);
            } else if (e.childrens) {
                resp.push(...look(e.childrens, id));
            } else {
                resp.push(e);
            }
        });
        return resp;
    };
    return look(data, id);
}

export default Modify;