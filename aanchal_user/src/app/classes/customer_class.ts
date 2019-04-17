export class customer
{
  constructor(
    public Email_id:string,
    public Password:string,
    public Name:string,
    public Customer_type:number,
    public Gender?:string,
    public Mobile_no?:string,
    public DOB?:Date,
    public Address?:String,
    public Customer_id?:number
  ){}

}
