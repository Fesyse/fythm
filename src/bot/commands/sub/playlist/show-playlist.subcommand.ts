import { Handler, SubCommand } from "@discord-nestjs/core"

@SubCommand({ name: "show", description: "Show your playlist." })
export class ShowPlaylistSubCommand {
	@Handler()
	onShowPlaylistSubCommand() {
		return "susnyuara"
	}
}
