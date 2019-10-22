import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FavoritesComponent } from '../favorites/favorites.component';
import { AboutComponent } from '../about/about.component';
import { RecipeComponent } from '../recipe/recipe.component';
import { CategoriesComponent } from '../categories/categories.component';
import { Feed } from '../shared/modal/feed';
declare var xml2json: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public feeds: Feed;
  favorites = FavoritesComponent;
  recipes = RecipeComponent;
  categories = CategoriesComponent;
  more = AboutComponent;
  constructor(private _http: HttpClient) { this.loadFeeds(); }
  ngOnInit() { }


  loadFeeds() {
    this._http.get('https://cors-anywhere.herokuapp.com/https://ramyarecipesblog.wordpress.com/feed/',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data: string) => {
        //data = data.replace('/media:thumbnail/g','mediathumbnail');
        this.feeds = JSON.parse(xml2json(data, '  '));
        this.feeds.rss.channel.item.forEach(i=>{
          i.mediathumbnail = i["media:thumbnail"];
        });
        console.log(this.feeds.rss.channel.item);
      });
  }

}
