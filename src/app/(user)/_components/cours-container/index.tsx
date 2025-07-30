/* eslint-disable @typescript-eslint/no-explicit-any */

import CoursContainerInfos from "../cours/cours-infos";

const CoursContainer = (params: any) => {
  return (
    <>
      {params.cour.map((item: any) => (
        <div key={item.id}>
          <CoursContainerInfos cours={item} />
        </div>
      ))}
    </>
  );
};

export default CoursContainer;
