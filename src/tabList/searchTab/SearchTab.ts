import {Component} from 'angular2/core';
import {Song} from '../../interfaces/Song.ts';
import {SearchBoxCmp} from './SearchBox.ts';
import {SearchResultCmp} from './SearchResult.ts';


@Component({
	selector: 'search-tab',
	template: `
	<div class="search-tab">
		<search-box (searchResult)="onReceiveSearchResult($event)"></search-box>
		<search-result [result]="_searchResult"></search-result>
	`,
	styles: [`
		.search-tab {
			max-height: 400px;
			overflow-y: scroll;
			overflow-x: hidden;
			min-height: 400px;
		}
	`],
  directives: [SearchBoxCmp, SearchResultCmp]
})
export class SearchTabCmp {

	public _searchResult: Song[] = [];

	constructor() {
	}

	onReceiveSearchResult(data) {
		this._searchResult = data;
	}
}