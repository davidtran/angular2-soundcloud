import {Component, Input} from "angular2/core";
//import {Song} from './interfaces/Song.ts';
import {Events} from '../interfaces/Events.ts';
import {SoundManager} from '../services/SoundManager.ts';
import {PlaylistService} from '../services/PlaylistService.ts';
import {NgIf} from 'angular2/common';

@Component({
	selector: 'controls',
	template:`
		<a href='#' id="btnPrevious" title="" (click)='previous()'>
				<img src='/images/prev.png'/>
		</a>
		<a href='#' id="btnPlayPause" (click)='togglePlayPause()'>
				<img src='/images/play.png' [class.hide]='isPlaying'/>
				<img src='/images/pause.png' [class.hide]='!isPlaying'/>
		</a>
		<a href='#' id="btnNextSong" (click)='next()'>
				<img src='/images/next.png'/>
		</a>
	`,
	styles: [
		`#btnPrevious{
				margin-right: 2px;
		}
		#btnPrevious img {
				width:30px;
				height:30px;
				margin-top:4px;
		}

		#btnPlayPause{
				box-sizing: border-box;
				margin-right: 2px;
		}

		#btnPlayPause img{
				width:40px;
				height:40px;
		}

		#btnNextSong{
				position: relative;
				box-sizing: border-box;
		}

		#btnNextSong img{
				margin-top: 4px;
				width: 30px;
				height: 30px;
		}
`
	]
	directives: [NgIf]
})
export class ControlsCmp {
	@Input("is-playing") isPlaying: boolean;
	@Input() song: any;

	constructor(private soundManager: SoundManager) {

	}

	togglePlayPause() {
		this.soundManager.togglePlayPause();
	}

	next() {
		this.soundManager.next();
	}

	previous() {
		this.soundManager.previous();
	}
}