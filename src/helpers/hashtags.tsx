import sanitizeHtml from "sanitize-html";
import { Link } from "react-router-dom";

export const processHashtags = (str: string) => {
	const strArray = sanitizeHtml(str).split(' ');
	const payload = strArray.map((word, i) => {
		const isHashtag = /#[А-яA-z]+/.test(word);
		const text = isHashtag ? <><Link to='' > {word} </Link>{i === strArray.length - 1 ? '' : ' '}</ > : `${word} `;
		if (i === strArray.length - 1 && !isHashtag && typeof text === 'string') {
			return text.replace(/^\s+|\s+$/g, '');
		}
		return text;
	})

	//str.replace(/(?:^|\s)(#[A-zА-я\d-_]+)/g, '<mark>$&</mark>').replaceAll('<mark> ', ' <mark>');
	return payload;
}