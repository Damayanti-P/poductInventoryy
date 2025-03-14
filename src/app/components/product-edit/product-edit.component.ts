import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.productId) || this.productId <= 0) {
      this.errorMessage = "Invalid Product ID";
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.productForm = this.fb.group({
          name: [product.name, Validators.required],
          description: [product.description, Validators.required],
          manufacturer: [product.manufacturer, Validators.required],
          price: [product.price, [Validators.required, Validators.min(1)]],
          quantity: [product.quantity, [Validators.required, Validators.min(0)]]
        });
      },
      error: () => {
        this.errorMessage = 'Product not found';
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = { id: this.productId, ...this.productForm.value };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        this.router.navigate(['/products']); // Redirect to product list
      });
    }
  }
}
