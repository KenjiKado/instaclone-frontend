import React from "react";
import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import styles from "./style.module.scss";

interface IProps {
	text: string;
	type?: 'description' | 'comment';
	onMore?: () => void;
}

const InnerText = ({ text, onMore = () => { }, type = 'description' }: IProps) => {
	const renderHashtags = (text: string) => {
		const strArray = sanitizeHtml(text).split(' ');

		const payload = strArray.map((word, i) => {
			const isHashtag = /#[А-яA-z]+/.test(word);
			const text = isHashtag ?
				<React.Fragment key={i}>
					<Link to={`/hashtags/${word}`}>{word}</Link>{i === strArray.length - 1 ? '' : ' '}
				</React.Fragment> :
				<React.Fragment key={i}>
					{i === strArray.length - 1 ? word : word + ' '}
				</React.Fragment>;

			return text;
		});

		return payload;
	}

	const renderWithTrimText = (text: string) => {
		return (
			<>
				<span className={styles.text}>{renderHashtags(text.slice(0, 200))}...</span>
				<span className={styles.more} onClick={onMore}>еще</span>
			</>
		)
	}

	return (
		<>
			{text.length > 200 && type === 'description' ? renderWithTrimText(text) : <span className={styles.text}>{renderHashtags(text)}</span>}
		</>
	)
}

export default InnerText;