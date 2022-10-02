function SET_RESULT_DATA(result) {
  let ss = SpreadsheetApp.openById(SPREAD_SHEET);

  // 全体データ格納
  let sht_so = ss.getSheetByName(SLIDE_OVERVIEW);
  let so_lastrow = sht_so.getLastRow();
  let data_so_array = [];

  data_so_array.push(SET_DATA_TO_ARRAY(result,["presentation_title","presentation_id", "active_pages", "active_chars", "disactive_pages", "disactive_chars"], so_lastrow))
  let so_record_num = data_so_array[0].length;
  sht_so.getRange(so_lastrow+1,1,1, so_record_num).setValues(data_so_array)

  // 詳細データ格納
  let sht_sd = ss.getSheetByName(SLIDE_DETAILS);
  let sd_lastrow = sht_sd.getLastRow();
  let data_sd_array = [];

  let slides = result.slides;
  for (let sn in slides) {
    let slide = slides[sn];
    data_sd_array.push(SET_DATA_TO_ARRAY(slide,["presentaion_id", "page", "slide_id","type", "chars", "slide_img_url"], sd_lastrow))
  }

  let sd_record_num = data_sd_array[0].length;

  sht_sd.getRange(sd_lastrow+1,1,data_sd_array.length, sd_record_num).setValues(data_sd_array)
}

function SET_DATA_TO_ARRAY(data,properties,lastrow){

  let data_array = []

  data_array.push(lastrow);

  for (let pn in properties) { 
    let property = properties[pn];
    data_array.push(data[property]);
  }

  data_array.push(CREATE_AT);

  return data_array;
}