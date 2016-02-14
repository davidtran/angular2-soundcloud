import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {SearchFactory} from './services/SearchFactory.ts';
import {PlaylistService} from './services/PlaylistService.ts';
import {SoundCloudSearch} from './services/SoundCloudSearch.ts';
import {SoundCloudPlayer} from './services/SoundCloudPlayer.ts';
import {SoundManagerSoundPlayer} from './services/SoundManagerSoundPlayer.ts';
import {SoundManager} from './services/SoundManager.ts';
import {PlayerCmp} from './player/Player.ts';
import {TabListCmp} from './tabList/TabList.ts';
import {LocalStorage} from './services/LocalStorage.ts';
import 'rxjs/Rx';

@Component({
  selector: 'app',
  template: `
	<div class='app'>
		<player></player>
		<tablist></tablist>
	</div>
	`,
	styles: [
		`
		.app {
			width: 320px;
		}

		`
	],
	directives: [TabListCmp, PlayerCmp],
	providers: [
		HTTP_PROVIDERS,
		SoundCloudSearch,
		SearchFactory,
		PlaylistService,
		SoundCloudPlayer,
		SoundManagerSoundPlayer,
		SoundManager,
		LocalStorage
	]
})
export class AppCmp {

}

bootstrap(AppCmp);