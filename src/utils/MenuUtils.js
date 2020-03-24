const add = (actual, id_dest, data) => {
    const niveles = id_dest.split(":");
    let temp = actual;
    try {
        if (niveles.length === 1) {
            const index = getIndex(temp, niveles[0]);
            // Nivel 1
            if (niveles[0] === "0") {
                const id = actual.length > 0 ? actual[actual.length - 1].id + 1 : 1;
                actual.push({...data, id });
            } else if (!temp[index].form_id) {
                temp = temp[index];
                let id =
                    temp.childrens.length > 0 ?
                    temp.childrens[temp.childrens.length - 1].id :
                    1;
                if (id == "1") {
                    id = id_dest + ":" + id;
                } else {
                    const tempid = parseInt(id.slice(-1)) + 1;
                    id = id.slice(0, -1) + tempid;
                }
                temp.childrens.push({
                    ...data,
                    id
                });
            } else {
                throw {
                    code: 500,
                    message: "No se puede agregar Menu dentro de un Form"
                };
            }
        } else {
            // Multimenu
            niveles.forEach((nivel, i) => {
                const selector = getSelector(niveles, i);
                if (i === 0) {
                    const index = getIndex(temp, selector);
                    temp = temp[index];
                } else {
                    const index = getIndex(temp.childrens, selector);
                    temp = temp.childrens[index];
                }
            });
            let id =
                temp.childrens.length > 0 ?
                temp.childrens[temp.childrens.length - 1].id :
                1;
            if (id == "1") {
                id = id_dest + ":" + id;
            } else {
                const tempid = parseInt(id.slice(-1)) + 1;
                id = id.slice(0, -1) + tempid;
            }
            temp.childrens.push({
                ...data,
                id
            });
        }
    } catch (exc) {
        console.log("Error al agregar en MenuUtils....");
        if (exc.code == 500) actual = exc;
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

const retire = (data, dest, form_id = false) => {
    const niveles = dest.split(":");
    if (dest[0] == "0") return [];
    let resp = data;
    try {
        niveles.forEach((nivel, i) => {
            if (niveles.length === 1) {
                data = resp.filter(r => r.id != dest);
            } else {
                if (i === 0) {
                    resp = resp.filter(r => r.id == nivel)[0];
                } else if (i + 1 === niveles.length) {
                    const temp = resp.childrens.filter(e => e.id != dest);
                    if (form_id) {
                        const element = resp.childrens.filter(e => e.id == dest);
                        resp.childrens = [...temp];
                        data = { id: element[0].form_id, data };
                    } else {
                        resp.childrens = [...temp];
                    }
                } else {
                    const stringSelector = getSelector(niveles, i);
                    const index = getIndex(resp.childrens, stringSelector);
                    resp = resp.childrens[index];
                }
            }
        });
    } catch (exc) {
        console.log("Error al retirar item...");
        data = { status: 500, message: "Error al retirar item..." };
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
                        return {...r, ...input };
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
    return check ? resp : data;
};

const getRetiredForms = (data, dest) => {
    const niveles = dest.split(":");
    let temp = data;
    let forms = [];
    try {
        niveles.forEach((n, i) => {
            if (i === 0) {
                const stringSelector = getSelector(niveles, i);
                const index = getIndex(temp, stringSelector);
                if (index === false)
                    throw { status: 404, message: "Menu no encontrado..." };
                temp = temp[index];
            } else {
                const index = getIndex(temp.childrens, getSelector(niveles, i));
                temp = temp.childrens[index];
            }
        });
        if (temp.childrens.length > 0) {
            forms = find(temp.childrens);
        } else {
            return [];
        }
    } catch (exc) {
        console.log(exc);
        forms = exc;
    }
    return forms;
};

/**
 *
 * Otras utilidades
 *
 */

const getSelector = (niveles, i) => {
    let stringSelector = "";
    for (let j = 0; j < i + 1; j++) {
        stringSelector =
            stringSelector == "" ? niveles[j] : stringSelector + ":" + niveles[j];
    }
    return stringSelector;
};

const getIndex = (childrens, stringSelector) => {
    let index = false;
    for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].id == stringSelector) {
            index = i;
        }
    }
    return index;
};

const getFormsID = (data, ant = []) => {
    data.forEach(menu => {
        if (menu.childrens) {
            ant = [...ant, ...getFormsID(menu.childrens)];
        } else {
            if (menu.form_id) {
                ant.push(menu.form_id);
            }
        }
    });
    return ant;
};

const find = (arr, forms = []) => {
    const temp = [];
    arr.forEach(e => {
        if (e.form_id) {
            forms.push(e.form_id);
        } else {
            if (e.childrens.length > 0) forms.push(...find(e.childrens));
        }
    });
    return forms;
};

export { add, get, retire, getRetiredForms, modify };