import { Param } from "@discord-nestjs/core"
import { Transform } from "class-transformer"
import { PlayDto } from "@/bot/dto/play.dto"

export class AddToPlaylistDto extends PlayDto {}
