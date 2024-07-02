import centra from "centra"
import sizeOf from "buffer-image-size"
import { Message, User } from "discord.js"

export const imageSize = async (src: string | ArrayBuffer | Buffer) => {
	let buffer: Buffer

	if (typeof src === "string") {
		buffer = await centra(src)
			.send()
			.then(res => res.body)
	} else if (src instanceof ArrayBuffer) {
		buffer = Buffer.from(src)
	} else if (src instanceof Buffer) {
		buffer = src
	} else {
		throw new Error(`Invalid argument provided`)
	}

	const { height, width } = sizeOf(buffer)

	return { height, width }
}
export const getUserFromMessage = (message: Message) => {
	let user: User
	if ("user" in message) user = message.user as typeof message.author
	else user = message.author
	return user
}
