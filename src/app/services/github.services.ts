import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly cache: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(private httpClient: HttpClient) { }

  public getProfile(searchQuery: string): Observable<any> {
    const dataURL = `https://api.github.com/users/${searchQuery}`;
    return this.getCachedData(dataURL).pipe(
      catchError(this.handleErrors)
    );
  }

  public getRepos(searchQuery: string, page: number, pageSize: number): Observable<any[]> {
    const dataURL = `https://api.github.com/users/${searchQuery}/repos`;
    const cacheKey = `${dataURL}?page=${page}&per_page=${pageSize}`;
    return this.getCachedData(cacheKey).pipe(
      catchError(this.handleErrors),
      map((response: any[]) => response.slice(0, pageSize)) // Limit to pageSize
    );
  }

  private getCachedData(url: string): Observable<any> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    } else {
      const request = this.httpClient.get(url).pipe(
        shareReplay(1) // Cache response for subsequent subscribers
      );
      this.cache.set(url, request);
      return request;
    }
  }

  public handleErrors(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `MESSAGE : ${error.error.message}`;
    } else {
      errorMessage = `STATUS : ${error.status} MESSAGE : ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
