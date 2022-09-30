function doGet(e) {

  let page = e.parameter.p??"index";
  const HtmlOutPut = HtmlService.createTemplateFromFile(page).evaluate().setTitle("Googleスライド分析");
  return HtmlOutPut;
}

function getAppUrl() {
  return ScriptApp.getService().getUrl();
}

function getData() {
  return "data"
}
