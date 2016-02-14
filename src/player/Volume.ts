import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {SoundManager} from '../services/SoundManager.ts';
import {Events} from '../interfaces/Events.ts';

@Component({
	selector: 'volume',
	template: `
		<a id="btnToggleVolume" href='#' (click)='toggleMute()'>
			<img src='/images/sound.png' [class.hide]='isMute'/>
			<img src='/images/mute.png' [class.hide]='!isMute'/>
		</a>
	`,
	styles: [`

		#btnToggleVolume {
				width:20px;
		}
		#btnToggleVolume img{
				width:20px;
				padding-top:15px;
		}

		#btnToggleVolume i{
				margin-top:13px;
				color:#c7b4ab;
		}
	`],
	directives:[NgIf]
})
export class VolumeCmp {

	private isMute = false;

	constructor(private soundManager: SoundManager) {
		this.soundManager.on(Events.Volume, (isMute) => {
			this.isMute = isMute;
		});
	}

	toggleMute() {
		this.soundManager.toggleMute();
	}

}