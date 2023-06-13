import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }


    currentPageNo: number;
    products: List_Product[];
    ngOnInit() {
        this.activatedRoute.params.subscribe(async params => {
            this.currentPageNo = parseInt(params["pageNo"] ?? 1);


            const data: { totalProductCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, 12,
                () => {

                },
                errorMessage => {

                });
            this.products = data.products;
        });
    }
}