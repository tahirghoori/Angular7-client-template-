import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  

  routeParams: any;
  skill: any;
  skills: any[];
  onSkillChanged: BehaviorSubject<any>;
  onSkillsChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient,
    private http: Http,
  ) {
    // Set the defaults
    this.onSkillChanged = new BehaviorSubject({});
    this.onSkillsChanged = new BehaviorSubject({});
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
   * Get skill
   *
   * @returns {Promise<any>}
   */
  getInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log(this.routeParams.id);
      if (this.routeParams.id === undefined) {
        this._httpClient.get('http://localhost:3000/skills')
        .subscribe((response: any) => {
          this.skills = response;
          this.onSkillsChanged.next(this.skills);
          resolve(response);
        }, reject);
      }
      else if (this.routeParams.id === 'new') {
        this.onSkillChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get('http://localhost:3000/skills/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.skill = response;
            this.onSkillChanged.next(this.skill);
            resolve(response);
          }, reject);
      }
    });
  }


  /**
   * Get skill
   *
   * @returns {Promise<any>}
   */
  getSkill(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.routeParams.id === 'new') {
        this.onSkillChanged.next(false);
        resolve(false);
      }
      else {
        this._httpClient.get(API_URL + '/api/license/skills/skill' + this.routeParams.id)
          .subscribe((response: any) => {
            this.skill = response;
            this.onSkillChanged.next(this.skill);
            resolve(response);
          }, reject);
      }
    });
  }

  
  /**
   * Save product
   *
   * @param skill
   * @returns {Promise<any>}
   */
  saveSkill(skill): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.put('http://localhost:3000/skills/' + skill.id, skill)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Add product
   *
   * @param skill
   * @returns {Promise<any>}
   */
  addSkill(skill): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('http://localhost:3000/skills', skill)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }


  /**
   * Get skills
   *
   * @returns {Promise<any>}
   */
  getSkills(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('http://localhost:3000/skills')
        .subscribe((response: any) => {
          this.skills = response;
          this.onSkillsChanged.next(this.skills);
          resolve(response);
        }, reject);
    });
  }

  deleteSkillById(skillId: number): any {
    return  this._httpClient.delete('http://localhost:3000/skills' + skillId);

  }

}