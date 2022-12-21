import { Buffer } from 'buffer';

export function decodeJwt(token: string) {
	var base64Payload = token.split('.')[1];
	var payloadBuffer = Buffer.from(base64Payload, 'base64');
	return JSON.parse(payloadBuffer.toString());
}
