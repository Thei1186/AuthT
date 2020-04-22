import {Injectable} from '@angular/core';
import {Product} from './product';
import {Observable, of, pipe} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Observable<Product[]>;

  constructor(private afs: AngularFirestore,
              private router: Router) {
    this.products = this.afs.collection<Product>('products')
      .snapshotChanges()
      .pipe(
        map(productAndMeta => {
            return productAndMeta.map(p => {
              const data = p.payload.doc.data() as Product;
              data.uId = p.payload.doc.id;
              return data;
            });
          }
        ));
  }

  createProduct(product: Product) {
    return new Promise<Product>((resolve, reject) => {
      this.afs.collection('products').add(product).then(res => {}, err => reject(err));
    });
  }

  updateProduct(product: Product) {
    const data = {
      name: product.name,
      price: product.price,
      stock: product.stock
    };
    return new Promise<Product>(() => {
      this.afs.collection<Product>('products')
        .doc(product.uId).set(data).then(() => {
        console.log('Update successful');
        this.router.navigateByUrl('products');
      }).catch(e => {
        console.log( 'Update failed, error: ' + e);
      });
    });
  }

  getProducts(): Observable<Product[]> {
    return this.afs.collection<Product>('products')
      .snapshotChanges().pipe(
        map( docStuff => {
          const newArray: Product[] = [];
          docStuff.forEach(doc => {
            const prod = doc.payload.doc.data();
            newArray.push({
              uId: doc.payload.doc.id,
              name: prod.name,
              price: prod.price,
              stock: prod.stock
            });
          });
          return newArray;
        })
      );
  }

  getProduct(productId: string): Observable<Product> {
    return this.afs.collection('products').doc<Product>(productId)
      .snapshotChanges()
      .pipe(
        map(productMeta => {
          const data = productMeta.payload.data();
          const fetchedProduct: Product = {
            uId: productMeta.payload.id,
            name: data.name,
            price: data.price,
            stock: data.stock
          };
          return fetchedProduct;
        }));
  }

  deleteProduct(uid: string) {
    return new Promise<Product>(() => {
      this.afs.collection('products').doc(uid).delete().then(() => {
        console.log('The product with id: ' + uid + ' was successfully deleted');
      }).catch(e => {
        console.log('Failed to delete the product with id: ' + uid);
        console.log('Received error: ' + e);
      });
    });
  }
}
