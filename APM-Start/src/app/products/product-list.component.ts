import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { Subscribable, Subscription } from "rxjs";


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private _productService: ProductService) { }


  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredProduct = this.performFilter(value);
  }

  filteredProduct: IProduct[] = [];

  products: IProduct[] = [];

  ngOnInit(): void {
    this.sub = this._productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProduct = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }
  public toggleImage(): void {
    this.showImage = !this.showImage;
  }

  public onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
