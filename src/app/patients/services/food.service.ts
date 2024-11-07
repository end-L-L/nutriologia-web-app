import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private URL = new URL('https://myfitnesspal2.p.rapidapi.com/searchByKeyword?page=1&limit=5');

  constructor(private http: HttpClient) {}

  private generateURL(keyword: string): URL {
    const url = this.URL;
    url.searchParams.set('keyword', keyword);
    return url;
  }

  public getFoodsData(keyword: string) {
    if (!keyword) {
      return;
    }
    const url = this.generateURL(keyword);
    return this.http.get(url.toString(), {
      headers: {
        'x-rapidapi-key': '2ef36382c8msh0d556380ab47f9bp13f67djsnd0080d5f64e9',
        'x-rapidapi-host': 'myfitnesspal2.p.rapidapi.com',
      },
    });
  }
}
