use axum::{response::{IntoResponse, Html}, http::Response};

pub async fn index() -> impl IntoResponse {
    let markup = tokio::fs::read_to_string("src/views/index.html").await.unwrap();

    Html(markup)
}

pub async fn index_js() -> impl IntoResponse {
    let markup = tokio::fs::read_to_string("src/javascript/index.js").await.unwrap();

    Response::builder()
        .header("Content-Type", "application/javascript;charset=utf-8")
        .body(markup)
        .unwrap()
}