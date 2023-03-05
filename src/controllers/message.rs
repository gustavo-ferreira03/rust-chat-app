use axum::{http::{Request, StatusCode}, Json, response::IntoResponse, Extension};
use sqlx::{PgPool};

use crate::models::message::{Message, NewMessage, MessageWithAuthor};

pub async fn get_all(Extension(pool): Extension<PgPool>) -> impl IntoResponse {
    let sql = "SELECT m.message_id, u.user_id, u.name AS author, m.text FROM message m INNER JOIN \"user\" u ON m.user_id = u.user_id";
    let result: Result<Vec<MessageWithAuthor>, sqlx::Error> = 
        sqlx::query_as::<_, MessageWithAuthor>(sql)
        .fetch_all(&pool)
        .await;

    match result {
        Ok(messages) => (StatusCode::OK, Json(messages)),
        Err(err) => {
            println!("error retrieving messages: {}", err.as_database_error().unwrap().to_string());
            (StatusCode::INTERNAL_SERVER_ERROR, Json(Vec::<MessageWithAuthor>::new()))
        }
    }
}

pub async fn create(Extension(pool): Extension<PgPool>, Json(message): Json<NewMessage>) -> impl IntoResponse {
    let sql = "INSERT INTO message (user_id, text) VALUES ($1, $2) RETURNING *";

    let result: Result<Message, sqlx::Error> = 
        sqlx::query_as(sql)
        .bind(&message.user_id)
        .bind(&message.text)
        .fetch_one(&pool)
        .await;

        match result {
            Ok(message) => (StatusCode::OK, Json(message)),
            Err(err) => {
                println!("error retrieving messages: {}", err.as_database_error().unwrap().to_string());
                (StatusCode::INTERNAL_SERVER_ERROR, Json(Message {
                    message_id: 0,
                    user_id: 0,
                    text: String::from(""),
                }))
            }
        }
}