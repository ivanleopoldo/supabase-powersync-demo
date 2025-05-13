import { Schema, Table, column } from '@powersync/react-native';

const todos = new Table({
  title: column.text,
  owner_id: column.text,
  is_completed: column.integer,
  created_at: column.text,
  updated_at: column.text,
});

export const schema = new Schema({
  todos,
});
