from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "todo-database.cpuskaus0ytf.us-east-1.rds.amazonaws.com"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
