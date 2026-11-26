import { handleChat } from '../_lib/chat.mjs';

export const onRequest = ({ request, env }) => handleChat(request, env);
