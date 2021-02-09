import axios from "axios";

export default axios.create({
    lanipurl : 'http://192.168.1.4:8000/api/createprofile',
    headers: {
        "Content-type": "application/json"
    }
});