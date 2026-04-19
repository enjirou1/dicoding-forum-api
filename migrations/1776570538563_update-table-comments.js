export const up = (pgm) => {
  // drop constraint lama
  pgm.addColumn('comments', {
    // eslint-disable-next-line camelcase
    liked_by: {
      type: 'VARCHAR(50)[]',
      notNull: true,
      default: '{}',
    }
  });
};

export const down = (pgm) => {
  pgm.dropColumn('comments', 'liked_by');
};