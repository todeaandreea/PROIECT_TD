export default interface Stock {
  id: null;
  typeOfHoney: string;
  quantity: number;
  harvestDate: Date;
  harvestLocation: string;
  purityLevel: string;
  producer: string;
  pricePerKilogram: number;
  expirationDate: Date;
  storageLocation: string;
  published: boolean;

  isAvailable:boolean;
}