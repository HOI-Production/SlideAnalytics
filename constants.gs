// ID
const STORE_FOLDER = PropertiesService.getScriptProperties().getProperty("SLIDE_FOLDER_ID");
const SPREAD_SHEET = PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");

// DB
const SLIDE_OVERVIEW = "SLIDE_OVERVIEW"
const SLIDE_DETAILS = "SLIDE_DETAIL"
const STATISTICS = "STATISTICS"

// EXCELL FUNC
const AUTOINCREMENT = "=ROW()-1"

// ファイル形式
const MIME_SLIDE = "application/vnd.google-apps.presentation"
const MIME_PPT   = "application/vnd.openxmlformats-officedocument.presentationml.presentation"

// ページ設定
const p_TITLE = "Googleスライド分析"

// 処理メッセージ
const FILETYPE_NOT_MATCH = "このファイル形式は対応していません。"
const NOT_URL = "不正なURLが入力されています。"
