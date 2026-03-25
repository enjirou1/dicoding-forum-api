export const up = (pgm) => {
  pgm.dropConstraint('threads', 'threads_user_id_fkey');

  pgm.addConstraint('threads', 'threads_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

export const down = (pgm) => {
  pgm.dropConstraint('threads', 'threads_user_id_fkey');

  pgm.addConstraint('threads', 'threads_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
};