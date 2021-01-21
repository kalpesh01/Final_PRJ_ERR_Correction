import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  productData: any = [];
  productId: any;

  constructor() { }
}
