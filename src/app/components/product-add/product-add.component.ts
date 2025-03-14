import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product: Product = {
    id: 0,  // ID will be generated dynamically
    name: '',
    description: '',
    manufacturer: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    if (this.product.name && this.product.description && this.product.manufacturer 
        && this.product.price > 0 && this.product.quantity >= 0) {
      
          this.product.id = Math.floor(Math.random() * 10000) + 1; // ✅ Generate unique ID based on timestamp
      
      this.productService.addProduct(this.product).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/products']); // ✅ Redirect to product list
      });

    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
