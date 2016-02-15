import {Injectable} from 'angular2/core';
import {ISearch} from '../interfaces/ISearch.ts';
import {SoundCloudSearch} from './SoundCloudSearch.ts';

@Injectable()
export class SearchFactory {
	constructor(private soundCloudSearch: SoundCloudSearch) {

	}

	public getSearchClient(provider) : ISearch {
		if (provider == 1) {
			return this.soundCloudSearch;
		}
		return null;
	}

}