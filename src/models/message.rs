use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Message {
    pub message_id: i32,
    pub user_id: i32,
    pub text: String,
}

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct MessageWithAuthor {
    pub message_id: i32,
    pub user_id: i32,
    pub author: String,
    pub text: String,
}

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct NewMessage {
    pub user_id: i32,
    pub text: String,
}