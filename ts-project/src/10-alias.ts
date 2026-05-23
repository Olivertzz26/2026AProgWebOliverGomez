(()=>{
 type UserID = string | boolean | number;
 let userId: UserID;

//  function greeting(userId: UserID) {
  //if (typeof userId === 'string') {
 //   console.log(`string ${userId.toLowerCase()}`);
 // }
 //}

 type Sizes = 'S' | 'M' | 'L' | 'XL';
  let shirtSize: "S" | "M" | "L" | "XL";

  shirtSize = "M"; //CORRECTO
  shirtSize = "S"; //CORRECTO
  shirtSize = "L"; //ERROR. No está en las opciones.
  shirtSize = "S"; //ERROR. Letra de más.
  shirtSize = "XL"; //ERROR. Está en minúscula.

  function greeting(userId: UserID, size: Sizes) {
  if (typeof userId === 'string') {
    console.log(`string ${userId.toLowerCase()}`);
  }
 }
  greeting(1111,'S' );
  greeting(1111,'M' );
})();