import { Injectable  } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`,
    });
    return headers;
  }
}
