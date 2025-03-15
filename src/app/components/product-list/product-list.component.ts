import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  searchProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // ✅ Check if user is logged in
  }

  // ✅ View Product
  viewProduct(id: number) {
    if (!this.isLoggedIn()) {
      alert("You need to log in to edit a product!");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/product', id]);
    }
    
  }

  // ✅ Edit Product (Redirect to login if not logged in)
  editProduct(id: number) {
    if (!this.isLoggedIn()) {
      alert("You need to log in to edit a product!");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/product', id, 'edit']);
    }
  }

  // ✅ Delete Product (Redirect to login if not logged in)
  deleteProduct(id: number) {
    if (!this.isLoggedIn()) {
      alert("You need to log in to delete a product!");
      this.router.navigate(['/login']);
    } else {
      if (confirm('Are you sure you want to delete this product?')) { // ✅ Confirmation prompt
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter(product => product.id !== id); // ✅ Remove from UI
        });
      }
    }
  }
 
  
  

  // ✅ Add Product (Redirect to login if not logged in)
  addProduct() {
    if (!this.isLoggedIn()) {
      alert("You need to log in to add a product!");
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/add-product']);
    }
  }

  // ✅ Logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
