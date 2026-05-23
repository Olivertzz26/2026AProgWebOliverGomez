(() => {
  type Sizes = 'S' | 'M' | 'L' | 'XL';
  type product={
    title:string,
    createdAt:Date,
    stock:number;
    size?:Sizes
  };

  const products:any[]=[];

  const addProduct=(data:product) =>{
    products.push(data);
  }

  addProduct({
    title:"Pro1",
    createdAt:new Date(1993,1,1),
    stock:12
  });
  console.log(products);

  addProduct({
    title:"Pro2",
    createdAt:new Date(1993,1,1),
    stock:12,
    size:"XL"
  });
  console.log(products);
  products.push({
    title:"Prod3",
    createdAt:new Date(1992,1,1),
    stock:12,
    size:"XL"
  })

})();