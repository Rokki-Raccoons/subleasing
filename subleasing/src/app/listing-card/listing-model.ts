export class ListingModel {
  constructor(
    public _id: number,
    public ownerID: string,
    public address: string,
    public price: number,
    public photoRef: string,
    public startLease: string,
    public endLease: string,
    public details: string,
    public beds: number,
    public baths: number,
    public kitchens: number,
    public centralAir: boolean,
    public sqft: number,
    public favoriteStatus: boolean){}
}
