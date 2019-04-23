import axios from 'axios';

function ajaxChallenge() {
  axios.get('/challenges')
    .then((res) => {
      console.log(res);
    })
    .catch(console.error);
}

export default ajaxChallenge;
