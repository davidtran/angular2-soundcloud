import {Injectable} from 'angular2/core';
import {ISoundPlayer} from '../interfaces/ISoundPlayer.ts';
import {Song} from '../interfaces/Song.ts';
import {PlayerEvents} from "../interfaces/PlayerEvents.ts";
import {Events} from "../interfaces/Events.ts";
@Injectable()
export class SoundCloudPlayer implements ISoundPlayer {

	private song: Song;
	private isPlaying: boolean;
	private scPlayer: any;
	private subscribers = {};

	constructor() {

	}

	initialize(song: Song, callback: (e: Error) => void) {
		this.song = song;
		try {
			if (typeof(this.scPlayer) == 'object') this.scPlayer.pause();
			this.scPlayer = null;
			SC.stream('/tracks/' + this.song.idFromProvider.toString())
				.then((player) => {
					this.scPlayer = player;
					this.subscribers = {};
					callback(null);
				});
		}
		catch (e) {
			callback(e);
		}

	}

	play() {
		this.scPlayer.play();
		this.isPlaying = true;
	}

	pause() {
		this.scPlayer.pause();
		this.isPlaying = false;
	}

	seek(time: number) {
		this.scPlayer.seek(time);
	}

	currentTime(): number {
		return this.scPlayer.currentTime();
	}

	setVolume(value: number) {
		this.scPlayer.setVolume(value);
	}

	getVolume(): number {
		return this.scPlayer.getVolume();
	}

	on(event, handler: () => void) {
		if (!this.subscribers[event]) this.subscribers[event] = [];
		this.subscribers[event].push(handler);
	}

	publish(events) {
		if (events != null) {
			if (typeof(events.length) != "undefined" && events.length > 0) {

			} else {

			}
		}
	}

	private subscribeSoundCloudPlayerEvent() {
		this.scPlayer.on('play', () => this.publish(Events.Play));
		this.scPlayer.on('play-start', () => this.publish(Events.PlayStart));
		this.scPlayer.on('play-resume', () => this.publish(Events.PlayResume));
		this.scPlayer.on('pause', () => this.publish(Events.Pause));
		this.scPlayer.on('finish', () => this.publish(Events.Finish));
		this.scPlayer.on('seek', () => this.publish(Events.Seek));
		this.scPlayer.on('seeked', () => this.publish(Events.Seeked));
		this.scPlayer.on('time', () => this.publish(Events.Time));
		this.scPlayer.on('audio_error', () => this.publish(Events.AudioError));
		this.scPlayer.on('no_streams', () => this.publish(Events.NoStreams));
	}
}