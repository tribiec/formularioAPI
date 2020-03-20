import { MongoClient } from "mongodb";

class Database {

    constructor() {
        const url = "mongodb://localhost:27017";
        const dbName = "formularioApp";
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        try {
            this.client.connect();
            this.db = this.client.db(dbName);
            console.log("Connected to DB");
        } catch (err) {
            console.log("Error Connecting to DB");
        }
    }

    async install(_collection) {
        let collection = this.db.collection(_collection);
        const menu = [{
                id: 1,
                type: 1,
                name: "Comida",
                childrens: [{
                        id: 2,
                        type: 1,
                        name: "Italiana",
                        childrens: [{
                            id: 3,
                            type: 1,
                            name: "Pizzas",
                            childrens: [{
                                    id: 4,
                                    type: 1,
                                    name: "Con Vegetales",
                                    childrens: [{
                                            id: 5,
                                            type: 2,
                                            name: "Champiñones"
                                        },
                                        {
                                            id: 7,
                                            type: 2,
                                            name: "Cebolla y Espinaca"
                                        }
                                    ]
                                },
                                {
                                    id: 6,
                                    type: 1,
                                    name: "Sin Vegetales",
                                    childrens: [{
                                            id: 8,
                                            type: 2,
                                            name: "Carne y Jamon"
                                        },
                                        {
                                            id: 9,
                                            type: 2,
                                            name: "Pollo y Tocineta"
                                        }
                                    ]
                                },
                            ]
                        }]
                    },
                    {
                        id: 50,
                        type: 1,
                        name: "China",
                        childrens: [{
                                id: 51,
                                type: 2,
                                name: "Arroz Chino"
                            },
                            {
                                id: 52,
                                type: 2,
                                name: "Chop Suey"
                            }
                        ]
                    }
                ]
            },
            {
                id: 20,
                type: 2,
                name: "Validaciones Comunes"
            },
            {
                id: 30,
                type: 1,
                name: "Formularios de Pago",
                childrens: [{
                        id: 31,
                        type: 2,
                        name: "Tarjeta de Credito"
                    },
                    {
                        id: 32,
                        type: 2,
                        name: "Cheque"
                    },
                    {
                        id: 33,
                        type: 2,
                        name: "Pago Movil"
                    }
                ]
            }
        ];
        return new Promise((resolve, reject) => {
            collection.insertOne(menu, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async query(params, _collection) {
        let collection = this.db.collection(_collection);
        return new Promise((resolve, reject) => {
            collection.find(params).toArray((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    async insert(data, _collection) {
        let collection = this.db.collection(_collection);
        return new Promise((resolve, reject) => {
            collection.insertOne(data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async update(where, data, _collection) {
        let collection = this.db.collection(_collection);
        collection.updateOne(where, data, (err, result) => {
            if (err) {
                console.log("Error");
            } else {
                console.log("Ok");
            }
        })
    }

    async drop(_collection) {
        let collection = this.db.collection(_collection);
        return new Promise((resolve, reject) => {
            collection.drop().then(e => resolve(e)).catch(err => reject(err));
        })
    }
}
export default Database;