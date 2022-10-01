function GET_SLIDE_DATA(id) {
  let slide_data = new SlideData(id);
  let slides = SlidesApp.openById(slide_data.id).getSlides();

  for (let sn in slides) {
    let slide = slides[sn];
    let isSlipped = slide.isSkipped();

    if (!isSlipped) {
      slide_data._setActiveData(slide);

    } else {
      slide_data._setDisactiveData(slide);
    }
  }

  slide_data.status = true;
  return slide_data;
}

class SlideData {
  constructor(id) {
    this.title =  SlidesApp.openById(id).getName();
    this.id = id;
    this.active_pages = 0;
    this.disactive_pages = 0;
    this.active_chars = 0;
    this.disactive_chars = 0;
  }

  _setActiveData(slideObj) {
    this.active_pages += 1;
    this.active_chars += this.__countText(slideObj);
  }

  _setDisactiveData(slideObj) {
    this.disactive_pages += 1;
    this.disactive_chars += this.__countText(slideObj);
  }

  __countText(slideObj) {
    let shapes = slideObj.getShapes();

    let countText = 0;
    for (let s in shapes) {
      countText += shapes[s].getText().asString().replace(/\n/g, '').length;
    }

    return countText;
  }
}