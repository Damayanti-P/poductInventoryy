import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    console.log("Requested Product ID:", productId);  // ✅ Debugging

    if (isNaN(productId) || productId <= 0) {
      this.errorMessage = "Invalid Product ID";
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        console.log("API Response:", product);  // ✅ Debugging
        this.product = product;
      },
      error: (err) => {
        console.error("Error fetching product:", err);  // ✅ Debugging
        this.errorMessage = 'Product not found';
      }
    });
  }
}
