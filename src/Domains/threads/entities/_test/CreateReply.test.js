import CreateReply from '../CreateReply';

describe('a CreateReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'Content',
      commentId: 'Comment ID'
    };

    // Action and Assert
    expect(() => new CreateReply(payload)).toThrowError('CREATE_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'Content',
      commentId: 'Comment ID',
      userId: 123
    };

    // Action and Assert
    expect(() => new CreateReply(payload)).toThrowError('CREATE_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create createReply object correctly', () => {
    // Arrange
    const payload = {
      content: 'Content',
      commentId: 'Comment ID',
      userId: '123'
    };

    // Action
    const createReply = new CreateReply(payload);

    // Assert
    expect(createReply.content).toEqual(payload.content);
    expect(createReply.commentId).toEqual(payload.commentId);
    expect(createReply.userId).toEqual(payload.userId);
  });
});