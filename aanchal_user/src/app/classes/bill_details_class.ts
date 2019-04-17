export class bill_details{
  constructor(

    public Fk_bill_id:number,
    public Fk_customer_id:number,
    public Fk_stock_id:number,
    public Quantity:number,
    public Amount:number,

      ){ }
};
