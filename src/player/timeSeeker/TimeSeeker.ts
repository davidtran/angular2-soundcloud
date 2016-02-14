import {Component, ElementRef, OnInit, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {SoundManager} from '../../services/SoundManager.ts';
import {Events} from '../../interfaces/Events.ts';

@Component({
	selector: 'time-seeker',
	template: `
		<div id="timeSlider" (click)='changePlaybackTime($event)'>
				<span id='sliderHandler' tabindex="0" [style.left]="calculatePositionByTime()" [style.top]="sliderHandlerPositionY"></span>
		</div>
	`,
	styles: [`
		#sliderHandler {
			position: absolute;
		}

		#timeSlider{
			position: relative;
		}

		#timeSlider{
			position: relative;
			height:8px;
			background-color:#cfcfcf;
			background-image:none;
			border:none;
			width: 307px;
			float: right;
			border-radius: 4px;
			cursor: pointer !important;
		}

		#sliderHandler{
			position: absolute;
			border-radius: 100px;
			background-image: none !important;
			background-color: #fff !important;
			border:1px solid #ff8b00 !important;
			top:-4px !important;
			width:15px !important;
			height:15px !important;
			box-sizing: border-box;
		}
	`]
})
export class TimeSeekerCmp implements OnInit {
	@Input() time: number;
	@Input('total-time') duration: number;

	constructor(private soundManager: SoundManager,
							private element: ElementRef) {

	}

	calculatePositionByTime() {
		var percent = this.time * 100 / this.duration;
		var pos = percent * this.getTimeSliderWidth() / 100;
		return pos;
	}

	ngOnInit() {
		var offset = this.element.nativeElement.getBoundingClientRect();
		var width = this.element.nativeElement.style.width;
		var height = this.element.nativeElement.style.height;
	}


	changePlaybackTime($event) {
		var time = this.calculateTimePercentOnClick($event);
		this.soundManager.seek(time);
	}

	private calculateTimePercentOnClick($event) {
		var parentX = this.getTimeSliderWidth();
		var percent = $event.x * 100 / parentX;
		return percent;
	}

	private getTimeSliderWidth() {
		return parseInt(this.element.nativeElement.children[0].clientWidth);
	}
}