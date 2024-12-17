"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { LessonList } from "./lesson/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { challengeOptionList } from "./challengeOption/list";
import { challengeOptionCreate } from "./challengeOption/create";
import { challengeOptionEdit } from "./challengeOption/edit";
import { PronunList } from "./pronunciation/list";
import { PronunCreate } from "./pronunciation/create";
import { PronunEdit } from "./pronunciation/edit";
import { VocabularyList } from "./vocaubulary/list";
import { VocaubularyCreate } from "./vocaubulary/create";
import { VocabularyEdit } from "./vocaubulary/edit";
const dataProvider = simpleRestProvider("/api");
const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={challengeOptionList}
        create={challengeOptionCreate}
        edit={challengeOptionEdit}
        recordRepresentation="text"
        options={{ label: "Challenge Options" }}
      />
      <Resource
        name="phonemes"
        list={PronunList}
        create={PronunCreate}
        edit={PronunEdit}
        recordRepresentation="text"
      />
      <Resource
        name="vocabulary"
        list={VocabularyList}
        create={VocaubularyCreate}
        edit={VocabularyEdit}
        recordRepresentation="text"
      />
    </Admin>
  );
};

export default App;
