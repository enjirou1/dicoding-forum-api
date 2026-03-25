import InvariantError from './InvariantError.js';
import AuthenticationError from './AuthenticationError.js';
import NotFoundError from './NotFoundError.js';
import AuthorizationError from './AuthorizationError.js';

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username dan password harus string'),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'CREATE_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'),
  'CREATE_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat thread baru karena tipe data tidak sesuai'),
  'COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'),
  'COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat komentar baru karena tipe data tidak sesuai'),
  'CREATE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat komentar baru karena properti yang dibutuhkan tidak ada'),
  'CREATE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat komentar baru karena tipe data tidak sesuai'),
  'REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat reply baru karena properti yang dibutuhkan tidak ada'),
  'REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat reply baru karena tipe data tidak sesuai'),
  'CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('tidak dapat membuat reply baru karena properti yang dibutuhkan tidak ada'),
  'CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('tidak dapat membuat reply baru karena tipe data tidak sesuai'),
  'THREAD_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN': new AuthenticationError('Missing authentication'),
  'THREAD_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION': new AuthenticationError('tidak dapat membuat thread baru karena tipe data access token tidak sesuai'),
  'COMMENT_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN': new AuthenticationError('Missing authentication'),
  'COMMENT_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION': new AuthenticationError('tidak dapat membuat komentar baru karena tipe data access token tidak sesuai'),
  'REPLY_USE_CASE.NOT_CONTAIN_ACCESS_TOKEN': new AuthenticationError('Missing authentication'),
  'REPLY_USE_CASE.ACCESS_TOKEN_NOT_MEET_DATA_TYPE_SPECIFICATION': new AuthenticationError('tidak dapat membuat reply baru karena tipe data access token tidak sesuai'),
  'THREAD_USE_CASE.INVALID_TOKEN': new AuthenticationError('access token tidak valid'),
  'COMMENT_USE_CASE.INVALID_TOKEN': new AuthenticationError('access token tidak valid'),
  'REPLY_USE_CASE.INVALID_TOKEN': new AuthenticationError('access token tidak valid'),
  'COMMENT_USE_CASE.THREAD_NOT_FOUND': new NotFoundError('tidak dapat membuat komentar baru karena thread tidak ditemukan'),
  'COMMENT_USE_CASE.COMMENT_NOT_FOUND': new NotFoundError('Komentar tidak ditemukan'),
  'COMMENT_USE_CASE.UNAUTHORIZED': new AuthorizationError('tidak dapat membuat komentar baru karena tidak memiliki akses'),
  'REPLY_USE_CASE.THREAD_NOT_FOUND': new NotFoundError('tidak dapat membalas komentar karena komentar tidak ditemukan'),
  'REPLY_USE_CASE.COMMENT_NOT_FOUND': new NotFoundError('Komentar tidak ditemukan'),
  'REPLY_USE_CASE.REPLY_NOT_FOUND': new NotFoundError('Balasan tidak ditemukan'),
  'REPLY_USE_CASE.UNAUTHORIZED': new AuthorizationError('tidak dapat membalas komentar karena tidak memiliki akses'),
};

export default DomainErrorTranslator;
