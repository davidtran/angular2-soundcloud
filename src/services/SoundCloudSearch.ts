import {Injectable} from 'angular2/core';
import {Song} from '../interfaces/Song.ts';
import {ISearch} from '../interfaces/ISearch.ts';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class SoundCloudSearch implements ISearch {

	private clientId: string = '8e1349e63dfd43dc67a63e0de3befc68';
	private http: Http;

	constructor(http: Http) {
		this.http = http;
		console.log(this.http);
	}

	search(keyword: string): Song[] {
		var uri = this.makeSearchUri(keyword);

		return this.http.get(uri)
										.map(res => this.handleResponse(res))
										.catch(this.handleError);
	}

	handleResponse(res: any): any{
		var data = res.json();
		var result = [];
		if (data && data.collection) {
			data.collection.forEach(function(item) {
				var song: Song = <Song>{};
				song.streamUrl = item.stream_url;
				song.name = item.title;
				song.artist = item.user.username;
				song.provider = 1;
				song.idFromProvider = item.id;
				song.duration = item.duration;
				song.imageUrl = item.artwork_url;
				song.link = item.permalink_url;
				result.push(song);
			});
		}
		return result;
	}

	handleError(e: Response) {
		console.log(e);
	}

	makeSearchUri(keyword: string) : string {
		return 'http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=' + this.clientId + '&q=' + keyword;
	}

}