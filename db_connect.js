// require("mongoose").connect('mongodb://localhost:27017/crud_api')
require("mongoose").connect(process.env.DB_KEY)
    .then(() => {
        console.log('Database is Connected')
    })
    .catch((error) => {
        console.log(error)
    })

// const mongoose=require("mongoose")

// async function getConnect(){
//     try {
//         await mongoose.connect('mongodb://127.0.0.1:27017/crud_api')
//         console.log("Database is connected")
//     } catch (error) {
//         console.log(error)
//     }
// } 
// getConnect()

// const mongoose=require("mongoose")

// mongoose.connect('mongodb://localhost:27017/crud_api')
//    .then(()=>{
//       console.log('Database is connected')
//    })
//    .catch((error)=>{
//       console.log(error)
//    }) 


