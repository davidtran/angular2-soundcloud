import {Component, Input} from "angular2/core";
import {NgIf} from "angular2/common";
import {PlaylistService} from "../services/PlaylistService.ts";
import {Song} from "../interfaces/Song.ts";
import {SoundManager} from "../services/SoundManager.ts";

@Component({
	selector: 'song-item',
	template: `
	<div class="row song-item">
		<div class="col-xs-3 song-list-avatar-column">
			<img class="playlist-item-image"
					[src]="getSongImage(song)"
					[width]="35"
					(click)='play(song)'
					title="Play"/>
		</div>

		<div class="col-xs-6 song-list-information-column">
				<div class="playlist-item-title"
						(click)='play(song)'
						title="Play">{{song.name}}</div>
				<div class="playlist-item-artist">
						{{song.artist}}
				</div>
		</div>

		<div class="col-xs-3 playlist-item-control-group">
			<div class="row">
				<div class="col-xs-12">

					<a href="#"
							title="Play"
							class="song-list-button"
							(click)='play(song)'
							*ngIf='showPlay'
							>
							<i class="glyphicon icon-play"></i></a>

					<a href="#"
							title=""
							class="song-list-button"
							(click)='addSongToPlaylist(song)'
							*ngIf='showAdd'>
							<i class="glyphicon icon-add"></i></a>

					<a href="#"
							title="Xóa khỏi playlist"
							class="song-list-button"
							(click)='delete(song)'
							*ngIf='showDelete'>
							<i class="glyphicon icon-remove"></i></a>

				</div>
			</div>

			<i class="glyphicon icon-sound playing-song-icon" *ngIf='playingSong != null && song.id == playingSong.id'></i>
		</div>
	</div>

	`,
	styles: [`
		.song-item{
				border-top:1px solid #cfcfcf;
				padding: 7px 12px 7px 0px;
				overflow: hidden;
		}

		.song-item:hover,
		.musicchart > .media:hover, .song-item.active{
				background-color: #EBEBEB;
		}

		.song-item:first-child{
				border-top:none;
		}

		.song-list-information-column {
				padding-left: 5px;
				padding-right: 5px;
		}

		.playlist-item-control-group{
				padding-left: 5px;
				padding-right: 5px;
		}

		.playlist-item-control-group i{
				color: #8D8D8D;
				font-size: 16px;
		}

		.playlist-item-control-group i:hover{
			color: #a18d93;
		}

		.icon-play {
				background-image: url(/images/icon-play.png);
				background-size: 20px;
				width: 20px;
				height: 20px;
		}

		.icon-share {
				background-image: url(/images/icon-share.png);
				background-size: 20px;
				width: 20px;
				height: 20px;
		}

		.icon-sound {
				background-image: url(/images/sound_click.png);
				background-size: 20px;
				width: 20px;
				height: 15px;
		}

		.icon-remove {
				background-image: url(/images/remove.png);
				background-size: 20px;
				width: 20px;
				height: 20px;
		}
		.icon-add {
			background-image: url(/images/icon-add.png);
			background-size: 20px;
			width: 20px;
			height: 20px;
		}

		.playlist-item-image{
			width: 60px;
			cursor: pointer;
			border-radius: 5px;
		}
		`],
	directives: [NgIf]
})
export class SongItemCmp
{
	@Input('playing-song') playingSong = null;

	@Input() song;

	@Input("show-add") showAdd: boolean;

	@Input("show-delete") showDelete: boolean;

	@Input("show-play") showPlay: boolean;

	constructor(private playlistService: PlaylistService,
							private soundManager: SoundManager) {

	}

	addSongToPlaylist(song: Song) {
		this.playlistService.add(song);
	}

	play(song: Song) {
		this.soundManager.play(song);
	}

	delete(song) {
		this.playlistService.remove(song);
	}

	getSongImage(song: Song) {
		if (song.imageUrl != null) {
			return song.imageUrl;
		}
		return '/images/artist_placeholder.png';
	}

}