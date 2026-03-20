import os

from core import logging
from core.api.default_routes import create_default_routes
from core.api.middleware.database_connection_middleware import DatabaseConnectionMiddleware
from core.api.middleware.exception_handling_middleware import ExceptionHandlingMiddleware
from core.api.middleware.logging_middleware import LoggingMiddleware
from core.api.middleware.server_headers_middleware import ServerHeadersMiddleware
from core.store.database import Database
from core.util.value_holder import RequestIdHolder
from starlette.applications import Starlette
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware

name = os.environ.get('NAME', 'clawk-api')
version = os.environ.get('VERSION', 'local')
environment = os.environ.get('ENV', 'dev')
isRunningDebugMode = environment == 'dev'

requestIdHolder = RequestIdHolder()
if isRunningDebugMode:
    logging.init_basic_logging()
else:
    logging.init_json_logging(name=name, version=version, environment=environment, requestIdHolder=requestIdHolder)

DB_HOST = os.environ['DB_HOST']
DB_PORT = os.environ['DB_PORT']
DB_NAME = os.environ['DB_NAME']
DB_USERNAME = os.environ['DB_USERNAME']
DB_PASSWORD = os.environ['DB_PASSWORD']

database = Database(
    connectionString=Database.create_psql_connection_string(
        host=DB_HOST,
        port=DB_PORT,
        name=DB_NAME,
        username=DB_USERNAME,
        password=DB_PASSWORD,
    )
)


async def startup() -> None:
    await database.connect(poolSize=2 if isRunningDebugMode else 10)


async def shutdown() -> None:
    await database.disconnect()


app = Starlette(
    routes=[
        *create_default_routes(name=name, version=version, environment=environment),
    ],
    on_startup=[startup],
    on_shutdown=[shutdown],
)
app.add_middleware(ExceptionHandlingMiddleware, shouldSquashClientExceptions=environment != 'dev')
app.add_middleware(ServerHeadersMiddleware, name=name, version=version, environment=environment)
app.add_middleware(LoggingMiddleware, requestIdHolder=requestIdHolder)
app.add_middleware(DatabaseConnectionMiddleware, database=database)
app.add_middleware(GZipMiddleware, minimum_size=1000, compresslevel=9)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    expose_headers=['*'],
    allow_origins=[
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        os.environ.get('KRT_APP_URL', 'http://127.0.0.1:3000'),
    ],
)
