import Comment from '../Comment';

describe('a Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'Comment ID',
      content: 'Content',
      threadId: 'Thread ID',
      userId: '123'
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'Comment ID',
      content: 'Content',
      threadId: 'Thread ID',
      userId: 123,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action and Assert
    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create comment object correctly', () => {
    // Arrange
    const payload = {
      id: 'Comment ID',
      content: 'Content',
      threadId: 'Thread ID',
      userId: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action
    const comment = new Comment(payload);

    // Assert
    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.threadId).toEqual(payload.threadId);
    expect(comment.userId).toEqual(payload.userId);
    expect(comment.createdAt).toEqual(payload.createdAt);
    expect(comment.updatedAt).toEqual(payload.updatedAt);
  });
});