import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SkillPage } from './skillpage.model';
import { EnvService } from 'app/env.service';


@Injectable({
  providedIn:  "root"
})
export class SkillService {

  entityNode: string = 'skills';
  routeParams: any;
  item: any;
  pageItem: any;
  items: any[];
  onItemChanged: BehaviorSubject<any>;
  onPageItemChanged: BehaviorSubject<any>;
  onItemsChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   * @param {Http} http
   * @param {EnvService} _env
   */
  constructor(
    private _httpClient: HttpClient,
    private http: Http,
    private _env: EnvService
  ) {
    // Set the defaults
    this.onItemChanged = new BehaviorSubject({});
    this.onPageItemChanged = new BehaviorSubject({});
    this.onItemsChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getInit()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });

    
  }
 
/**
   * Get item
   *
   * @returns {Promise<any>}
   */
  getInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log(this.routeParams.id);
      if (this.routeParams.id === undefined) {

          this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode)
            .subscribe((response: any) => {
              this.pageItem = new SkillPage(response);
              this.onPageItemChanged.next(this.pageItem);
              resolve(response);
            }, reject);

        // this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode)
        // .subscribe((response: any) => {
        //   this.items = response;
        //   this.onItemsChanged.next(this.items);
        //   resolve(response);
        // }, reject);
      }
      else if (this.routeParams.id === 'new') {
        this.onItemChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode + '/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.item = response;
            this.onItemChanged.next(this.item);
            resolve(response);
          }, reject);
      }
    });
  }


  /**
   * Get item
   *
   * @returns {Promise<any>}
   */
  getItem(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onItemChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode +'/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.item = response;
            this.onItemChanged.next(this.item);
            resolve(response);
          }, reject);
      }
    });
  }

  
  /**
   * Save product
   *
   * @param item
   * @returns {Promise<any>}
   */
  saveItem(item): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(this._env.appserviceUrl + '/' + this.entityNode , item)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Add product
   *
   * @param item
   * @returns {Promise<any>}
   */
  addItem(item): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this._env.appserviceUrl + '/' + this.entityNode , item)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
   /**
   * Add product
   *
   * @param ListItem
   * @returns {Promise<any>}
   */
  addListItem(Listitem): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(this._env.appserviceUrl + '/' + this.entityNode + '/saveall' , Listitem)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Get items
   *
   * @returns {Promise<any>}
   */
  getItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode)
        .subscribe((response: any) => {
          this.items = response;
          this.onItemsChanged.next(this.items);
          resolve(response);
        }, reject);
    });
  }

  /**
   * Get items
   *
   * @returns {Promise<any>}
   */
  getPageItem(page:number,size:number): Promise<any> {
    // ?page=0&size=20
    return new Promise((resolve, reject) => {
      this._httpClient.get(this._env.appserviceUrl + '/' + this.entityNode+'?page='+page+'&size='+size)
      .subscribe((response: any) => {
        this.pageItem = new SkillPage(response);
        this.onPageItemChanged.next(this.pageItem);
        resolve(response);
      }, reject);
    });
  }
  
  deleteItemById(itemId: number): any {
    return  this._httpClient.delete(this._env.appserviceUrl + '/' + this.entityNode +'/' + itemId);

  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}