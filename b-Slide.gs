function GET_SLIDE_DATA(id) {
  let slide_data = new SlideData(id);
  let slides = SlidesApp.openById(slide_data.presentation_id).getSlides();

  for (let sn in slides) {
    let slide = slides[sn];
    let isSlipped = slide.isSkipped();

    if (!isSlipped) {
      slide_data._setData("active",slide, sn);
    } else {
      slide_data._setData("disactive",slide, sn);
    }
  }

  slide_data.status = true;
  return slide_data;
}

class SlideData {
  constructor(id) {
    this.presentation_title =  SlidesApp.openById(id).getName();
    this.presentation_id = id;
    this.active_pages = 0;
    this.disactive_pages = 0;
    this.active_chars = 0;
    this.disactive_chars = 0;
    this.slides = [];
  }

  _setData(type, slideObj, number) {
    let slide_data = this.__setSlideData(type, number, slideObj)
    this.slides.push(slide_data);

    if (type == "active") {
      this.active_pages += 1;
      this.active_chars += slide_data.chars;
    } else {
      this.disactive_pages += 1;
      this.disactive_chars += slide_data.chars;
    }
  }

  __setSlideData(type, number, slideObj) {
    let obj = {};
    obj.type = type;
    obj.page = Number(number)+1;
    obj.chars = this.__countText(slideObj);
    obj.presentaion_id = this.presentation_id;
    obj.slide_id = slideObj.getObjectId();
    obj.slide_img_url = this.__createImage(obj.presentaion_id, obj.slide_id, obj.page)

    return obj;
  }

  __countText(slideObj) {
    let shapes = slideObj.getShapes();

    let countText = 0;
    for (let s in shapes) {
      countText += shapes[s].getText().asString().replace(/\n/g, '').length;
    }

    return countText;
  }

  __createImage(presentation_id, page_id, slidesNumber) {

    let url = "https://docs.google.com/presentation/d/" + presentation_id + "/export/" + IMAGE_EXT + "?id=" + presentation_id + "&pageid=" + page_id;

    let options = {
      method: "get",
      headers: {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
      muteHttpExceptions: true
    };

    let response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200)  {
      let images_folder = DriveApp.getFolderById(IMAGE_FOLDER);
      let presentaion = SlidesApp.openById(presentation_id);
      let image_id =  images_folder.createFile(response.getBlob()).setName(presentaion.getName() + '_' + slidesNumber + '.' + IMAGE_EXT).getId();
      let image_url = "https://drive.google.com/uc?id=" + image_id;
      return image_url; 
    }
  }
}