export class Order{
  constructor(public Fk_stock_id:number,public Fk_customer_id:number,public Quantity:number,public Status:string,public Order_id?:number){}
}
