function SLIDE_ANALISE() {
  let ss = SpreadsheetApp.openById(SPREAD_SHEET);

  let sht_source = ss.getSheetByName(SLIDE_OVERVIEW);

  let records =sht_source.getDataRange().getValues();
  records.shift() // ヘッダー削除

  let data_for_pm_X = [];
  let data_for_pm_Y = [];
  let data_for_cm_X = [];
  let data_for_cm_Y = [];
  let data_for_dm_X = [];
  let data_for_dm_Y = [];
  let data_for_em_X = [];
  let data_for_em_Y = [];
  let data_for_fm_X = [];
  let data_for_fm_Y = [];

  for (let rn in records) {
    let record = records[rn];

    // MINUTE==NULLまたはTARGET==0はスキップ
    if (!record[7]|| !record[8]) {
      continue;
    }

    console.log(record)

    // for pm
    data_for_pm_X.push(record[7])// MINUTE
    data_for_pm_Y.push(record[3])// PAGES

    // for cm
    data_for_cm_X.push(record[7])// MINUTE
    data_for_cm_Y.push(record[4])// CHARS

    // for dm
    data_for_dm_X.push(record[7])// MINUTE
    data_for_dm_Y.push(record[4] * record[3])// CHARS * PAGES

    // for em
    data_for_em_X.push(record[7])// MINUTE
    data_for_em_Y.push(record[4] / record[3])// CHARS / PAGES

    // for fm
    data_for_fm_X.push(record[7])// MINUTE
    data_for_fm_Y.push(record[3] / record[4])// PAGE / SCHARS
  }

  let cc_pm = Correl(data_for_pm_X, data_for_pm_Y) // MINUTE & PAGES
  let cc_cm = Correl(data_for_cm_X, data_for_cm_Y) // MINUTE & CHARS
  let cc_dm = Correl(data_for_dm_X, data_for_dm_Y) // MINUTE & CHARS * PAGES
  let cc_em = Correl(data_for_em_X, data_for_em_Y) // MINUTE & CHARS / PAGES
  let cc_fm = Correl(data_for_fm_X, data_for_fm_Y) // MINUTE & CHARS / PAGES

  console.log(cc_pm)
  console.log(cc_cm)
  console.log(cc_dm)
  console.log(cc_em)
  console.log(cc_fm)
}

function Correl(xx,yy){
  var m = Math
     ,n;
  if (xx.length==yy.length){
    n = xx.length;
    var sumx=0, sumy=0, sumxx=0, sumyy=0, sumxy=0
       ,xm ,ym ,xxi ,yyi
       ,sumxxm=0, sumyym=0, sumxym=0
       ,i;
    for(i=0; i<n; i++){
      sumx += (xx[i]-0);
      sumy += (yy[i]-0);
    }
    xm = sumx/n;
    ym = sumy/n;
    for(i=0; i<n; i++){
      xxi = (xx[i]-0);
      yyi = (yy[i]-0);
      sumxxm += (xxi-xm) * (xxi-xm);
      sumyym += (yyi-ym) * (yyi-ym);
      sumxym += (xxi-xm) * (yyi-ym);
    }                                  
    return sumxym / m.sqrt(sumxxm) / m.sqrt(sumyym);
  }else{
    throw new Error("Array length is not same.");
  }
}