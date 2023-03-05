use axum::{
    routing::{get, post},
    Router, http::{Request, Response, StatusCode}, Json, body::{Body, HttpBody}, response::IntoResponse, middleware::Next, Extension,
};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::net::SocketAddr;
use std::env;

mod controllers;
mod models;

#[tokio::main]
async fn main() {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&env::var("DATABASE_URL").unwrap_or_else(|_| String::from("postgres://postgres:123@localhost/rust_chat"))).await
        .expect("can't connect to database");
    let _ = sqlx::migrate!().run(&pool).await;

    let app = Router::new()
        .route("/", get(controllers::frontend::index))
        .route("/index.js", get(controllers::frontend::index_js))
        .route("/messages", get(controllers::message::get_all).post(controllers::message::create))
        .layer(Extension(pool));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}