class Reply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, content, commentId, userId, createdAt, updatedAt, username, deletedAt } = payload;

    this.id = id;
    this.content = content;
    this.commentId = commentId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
    this.deletedAt = deletedAt;
  }

  _verifyPayload({ id, content, commentId, userId, createdAt, updatedAt }) {
    if (!id || !content || !commentId || !userId || !createdAt || (updatedAt && !updatedAt)) {
      throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof commentId !== 'string' || typeof userId !== 'string' || !(createdAt instanceof Date) || (updatedAt && !(updatedAt instanceof Date))) {
      throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default Reply;