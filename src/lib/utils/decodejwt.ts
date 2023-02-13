import { Buffer } from 'buffer';

export function decodeJwt(token: string) {
	console.log('starting to decode jwt');
	const base64Payload = token.split('.')[1];
	const payloadBuffer = Buffer.from(base64Payload, 'base64');
	console.log('finished decoding jwt');
	return JSON.parse(payloadBuffer.toString());
}
