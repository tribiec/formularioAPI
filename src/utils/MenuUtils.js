const add = (actual, id_dest, data) => {
    const niveles = id_dest.split(":");
    let temp = actual;
    try {
        if (niveles.length === 1) {
            if (niveles[0] === "0") {
                actual.push({...data, id: actual.length + 1 });
            } else {
                temp = temp[niveles[0] - 1];
                temp.childrens.push({...data, id: temp.id + ":" + (temp.childrens.length + 1) });
            }
        } else {
            niveles.forEach((nivel, i) => {
                if (i === 0) {
                    temp = temp[nivel - 1];
                } else {
                    temp = temp.childrens[nivel - 1];
                }
            });
            temp.childrens.push({
                ...data,
                id: id_dest + ":" + (temp.childrens.length + 1)
            });
        }
    } catch (exc) {
        console.log("Error al agregar en MenuUtils....");
    }

    return actual;
};

const get = (data, dest) => {
    const niveles = dest.split(":");
    let resp = data;
    try {
        niveles.forEach((nivel, i) => {
            if (i === 0) {
                resp = data[nivel - 1];
            } else {
                resp = resp.childrens[nivel - 1];
            }
        });
    } catch (exc) {
        console.log("Error al obtener");
    }
    return resp;
};

const retire = (data, dest) => {
    const niveles = dest.split(":");
    let resp = data;
    try {
        niveles.forEach((nivel, i) => {
            if (i === 0) {
                resp = resp[nivel - 1];
            } else if (i + 1 === niveles.length) {
                const temp = resp.childrens.filter(r => r.id !== dest);
                resp.childrens = [...temp];
            } else {
                resp = resp.childrens[nivel - 1];
            }
        });
    } catch (exc) {
        console.log("Error al retirar item...");
    }
    return data;
};

const modify = (data, dest, input) => {
    const niveles = dest.split(":");
    let resp = data;
    let check = false;
    try {
        niveles.forEach((nivel, i) => {
            if (niveles.length === 1) {
                resp = resp.map(r => {
                    if (r.id == dest) {
                        return {...r, ...input }
                    }
                    return r;
                });
            } else {
                if (i === 0) {
                    resp = resp[nivel - 1];
                } else if (i + 1 === niveles.length) {
                    resp = resp.childrens[nivel - 1];
                    for (const i in input) {
                        resp[i] = input[i];
                    }
                } else {
                    resp = resp.childrens[nivel - 1];
                }
            }
        });
    } catch (exc) {
        console.log("Error al modificar...");
    }
    return (check) ? resp : data;
};

export { add, get, retire, modify };