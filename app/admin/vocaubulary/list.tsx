// VocabularyList.tsx
import { Datagrid, List, TextField } from "react-admin";

export const VocabularyList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="word" label="Word" />
        <TextField source="course_id" label="Course ID" />
        <TextField source="phoneme_id" label="Phoneme ID" />
      </Datagrid>
    </List>
  );
};
