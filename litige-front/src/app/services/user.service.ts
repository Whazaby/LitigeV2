import { environment } from 'src/environments/environment';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { url } from './url';
import { Page } from '../models/page';

export class UserServiceFilter {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private crudService: CrudService) {
    console.log('init userservice');
    // super(User, http, config.config.serverUrl + 'users', config.config.serverUrl + 'users/search');
    // this.signinUrl = config.config.signinUrl;
  }

  // prepareData(item: User): Object {
  //   return item;
  // }
  // applyFilter(url: string, filter: UserServiceFilter, params: HttpParams): { url: string; params: HttpParams; } {
  //   if (filter && filter.email) {
  //     url = this.searchUrl;
  //     params = params.set('email', filter.email);
  //   }
  //   return { url, params };
  // }

  delete(i: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  all(): Observable<Page<User>> {
    return this.crudService.get(url.users);
  }

  findByEmail(email: string): Observable<User> {
    const params = new HttpParams().set('email', email);

    return this.crudService.get(url.users + '/findByEmail', params);
  }

  changePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Observable<boolean> {
    console.log(`change password ${id} ${oldPassword} ${newPassword}`);
    return (
      this.crudService
        .put<boolean>(
          url.users + `/${id}/changePassword`,
          new HttpParams()
            .set('id', String(id))
            .set('oldPassword', oldPassword)
            .set('newPassword', newPassword)
        )
        // return this.http
        //   .put<void>(
        //     this.collectionUrl + `/${id}/changePassword`,
        //     new HttpParams()
        //       .set('id', String(id))
        //       .set('oldPassword', oldPassword)
        //       .set('newPassword', newPassword)
        .pipe(map(() => true))
    );
  }

  signin(email: string, password: string): Observable<User> {
    console.log(`signin ${email} ${password}`);
    return this.crudService.post<User>(
      environment.signinUrl,
      new HttpParams().set('email', email).set('password', password)
    );
  }

  validateEmail(email: string): Observable<boolean> {
    console.log(`validateEmail ${email}`);
    return this.crudService.post<boolean>(
      environment.signinUrl + '/validateEmail',
      new HttpParams().set('email', email)
    );
  }

  update(user: User): Observable<boolean> {
    return this.crudService
      .putObjet<User, boolean>(url.users + '/' + user.id, user)
      .pipe(
        map(res => {
          console.log(`updated ${user.constructor.name} ${user.id}`);
          return true;
        })
      );
  }

  // prepareData(item: User): Object {
  //   return item;
  // }
  // update(model: T): Observable<boolean> {
  //   const url = this.collectionUrl + '/' + model.id;
  //   const data = this.prepareData(model);
  //   return this.http.put(url, data).pipe(
  //     map(res => {
  //       console.log(`updated ${model.constructor.name} ${model.id}`);
  //       return true;
  //     })
  //   );
  // }
}