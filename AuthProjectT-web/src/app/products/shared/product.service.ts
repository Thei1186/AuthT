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
    return of(this.afs.collection<Product>('products').doc().set(product).then( () => {
      console.log('Successfully created product ' + product.name);
      this.router.navigateByUrl('products');
    }).catch(e => {
      console.log('Something went wrong' + e);
    }));
  }

  updateProduct(product: Product) {
    const data = {
      name: product.name,
      price: product.price,
      stock: product.stock
    };
    return this.afs.collection<Product>('products')
      .doc(product.uId).set(data).then(() => {
        console.log('Update successful');
        this.router.navigateByUrl('products');
      }).catch(e => {
        console.log( 'Update failed, error: ' + e);
      });
  }

  getProducts() {
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

  getProduct(productId: string) {
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
    this.afs.collection('products').doc(uid).delete().then(() => {
      console.log('The product with id: ' + uid + ' was successfully deleted');
    }).catch(e => {
      console.log('Failed to delete the product with id: ' + uid);
      console.log('Received error: ' + e);
    });
  }
}