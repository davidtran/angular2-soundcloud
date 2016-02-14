import {Injectable} from 'angular2/core';
import {ISoundPlayer} from '../interfaces/ISoundPlayer.ts';
import {Song} from '../interfaces/Song.ts';
import {Events} from '../interfaces/Events.ts';
@Injectable()
/**
 * This class take responsiblity to play a song. Just it.
 */
export class SoundManagerSoundPlayer implements ISoundPlayer {
	private soundObject: any;
	private subscribers: Object = {};

	constructor() {

	}

	initialize(song: Song, callback: (e: Error, data: any) => void) {
		soundManager.stopAll();
		var soundObject = soundManager.getSoundById(song.id);
		if (!soundObject) {
			soundObject = soundManager.createSound({
				url: song.streamUrl + '?client_id=' + soundCloudClientId,
				id: song.idFromProvider,
				volume: 100,
				onbufferchange: () => this.publish(Events.BufferingStart, null),
				ondataerror: () => this.publish(Events.AudioError, null),
				onfinish: () => this.publish(Events.Finish, null),
				onload: () => this.publish(Events.BufferingStart, null),
				onpause: () => this.publish(Events.Pause, null),
				onplay: () => this.publish(Events.Play, null),
				onresume: () => this.publish(Events.PlayResume, null),
				onstop: () => this.publish(Events.Finish, null),
				whileplaying: () => this.publish(Events.Time, null),
			});

			if (!soundObject) {
				return callback(new Error('Error while create sound'), null);
			}


		}

		soundObject.play();
		this.soundObject = soundObject;
		callback(null, song);
	}

	play() {
		if (this.soundObject) {
			this.soundObject.resume();
		}
	}

	pause() {
		if (this.soundObject) {
			this.soundObject.pause();
		}
	}

	seek(time: number) {
		if (this.soundObject) {
			this.soundObject.setPosition(time);
		}
	}

	currentTime(): number {
		if (!this.soundObject) return;
		return this.soundObject.position;
	}

	setVolume(value: number) {
		if (!this.soundObject) return;
		this.soundObject.setVolume(value);
	}

	getVolume(): number {
		if (!this.soundObject) return;
		return this.soundObject.volume;
	}

	on(event, handler: () => void) {
		if (!this.subscribers[event]) this.subscribers[event] = [];
		this.subscribers[event].push(handler);
	}

	publish(event, data: any) {
		if (this.subscribers[event]) {
			this.subscribers[event].forEach(handler => {
				handler(data);
			});
		}
	}

	private subscribeSoundCloudPlayerEvent() {
		if (!this.soundObject) return;

		//Do nothing because events are declared at createSoundOption
	}
}