use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct User {
    pub user_id: i32,
    pub name: String,
}