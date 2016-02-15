import {Song} from '../interfaces/Song.ts';
import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {LocalStorage} from './LocalStorage.ts';
import * as Rx from 'rxjs/Rx';
@Injectable()
export class PlaylistService {
	private _data: Song[];
	private _subscribers: any[];
	private currentSongIndex = -1;
	private $dataObservable;
	private $source;

	constructor(private localStorageService: LocalStorage) {
		this.$dataObservable = null;
		this._data = this.localStorageService.getObject('playlist_data');
		if (null == this._data) {
			this._data = [];
		}
		this.$source = this._createDataObservable();
	}

	add(song: Song) {
		var index = this._data.indexOf(song);
		if (index < 0) {
			this._data.push(song);
			this.syncWithLocalStorage();
			this.publishChanges();
		}
	}

	first(): Song {
		if (this._data.length == 0) return null;
		this.currentSongIndex = 0;
		return this._data[0];
	}

	next(): Song {
		if (this._data.length == 0) return null;
		if (this.currentSongIndex < this._data.length - 1) {
			this.currentSongIndex++;
		} else {
			this.currentSongIndex = 0;
		}
		return this._data[this.currentSongIndex];
	}

	previous(): Song {
		if (this._data.length == 0) return null;
		if (this.currentSongIndex > 0) {
			this.currentSongIndex--;
		} else {
			this.currentSongIndex = this._data.length - 1;
		}
		return this._data[this.currentSongIndex];
	}

	remove(song: Song) {
		var index = this._data.indexOf(song);
		this._data.splice(index, 1);
		this.syncWithLocalStorage();
		this.publishChanges();
	}

	setIndexBySong(song: Song) {
		var index = this._data.indexOf(song);
		if (index > -1) {
			this.currentSongIndex = index;
		}
	}

	getAll(): Observable<Array<Song>> {
		return this.$source;
	}

	private _createDataObservable() {
		return Rx.Observable.create(observer => this.$dataObservable = observer).share();
	}

	publishChanges() {
		this.$dataObservable.next(this._data);
	}

	private syncWithLocalStorage() {
		this.localStorageService.setObject('playlist_data', this._data);
	}
}