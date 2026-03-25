export const up = (pgm) => {
  // drop FK lama
  pgm.dropConstraint('comments', 'comments_thread_id_fkey');
  pgm.dropConstraint('comments', 'comments_user_id_fkey');

  // tambah FK baru dengan CASCADE
  pgm.addConstraint('comments', 'comments_thread_id_fkey', {
    foreignKeys: {
      columns: 'thread_id',
      references: 'threads(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('comments', 'comments_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

export const down = (pgm) => {
  pgm.dropConstraint('comments', 'comments_thread_id_fkey');
  pgm.dropConstraint('comments', 'comments_user_id_fkey');

  pgm.addConstraint('comments', 'comments_thread_id_fkey', {
    foreignKeys: {
      columns: 'thread_id',
      references: 'threads(id)',
    },
  });

  pgm.addConstraint('comments', 'comments_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
};