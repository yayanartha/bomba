export const getNumber = (name?: string) => {
	const charactersArray = name ? Array.from(name) : [];
	let charactersCodesSum = 0;

	charactersArray.forEach((charactersArrayItem: string) => {
		return (charactersCodesSum += charactersArrayItem.charCodeAt(0));
	});

	return charactersCodesSum;
};

export const getModulus = (num: number, max: number) => {
	return num % max;
};

export const getDigit = (number: number, ntn: number) => {
	return Math.floor((number / 10 ** ntn) % 10);
};

export const getBoolean = (number: number, ntn: number) => {
	return !(getDigit(number, ntn) % 2);
};

export const getAngle = (x: number, y: number) => {
	return (Math.atan2(y, x) * 180) / Math.PI;
};

export const getUnit = (number: number, range: number, index?: number) => {
	const value = number % range;

	if (index && getDigit(number, index) % 2 === 0) {
		return -value;
	}

	return value;
};

export const getRandomColor = (
	number: number,
	colors: string[],
	range: number,
) => {
	return colors[number % range];
};

export const getContrast = (hexcolor: string) => {
	// If a leading # is provided, remove it
	if (hexcolor.slice(0, 1) === "#") {
		hexcolor = hexcolor.slice(1);
	}

	// Convert to RGB value
	const r = Number.parseInt(hexcolor.substr(0, 2), 16);
	const g = Number.parseInt(hexcolor.substr(2, 2), 16);
	const b = Number.parseInt(hexcolor.substr(4, 2), 16);

	// Get YIQ ratio
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// Check contrast
	return yiq >= 128 ? "black" : "white";
};

export const AVATAR_SIZE = 36;

export const generateData = (name: string, colors: string[]) => {
	const numFromName = getNumber(name);
	const range = colors?.length;
	const wrapperColor = getRandomColor(numFromName, colors, range);
	const preTranslateX = getUnit(numFromName, 10, 1);
	const wrapperTranslateX =
		preTranslateX < 5 ? preTranslateX + AVATAR_SIZE / 9 : preTranslateX;
	const preTranslateY = getUnit(numFromName, 10, 2);
	const wrapperTranslateY =
		preTranslateY < 5 ? preTranslateY + AVATAR_SIZE / 9 : preTranslateY;

	const data = {
		wrapperColor: wrapperColor,
		faceColor: getContrast(wrapperColor),
		backgroundColor: getRandomColor(numFromName + 13, colors, range),
		wrapperTranslateX: wrapperTranslateX,
		wrapperTranslateY: wrapperTranslateY,
		wrapperRotate: getUnit(numFromName, 360),
		wrapperScale: 1 + getUnit(numFromName, AVATAR_SIZE / 12) / 10,
		isMouthOpen: getBoolean(numFromName, 2),
		isCircle: getBoolean(numFromName, 1),
		eyeSpread: getUnit(numFromName, 5),
		mouthSpread: getUnit(numFromName, 3),
		faceRotate: getUnit(numFromName, 10, 3),
		faceTranslateX:
			wrapperTranslateX > AVATAR_SIZE / 6
				? wrapperTranslateX / 2
				: getUnit(numFromName, 8, 1),
		faceTranslateY:
			wrapperTranslateY > AVATAR_SIZE / 6
				? wrapperTranslateY / 2
				: getUnit(numFromName, 7, 2),
	};

	return data;
};
