import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';

@Component({
	selector: 'time-info',
	template: `
		<div class='time-info pull-right'>
			{{ formatTime(currentTime) }} / {{ formatTime(totalTime) }}
		</div>
	`,
	directives: [NgIf]
})
export class TimeInfoCmp {
	@Input('time') currentTime;
	@Input('total-time') totalTime;
	@Input('song') song;

	constructor() {

	}

	formatTime(time: number) {
		if (!this.song || !this.currentTime || !this.totalTime) {
			return '00:00';
		}
		time = time / 1000;
		var minutes = Math.floor(time / 60);
		var seconds = Math.floor(time - minutes * 60);
		var minStr = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
		var secStr = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
		return minStr + ':' + secStr;
	}
}