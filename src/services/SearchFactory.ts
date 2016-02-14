import {Injectable} from 'angular2/core';
import {ISearch} from '../interfaces/ISearch.ts';
import {SoundCloudSearch} from './SoundCloudSearch.ts';

@Injectable()
export class SearchFactory {
	constructor(private soundCloudSearch: SoundCloudSearch) {

	}
	public buildSearchClient(provider) : ISearch {
		console.log(provider);
		if (provider == 1) {
			console.log(1);
			return this.soundCloudSearch;
		}
		return null;
	}
}