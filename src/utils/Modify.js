import e from "express";
import { ReplSet } from "mongodb";

const Modify = (data, id, value) => {
    const look = (_data, id) => {
        const resp = [];

        _data.forEach(dato => {
            if (dato.id === id) {
                resp.push({...dato, ...value });
            } else if (dato.id != id && dato.childrens) {
                const a = look(dato.childrens, id);
                if (a.length > 0) {
                    resp.push(a);
                } else {
                    resp.push(dato)
                }
            } else {
                resp.push(dato);
            }
        })
        return resp;
    };
    return look(data, id);
}

export default Modify;




// const resp = [];
// _data.forEach(e => {
//     if (e.id === id) {
//         let temp = e;
//         temp = {...e, ...value }
//         resp.push(temp);
//     } else if (e.childrens) {
//         resp.push(...look(e.childrens, id));
//     } else {
//         resp.push(e);
//     }
// });
// return resp;