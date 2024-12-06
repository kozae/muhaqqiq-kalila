function handler(event) {
  var request = event.request;
  request.uri = request.uri.replace("/srv/page/", "/public/pages/");

  return request;
}
