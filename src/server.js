// import express from "express";;
// import router from './routes';
// import cors from 'cors';

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());
// app.use(router);
// app.listen(port, () => {
//     console.log(`Server started on port: ${port}`);
// });

import Modify from "./utils/Modify";

const datos = [{
        id: 1,
        childrens: []
    },
    {
        id: 2,
        childrens: [{
            id: 3,
            childrens: [{
                id: 5
            }]
        }]
    },
    {
        id: 4,
        name: 'xd'
    }
];

console.log(Modify(datos, 5, { nombre: "Carlos" }));