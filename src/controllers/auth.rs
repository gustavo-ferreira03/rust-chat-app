use axum::{http::{Request, StatusCode}, Json, response::IntoResponse, Extension};
use sqlx::{PgPool};

use crate::models::auth::{Auth};
use crate::models::user::{User};

pub async fn login(Extension(pool): Extension<PgPool>, Json(auth): Json<Auth>) -> impl IntoResponse {
    let sql = "SELECT * FROM \"user\" WHERE name = $1";
    let result: Result<User, sqlx::Error> =
        sqlx::query_as::<_, User>(sql)
        .bind(&auth.username)
        .fetch_one(&pool)
        .await;

    match result {
        Ok(user) => (StatusCode::OK, Json(user)),
        Err(err) => {
            println!("error retrieving user: {}", err.as_database_error().unwrap().to_string());
            (StatusCode::NOT_FOUND, Json(User { user_id: 0, name: String::from("") }))
        }
    }
}