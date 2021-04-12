export class EditModel {
 constructor(
    public address: string,
    public photoRef: string,
    public price: number,
    public beginDate: string,
    public endDate: string,
    public link: string,
    public beds: number,
    public baths: number,
    public details: string,
    public listingId: number){}
}
