import { Buffer } from 'buffer';

export function decodeJwt(token: string) {
	const base64Payload = token.split('.')[1];

	const payloadBuffer = Buffer.from(base64Payload, 'base64');

	return JSON.parse(payloadBuffer.toString());
}
