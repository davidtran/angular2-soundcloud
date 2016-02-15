import {Component, EventEmitter, Output, OnInit} from 'angular2/core';
import {SearchFactory} from '../../services/SearchFactory.ts';
import {ISearch} from '../../interfaces/ISearch.ts';
import {NgFormControl, Control} from 'angular2/common';

@Component({
	selector: 'search-box',
	template: `
	<div class="row" id="searchbox" >
		<div class="col-xs-12">
			<form role="form">
				<div class="form-group" >
					<input type="text"
									ng-model='query'
									class="form-control"
									id="form-field-search"
									[ngFormControl]="keyword"
									>
					<span class="icon-search"></span>
				</div>
			</form>
		</div>
	</div>
	`,
	styles: [`
	#searchbox {
		padding: 10px 10px 0 6px;
	}

	span.icon-search{
		background-image: url(/images/icon-search.png);
		background-size: 17px;
		position: absolute;
		width: 17px;
		height: 16px;
		top: 8px;
		left: 21px;
	}

	button.search,
	input#form-field-search{
		border-radius: 5px;
		border: 1px solid #ccc;
		color: #363636;
		box-shadow: none;
		padding: 6px 30px;
		height: 32px;
	}

	button.search{
		background: #ffc803;
	}
	`],
	providers: [
		SearchFactory
	],
	directives: [NgFormControl]
})
export class SearchBoxCmp implements OnInit {
	@Output() searchResult = new EventEmitter();

	private searchFactory: SearchFactory;
	private searchClient: ISearch;
	private keyword = new Control();

	constructor(searchFactory: SearchFactory) {
		this.searchFactory = searchFactory;
		this.searchClient = this.searchFactory.getSearchClient(1);

		this.keyword
					.valueChanges
					.debounceTime(400)
					.distinctUntilChanged()
					.flatMap(keywordStr => this.searchClient.search(keywordStr.toString()))
					.subscribe(data => {
						this.searchResult.emit(data);
					});
	}

	ngOnInit() {

	}

	search(keyword: string) {
		this.searchClient
				.search(keyword)
				.subscribe(data => {
					this.searchResult.emit(data);
				});
	}

	onInputKeyword($event: any) {
		if ($event.keyCode == 13) {
			return this.search($event.target.value);
		}
	}
}