import { getMusic } from "ytubes"
import { Injectable } from "@nestjs/common"
import ytdl from "ytdl-core"

@Injectable()
export class YoutubeService {
	async findMusic(query: string) {
		const searchedMusic = await getMusic(query, { max: 5 })
		return searchedMusic
	}

	async getMp3File(url: string) {
		const videoInfo = await ytdl.getInfo(
			"https://www.youtube.com/watch?v=7MdDtczKBsY"
		)
		const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly")
		console.log(audioFormats)
		return audioFormats
	}
}
