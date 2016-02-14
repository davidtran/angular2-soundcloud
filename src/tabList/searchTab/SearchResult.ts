import {Component, Input} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {PlaylistService} from '../../services/PlaylistService.ts';
import {Song} from '../../interfaces/Song.ts';
import {SongItemCmp} from '../SongItem.ts';

@Component({
	selector: 'search-result',
	template: `

	<div class="tab-pane" id="searchResult">
		<div class="search media-list" data-type="search">
			<song-item *ngFor="#song of result" [song]="song" [show-add]="true" [show-play]="true"></song-item>
		</div>

		<div id='search-help' *ngIf='result == null || result.length == 0'>
			<img src='/images/arrow.jpg'/>
			<p>Search your music on SoundCloud</p>
		</div>

	</div>
	`,
	styles: [`
	#searchResult{
		margin: 0 5px 0 7px;
	}

	#search-help{
			opacity: 0.8
	}
	#search-help img{
			margin-left:40px;
			margin-bottom: 15px;
	}

	#search-help p{
			text-align: center;
	}
	`],
	directives: [NgFor, SongItemCmp]
})
export class SearchResultCmp {

	@Input() result: Song[];

	private showAdd: boolean = true;

	private playlistService: PlaylistService;

	constructor(playlistService: PlaylistService) {
		this.playlistService = playlistService;
	}

}