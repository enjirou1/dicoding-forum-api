class CreateReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, commentId, userId } = payload;

    this.content = content;
    this.commentId = commentId;
    this.userId = userId;
  }

  _verifyPayload({ content, commentId, userId }) {
    if (!content || !commentId || !userId) {
      throw new Error('CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof commentId !== 'string' || typeof userId !== 'string') {
      throw new Error('CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

export default CreateReply;