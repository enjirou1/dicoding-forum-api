import Thread from '../Thread';

describe('a Thread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'Thread ID',
      title: 'Title',
      body: 'Body',
      // userId: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'Thread ID',
      title: 'Title',
      body: 'Body',
      userId: 123,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action and Assert
    expect(() => new Thread(payload)).toThrowError('THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create thread object correctly', () => {
    // Arrange
    const payload = {
      id: 'Thread ID',
      title: 'Title',
      body: 'Body',
      userId: '123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Action
    const thread = new Thread(payload);

    // Assert
    expect(thread.id).toEqual(payload.id);
    expect(thread.content).toEqual(payload.content);
    expect(thread.commentId).toEqual(payload.commentId);
    expect(thread.userId).toEqual(payload.userId);
    expect(thread.createdAt).toEqual(payload.createdAt);
    expect(thread.updatedAt).toEqual(payload.updatedAt);
  });
});