export class ListingModel {
  constructor(
    public listingId: number,
    public ownerId: number,
    public address: string,
    public price: number,
    public photoRef: string,
    public leaseStart: string,
    public leaseEnd: string,
    public details: string,
    public beds: number,
    public baths: number,
    public kitchens: number,
    public centralAir: boolean,
    public sqft: number,
    public favoriteStatus: boolean){}
}
