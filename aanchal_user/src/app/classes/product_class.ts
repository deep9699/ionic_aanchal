export class product{
    constructor(
      public Product_name:string,
      public Product_desc:string,
      public Fk_category_id:number,
      public Product_price:number,
      public Product_image:string,
      public Product_id?:number
    ){}
  };
  