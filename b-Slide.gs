function GET_SLIDE_DATA(id) {
  let slide_data = new SlideData(id);
  let slides = SlidesApp.openById(slide_data.id).getSlides();

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
    this.title =  SlidesApp.openById(id).getName();
    this.id = id;
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
    obj.id = this.id;

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
}