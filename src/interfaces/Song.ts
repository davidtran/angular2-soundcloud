export interface Song
{
	id: number,
	name: string,
	artist: string,
	streamUrl: string,
	provider: number,
	idFromProvider: string,
	duration: number,
	imageUrl: string,
	link: string
}