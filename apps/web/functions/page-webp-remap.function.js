function handler(event) {
  var request = event.request;
  request.uri = request.uri.replace("/srv/page_wb/", "/public/pages_webp/");

  return request;
}
