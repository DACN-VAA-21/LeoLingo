// PronunList.tsx
import { Datagrid, List, TextField } from "react-admin";

export const PronunList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="symbol" label="Symbol" />
        <TextField source="example_word" label="Example Word" />
        <TextField source="audio_url" label="Audio URL" />
        <TextField source="course_id" label="Course ID" />
        <TextField source="description" label="Description" />
      </Datagrid>
    </List>
  );
};
