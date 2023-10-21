async function checkExistence(model,name) {
   return await model
     .findOne({ name })
     .then((data) => {
       if (data) {
         return data;
       } else {
         return false;
       }
     })
     .catch((err) => {
       return err;
     });
 }

 module.exports = checkExistence;