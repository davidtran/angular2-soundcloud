import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Song} from '../interfaces/Song.ts';

@Component({
	selector: 'song-image',
	template: `
		<img class='artist-image'
					[width]="81"
					[height]="81"
					[src]='getImageUrl()'/>
	`,
	styles: [`
	.artist-image{
		border-radius: 100px;
		box-sizing:border-box;
		border: 5px solid #dedede;
		width:100%;
	}
	`],
	directives: [NgIf]
})
export class SongImageCmp {
	@Input() song: any;

	private DefaultImageUrl = "/images/artist_placeholder.png";

	getImageUrl() {
		if (this.song && this.song.imageUrl) {
			return this.song.imageUrl;
		}
		return this.DefaultImageUrl;
	}
}
