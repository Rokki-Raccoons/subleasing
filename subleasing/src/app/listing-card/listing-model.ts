export class ListingModel {
  constructor(
    public address: string,
    public photoRef: string,
    public price: number,
    public beds: number,
    public baths: number,
    public details: string,
    public listingId: number){}
}
