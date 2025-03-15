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
    public router: Router // ✅ Make sure router is properly injected
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? Number(idParam) : 0;

    if (!this.productId || isNaN(this.productId)) {
      this.errorMessage = "Invalid Product ID";
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        if (product) {
          this.productForm = this.fb.group({
            name: [product.name, Validators.required],
            description: [product.description, Validators.required],
            manufacturer: [product.manufacturer, Validators.required],
            price: [product.price, [Validators.required, Validators.min(1)]],
            quantity: [product.quantity, [Validators.required, Validators.min(0)]]
          });
        } else {
          this.errorMessage = 'Product not found';
        }
      },
      error: () => {
        this.errorMessage = 'Error fetching product details';
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = { id: this.productId, ...this.productForm.value };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Failed to update product';
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/products']); // ✅ Public method to navigate
  }
}
