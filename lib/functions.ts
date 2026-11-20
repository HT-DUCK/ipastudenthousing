export function getScrollDirection(entry: any, previousY = 0, previousRatio = 0) {
	const currentY = entry.boundingClientRect.y;
	const currentRatio = entry.intersectionRatio;
	const isIntersecting = entry.isIntersecting;

	// Scrolling down/up
	if (currentY < previousY) {
		if (currentRatio > previousRatio && isIntersecting) {
			return 'scrollingDownEnter';
		} else {
			return 'scrollingDownLeave';
		}
	} else if (currentY > previousY && isIntersecting) {
		if (currentRatio < previousRatio) {
			return 'scrollingUpLeave';
		} else {
			return 'scrollingUpEnter';
		}
	}
	previousY = currentY;
	previousRatio = currentRatio;
}

export async function resizedImage(file: File, maxSize: number) {
	var reader = new FileReader();
	var image: HTMLImageElement = new Image();
	var canvas = document.createElement('canvas');
	var dataURItoBlob = function (dataURI: string) {
		var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ? window.atob(dataURI.split(',')[1]) : decodeURI(dataURI.split(',')[1]);
		var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
		var max = bytes.length;
		var ia = new Uint8Array(max);
		for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
		return new Blob([ia], { type: mime });
	};
	var resize = function () {
		var width = image.width;
		var height = image.height;
		if (width > height) {
			if (width > maxSize) {
				height *= maxSize / width;
				width = maxSize;
			}
		} else {
			if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}
		}
		canvas.width = width;
		canvas.height = height;
		var canvas_2d = canvas.getContext('2d');
		if (canvas_2d) {
			canvas_2d.drawImage(image, 0, 0, width, height);
		}
		var dataUrl = canvas.toDataURL(file.type);
		var blob: Blob = dataURItoBlob(dataUrl);
		return { blob, image };
	};
	return new Promise((ok, no) => {
		if (!file.type.match(/image.*/)) {
			no(new Error('Not an image'));
			return;
		}
		reader.onload = function (readerEvent: any) {
			image.src = readerEvent?.target?.result || null;
			image.onload = function () {
				return ok(resize());
			};
		};
		reader.readAsDataURL(file);
	});
}

export function updateSearchParams(current_params: string, name: string, value: any, delete_name?: string) {
	const params = new URLSearchParams(current_params);
	if (value) {
		params.set(name, value);
	} else {
		params.delete(name);
	}
	if (delete_name) {
		params.delete(delete_name);
	}

	return params.toString();
}

export function objectToQueryString(obj: any) {
	const keys = Object.keys(obj);
	const key_value_pairs = keys.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
	return key_value_pairs.join('&');
}
