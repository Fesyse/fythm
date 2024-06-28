import requestImageSize from "request-image-size"

export const getImageSizes = (imageUrl: string) => {
	return requestImageSize({ url: imageUrl })
}
