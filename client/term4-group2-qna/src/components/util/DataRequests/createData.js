import 'axios';
import axios from 'axios';

const createDataOf = {
  question: (val, token) => {

    alert(val)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/api/createQuestion/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data
    };

  }
}

export default createDataOf