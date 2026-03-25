export const up = (pgm) => {
  // drop constraint lama
  pgm.dropConstraint('replies', 'replies_comment_id_fkey');
  pgm.dropConstraint('replies', 'replies_user_id_fkey');

  // tambah ulang dengan CASCADE
  pgm.addConstraint('replies', 'replies_comment_id_fkey', {
    foreignKeys: {
      columns: 'comment_id',
      references: 'comments(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('replies', 'replies_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
  });
};

export const down = (pgm) => {
  pgm.dropConstraint('replies', 'replies_comment_id_fkey');
  pgm.dropConstraint('replies', 'replies_user_id_fkey');

  // balikin tanpa cascade
  pgm.addConstraint('replies', 'replies_comment_id_fkey', {
    foreignKeys: {
      columns: 'comment_id',
      references: 'comments(id)',
    },
  });

  pgm.addConstraint('replies', 'replies_user_id_fkey', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });
};