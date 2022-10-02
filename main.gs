function doGet(e) {
  let page = e.parameter.p??"index";
  const HtmlOutPut = HtmlService.createTemplateFromFile(page).evaluate();
  HtmlOutPut.setTitle(p_TITLE);
  return HtmlOutPut;
}

function getAppUrl() {
  return ScriptApp.getService().getUrl();
}

function getData(url) {
  let result;

  try {
    let id = GET_FILEID_FROM_URL(url);
    let fileType = GET_FILE_TYPE(id);

    if (fileType == MIME_PPT) {
      id = CONVERT_SLIDE_FROM_PPT(id);
      fileType = MIME_SLIDE;
    } 

    if (fileType != MIME_SLIDE) {
      result = {
        status: false,
        message: FILETYPE_NOT_MATCH
      }
    } else {
      result = GET_SLIDE_DATA(id);
      SET_RESULT_DATA(result);
    }
  } 
  catch(e) {
    result = {
      status: false,
      message: NOT_URL,
      details: e
    }
  }
  return result;
}