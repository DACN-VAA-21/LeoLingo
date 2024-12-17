// VocabularyEdit.tsx
import { Edit, required, SimpleForm, TextInput } from "react-admin";

export const VocabularyEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="ID" disabled />
        <TextInput source="word" validate={[required()]} label="Word" />
        <TextInput
          source="course_id"
          validate={[required()]}
          label="Course ID"
        />
        <TextInput
          source="phoneme_id"
          validate={[required()]}
          label="Phoneme ID"
        />
      </SimpleForm>
    </Edit>
  );
};
