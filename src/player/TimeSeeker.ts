import {Component} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {SoundManager} from '../services/SoundManager.ts';
import {Events} from '../interfaces/Events.ts';

@Component({
	selector: 'time-seeker',
	template: `
	<div class='time-seeker-container'>
		<div class='time-slider'></div>
		<div class='time-handler'></div>
	</div>
	`
})
export class TimeSeekerCmp {
	private currentTime: number = 0;

	constructor(private soundManager: SoundManager) {
		this.soundManager.on(Events.Time, (time) => {
			this.currentTime = time;
		});
	}

	onClickOnTimeSeeker($event) {
		//get left
		//get width
		//get click x
		//calculate percent
		var selectedTime = 0;
		this.soundManager.seek(selectedTime);
	}
}