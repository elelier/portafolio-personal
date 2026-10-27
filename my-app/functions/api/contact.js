import { handleContact } from '../_lib/contact.mjs';

export const onRequest = ({ request, env }) => handleContact(request, env);
