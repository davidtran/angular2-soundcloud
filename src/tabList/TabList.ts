import {Component} from 'angular2/core';
import {SearchTabCmp} from './searchTab/SearchTab.ts';
import {PlaylistCmp} from './Playlist.ts';
import {PlaylistService} from '../services/PlaylistService.ts';

@Component({
	selector: 'tablist',
	template: `
	<section class='tab-content'>
		<div class="container-fluid">
			<div class="row">
				<ul class="tab-navigation nav nav-tabs" role="tablist">

					<li class="text-center" [class.active]="isShowSearchTab">
						<a data-toggle="tab" id='search-tab-link' (click)="showSearchList()">Search</a>
					</li>

					<li class="text-center" [class.active]="isShowPlaylist">
						<a data-toggle="tab" (click)="showPlaylist()">Playlist</a>
					</li>
				</ul>

				<div class="tab-content">
					<search-tab [class.hide]="!isShowSearchTab"></search-tab>
					<playlist [class.hide]="!isShowPlaylist"></playlist>
				</div>

			</div>
		</div>
	</section>
	`,
	directives: [SearchTabCmp, PlaylistCmp],
	styles: [`
	.tab-content{
			min-height: 300px;
	}
	.tab-content .col-xs-12{
			padding-right: 11px;
			padding-left: 11px;
	}
	.nav-tabs>li{
			width: 50%;
			box-sizing:border-box;
			font-size: 12px;
	}
	.nav-tabs {
			border: 1px solid #ff8b00;
			border-radius: 5px;
			margin: 0 5px;
	}

	.nav-tabs a{
			color:#ff8b00;
	}
	.nav-tabs li > a:hover,
	.nav-tabs li.active > a:hover{
			background: #ff8b00;
			color: #363636;
	}
	.nav-tabs li.active > a{
			background: #ff8b00;
			color: #363636;
	}
	.nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus{
			border-bottom: 1px solid #ff8b00;
			border-top: none;
			border-left: none;
			border-right: none;
			background-color: #ff8b00;
	}
	.nav-tabs li > a{
			border-radius: 0;
			border: 0;
			margin: 0;
			background: #fff;
	}
	.nav-tabs li:first-child > a{
			border-radius: 5px 0 0 5px;
	}
	.nav-tabs li:last-child > a{
			border-radius: 0 5px 5px 0;
	}
	.nav-tabs>li+li > a,
	.nav-tabs>li+li > a:hover{
			border-left: 1px solid #ff8b00;
	}
	a:hover{
			color: #613203;
	}
	a{
			color: #000;
	}
	.nav-pills>li{
			width: 32.3%;
			font-size: 13px;
			box-sizing: border-box;
	}
	`]
})
export class TabListCmp {
	isShowSearchTab = false;
	isShowPlaylist = false;

	constructor(private playlistService: PlaylistService) {
		this.showSearchList();
	}

	showPlaylist() {
		this.isShowPlaylist = true;
		this.isShowSearchTab = false;
	}

	showSearchList() {
		this.isShowPlaylist = false;
		this.isShowSearchTab = true;
	}
}