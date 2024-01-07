import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { gzipSync, strToU8 } from 'fflate';

import classtimes from './classtimes.json';

const text = strToU8(JSON.stringify(classtimes));
const small = gzipSync(text, { level: 6, mem: 8 });

export const GET: RequestHandler = ({ url }) => {
	return new Response(small);
};
