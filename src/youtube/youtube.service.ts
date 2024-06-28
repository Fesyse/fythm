import { getMusic } from "ytubes"
import { Injectable } from "@nestjs/common"

@Injectable()
export class YoutubeService {
	constructor() {}

	async findMusic(query: string) {
		const searchedMusic = await getMusic(query, { max: 5 })
		return searchedMusic
	}
}
