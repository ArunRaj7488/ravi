import axios from 'axios';

const uploadFiles = (payload) => axios.post('http://localhost:5000/api/files', payload);

export default { uploadFiles };