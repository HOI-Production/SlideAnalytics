function doGet(e) {

  let page = e.parameter.p??"index";
  const HtmlOutPut = HtmlService.createTemplateFromFile(page).evaluate().setTitle("Googleスライド分析");
  return HtmlOutPut;
}

function getAppUrl() {
  return ScriptApp.getService().getUrl();
}

function getData(url) {

  let id = GET_FILEID_FROM_URL(url);

  console.log(id);

  let fileType = GET_FILE_TYPE(id);

  console.log(fileType);

  if (fileType == MIME_PPT) {
    id = CONVERT_SLIDE_FROM_PPT(id);
    fileType = MIME_SLIDE;
  } 

  let result

  if (fileType != MIME_SLIDE) {
    result = {
      status: false,
      message: "このファイル形式は対応していません。"
    }
  } else {
    result = GET_SLIDE_DATA(id);
  }

  return result;
}

function testM(){
  let url = "https://docs.google.com/presentation/d/15-NXkW6_Ujc4wFD6gT5HqdsmUxU5AkXU/edit#slide=id.p1";

  let data = getData(url);


  console.log(data)
}