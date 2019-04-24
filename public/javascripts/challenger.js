import { $, $$ } from './modules/bling';
import ajaxChallenge from './modules/challenge';

const getChallenge = $$('form.get-challenge');
getChallenge.on('submit', ajaxChallenge);
