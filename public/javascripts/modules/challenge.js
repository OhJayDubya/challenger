import axios from 'axios';
import { $ } from './bling';

function ajaxChallenge(e) {
  e.preventDefault();
  axios.get(this.action)
    .then((res) => {
      $('.home-title').textContent = res.data[0].name;
      $('.description').textContent = res.data[0].description;
    })
    .catch(console.error);
}

export default ajaxChallenge;
