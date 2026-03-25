class Thread {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, body, userId, createdAt, updatedAt, username } = payload;

    this.id = id;
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
  }

  _verifyPayload({ id, title, body, userId, createdAt, updatedAt }) {
    if (!id || !title || !body || !userId || !createdAt || (updatedAt && !updatedAt)) {
      throw new Error('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string' || typeof userId !== 'string' || !(createdAt instanceof Date) || (updatedAt && !(updatedAt instanceof Date))) {
      throw new Error('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default Thread;