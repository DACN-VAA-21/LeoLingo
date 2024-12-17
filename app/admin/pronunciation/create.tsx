// PronunCreate.tsx
import { Create, required, SimpleForm, TextInput } from "react-admin";

export const PronunCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="symbol" validate={[required()]} label="Symbol" />
        <TextInput source="example_word" label="Example Word" />
        <TextInput source="audio_url" label="Audio URL" />
        <TextInput
          source="course_id"
          validate={[required()]}
          label="Course ID"
        />
        <TextInput source="description" label="Description" />
      </SimpleForm>
    </Create>
  );
};
