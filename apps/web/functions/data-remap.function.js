function handler(event) {
  var request = event.request;
  request.uri = request.uri.replace("/srv/data/", "/public/data_dev/");

  return request;
}
