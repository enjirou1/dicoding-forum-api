import Reply from '../Reply';

describe('a Reply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'Reply ID',
      content: 'Content',
      commentId: 'Comment ID',
      userId: '123'
    };

    // Action and Assert
    expect(() => new Reply(payload)).toThrowError('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'Reply ID',
      content: 'Content',
      commentId: 'Comment ID',
      userId: 123,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action and Assert
    expect(() => new Reply(payload)).toThrowError('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create reply object correctly', () => {
    // Arrange
    const payload = {
      id: 'Reply ID',
      content: 'Content',
      commentId: 'Comment ID',
      userId: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action
    const reply = new Reply(payload);

    // Assert
    expect(reply.id).toEqual(payload.id);
    expect(reply.content).toEqual(payload.content);
    expect(reply.commentId).toEqual(payload.commentId);
    expect(reply.userId).toEqual(payload.userId);
    expect(reply.createdAt).toEqual(payload.createdAt);
    expect(reply.updatedAt).toEqual(payload.updatedAt);
  });
});