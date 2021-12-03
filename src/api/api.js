module.exports = {
  getCookie: function (key) {
    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].split('=');
      if (cookies[i][0].trim() === key) {
        return cookies[i][1];
      }
    }
  },
};
