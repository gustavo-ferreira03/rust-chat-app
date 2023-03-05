use serde::{Serialize, Deserialize};

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct Auth {
    pub username: String,
}