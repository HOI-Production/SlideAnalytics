// フォルダーURLで一括実行
function getDataFromFolder() {

  // 対象フォルダーを設定
  let url = "https://drive.google.com/drive/folders/1tBZHn9sL-rqb2fD8VPlZyE5b_ZggRQjw";

  let id = GET_FILEID_FROM_URL(url);

  let folder = DriveApp.getFolderById(id);

  let files = folder.getFiles();

  while (files.hasNext()) {

    let file = files.next()

    let MIME_TYPE = file.getMimeType();

    if (MIME_TYPE == MIME_SLIDE || MIME_TYPE == MIME_PPT) {

      let file_name = file.getName()
      let file_url = file.getUrl()

      // ログ監視用にコンソール出力
      console.log(file_name);

      // 処理実行
      getData(file_url);
    }
  }
}