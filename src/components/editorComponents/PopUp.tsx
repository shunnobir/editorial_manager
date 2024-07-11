import React, { useState } from "react";
import { AssignedTable } from "./AssignedTable";

const PopUp = () => {
  const [data, setData] = useState([]);
  return (
    
            <AssignedTable
              data={data}
              label="Assigned Reviewers(1/2)"
              subheading="This is the list of reviewers assigned for the paper."
            />
          
  );
};

export default PopUp;
