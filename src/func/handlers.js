import {
	addToListenLater,
	removeFromListenLater,
	isInListenLater,
} from "../supabase/listenLater";
import { addToWant, removeFromWant, isInWant } from "../supabase/want";
import {
	addToCollection,
	removeFromCollection,
	isInCollection,
} from "../supabase/collection";
import {
	addToListened,
	removeFromListened,
	isListened,
} from "../supabase/listened";
import { cacheAlbum } from "../supabase/albums";

export async function handleCollect(userId, album, onDone) {
	const collected = await isInCollection(userId, album.id);
	let message = null;
	if (collected) {
		await removeFromCollection(userId, album.id);
		message = `"${album.title}" removed from your Collection.`;
	} else {
		await cacheAlbum(album);
		const wasWanted = await isInWant(userId, album.id);
        if (wasWanted) {
            await removeFromWant(userId, album.id);
            message = `"${album.title}" moved from your Want list to your Collection.`;
        }
		await addToCollection(userId, album.id);
	}
	if (onDone) onDone(message);
}

export async function handleListen(userId, album, onDone) {
	const listened = await isListened(userId, album.id);
	let message = null;
	if (listened) {
		await removeFromListened(userId, album.id);
		message = `"${album.title}" removed from your Listened.`;
	} else {
		await cacheAlbum(album);
		 const wasListenLater = await isInListenLater(userId, album.id);
        if (wasListenLater) {
            await removeFromListenLater(userId, album.id);
            message = `"${album.title}" moved from Listen Later to Listened.`;
        }
		await addToListened(userId, album.id);
	}
	if (onDone) onDone(message);
}

export async function handleListenLater(userId, album, onDone) {
	const listenLater = await isInListenLater(userId, album.id);
	if (listenLater) {
		await removeFromListenLater(userId, album.id);

	} else {
		await cacheAlbum(album);
		await addToListenLater(userId, album.id);
	}
	if (onDone) onDone(null);
}

export async function handleWant(userId, album, onDone) {
	const want = await isInWant(userId, album.id);
	if (want) {
		await removeFromWant(userId, album.id);
	} else {
		await cacheAlbum(album);
		await addToWant(userId, album.id);
	}
	if (onDone) onDone(null);
}
