from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str = ""
    db_password: str = ""
    debug: bool = False

    class Config:
        env_prefix = ""
        env_file = ".env"


settings = Settings()
